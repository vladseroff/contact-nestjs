import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from './users/users.module';
import { Users } from "./users/users.model";
import { LikesModule } from './likes/likes.module';
import { Likes } from "./likes/likes.model";
import { AuthModule } from './auth/auth.module';
import { Matches } from "./matches/matches.model";
import { MatchesModule } from './matches/matches.module';

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: '.env'
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [Users, Likes, Matches],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        LikesModule,
        AuthModule,
        MatchesModule
    ]
})

export class AppModule {
    
}