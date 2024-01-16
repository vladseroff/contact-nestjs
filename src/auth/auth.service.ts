import {
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/create-user-dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { Users } from 'src/users/users.model';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        @Inject(REQUEST) private request,
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByEmail(userDto.email);
        if (candidate) {
            throw new HttpException(
                'Пользователь уже существует с таким email',
                HttpStatus.BAD_REQUEST,
            );
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5);

        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });
        if (user) {
            return this.generateToken(user);
        }
        throw new HttpException(
            'Некорректно заполнены данные',
            HttpStatus.BAD_REQUEST,
        );
    }

    currentUser() {
        const user = this.request.user;
        if (user) {
            return user;
        }
        return null;
    }

    private async generateToken(user: Users) {
        const payload = { email: user.email, id: user.id, name: user.name };
        return {
            token: this.jwtService.sign(payload),
        };
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );
        if (user && passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({
            message: 'Некорректный email или пароль',
        });
    }
}
