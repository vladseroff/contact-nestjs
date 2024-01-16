import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Matches } from './matches.model';
import { CreateMatchDto } from './create-match-dto';
import { AuthService } from 'src/auth/auth.service';
import { Op } from 'sequelize';

@Injectable()
export class MatchesService {
    constructor(
        @InjectModel(Matches) private matchesRepository: typeof Matches,
        private authService: AuthService,
    ) {}

    async create(dto: CreateMatchDto) {
        const user = this.authService.currentUser();
        if (user) {
            const likeItem = await this.getOneMatchByUsersId(
                dto.user_id_one,
                dto.user_id_two,
            );
            if (likeItem) {
                throw new HttpException(
                    'Мэтч уже создан',
                    HttpStatus.BAD_REQUEST,
                );
            }
            const like = await this.matchesRepository.create(dto);
            return like;
        }
        throw new HttpException(
            'Невозможно создать мэтч',
            HttpStatus.BAD_REQUEST,
        );
    }

    async getMatches() {
        const user = this.authService.currentUser();
        if (user && user.id) {
            const matches = await this.matchesRepository.findAll({
                where: {
                    [Op.or]: [
                        {
                            user_id_one: user.id,
                        },
                        {
                            user_id_two: user.id,
                        },
                    ],
                },
            });
            return matches;
        }
        throw new UnauthorizedException({
            message: 'Необходимо авторизоваться',
        });
    }

    async getOneMatchByUsersId(user_id_one: number, user_id_two: number) {
        const match = await this.matchesRepository.findOne({
            where: {
                [Op.or]: [
                    {
                        user_id_one: user_id_one || user_id_two,
                    },
                    {
                        user_id_two: user_id_one || user_id_two,
                    },
                ],
            },
        });
        return match;
    }

    async getOneMatchById(id: number) {
        const match = await this.matchesRepository.findOne({ where: { id } });
        return match;
    }
}
