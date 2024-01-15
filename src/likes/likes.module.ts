import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { Likes } from './likes.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { MatchesModule } from 'src/matches/matches.module';

@Module({
    controllers: [LikesController],
    providers: [LikesService],
    imports: [
        SequelizeModule.forFeature([Likes]),
        AuthModule,
        MatchesModule
    ]
})
export class LikesModule {}

