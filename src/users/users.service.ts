import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './users.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './create-user-dto';

@Injectable()
export class UsersService {

    constructor(
        @InjectModel(Users) private usersRepository: typeof Users,
    ) {

    }

    async createUser(dto: CreateUserDto) {
        try {
            const user = await this.usersRepository.create(dto);
            return user
        } catch (error) { 
            throw new HttpException({
                status: HttpStatus.FORBIDDEN,
                error: error,
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    async getAllUsers() {
        const userAll = await this.usersRepository.findAll()
        return userAll
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.findOne({where: {id}})
        if (user) {
            return user
        }
        throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }

    async getUserByEmail(email: string) {
        const user = await this.usersRepository.findOne({where: {email}, include: {all: true}})
        return user
    }

}
