import { Module } from '@nestjs/common';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';
import { AuthModule } from 'src/auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Matches } from './matches.model';

@Module({
    controllers: [MatchesController],
    providers: [MatchesService],
    imports: [SequelizeModule.forFeature([Matches]), AuthModule],
    exports: [MatchesService],
})
export class MatchesModule {}
