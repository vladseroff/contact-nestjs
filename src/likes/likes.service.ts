import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Likes } from './likes.model';
import { CreateLikeDto } from './create-like-dto';
import { AuthService } from 'src/auth/auth.service';
import { MatchesService } from 'src/matches/matches.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Likes) private likesRepository: typeof Likes,
        private matchesService: MatchesService,
        private authService: AuthService,
    ) {}

    async like(dto: CreateLikeDto) {
        const user = this.authService.currentUser();
        if (user && user.id !== dto.user_id) {
            const likeItem = await this.getOneLike(user.id, dto.user_id);
            if (likeItem) {
                throw new HttpException(
                    'Лайк уже поставлен :)',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const like = await this.likesRepository.create({
                user_id: user.id,
                target_user_id: dto.user_id,
            });
            const mutuallyLikes = await this.getOneLike(dto.user_id, user.id);
            if (mutuallyLikes) {
                await this.matchesService.create({
                    user_id_one: user.id,
                    user_id_two: dto.user_id,
                });
            }
            return like;
        }
        throw new HttpException(
            'Невозможно поставить лайк :(',
            HttpStatus.BAD_REQUEST,
        );
    }

    async dislike(dto: CreateLikeDto) {
        const user = this.authService.currentUser();
        if (user && user.id !== dto.user_id) {
            const likeItem = await this.getOneLike(user.id, dto.user_id);
            if (likeItem) {
                await this.likesRepository.destroy({
                    where: {
                        user_id: user.id,
                        target_user_id: dto.user_id,
                    },
                });
                // await this.matchesService.delete({
                //     where: {
                //         user_id_one: user.id || dto.user_id,
                //         user_id_two: user.id || dto.user_id
                //     }
                // })
                return {
                    success: true,
                };
            }
            throw new HttpException(
                'Лайк и не стоял, даже не пришлось дизлайкать :)',
                HttpStatus.BAD_REQUEST,
            );
        }
        throw new HttpException(
            'Невозможно убрать лайк :(',
            HttpStatus.BAD_REQUEST,
        );
    }

    async getLikes() {
        const user = this.authService.currentUser();
        if (user && user.id) {
            const likes = await this.likesRepository.findAll({
                where: { user_id: user.id },
            });
            return likes;
        }
        throw new UnauthorizedException({
            message: 'Необходимо авторизоваться',
        });
    }

    async getOneLike(user_id: number, target_user_id: number) {
        const like = await this.likesRepository.findOne({
            where: {
                user_id: user_id,
                target_user_id: target_user_id,
            },
        });
        return like;
    }
}
