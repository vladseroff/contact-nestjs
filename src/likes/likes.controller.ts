import { Controller, Post, Get, Body, UseGuards, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './create-like-dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('likes')
export class LikesController {
    constructor(private likesService: LikesService) {}

    @UseGuards(JwtAuthGuard)
    @Post('')
    create(@Body() likeDto: CreateLikeDto) {
        return this.likesService.like(likeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('')
    delete(@Body() likeDto: CreateLikeDto) {
        return this.likesService.dislike(likeDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.likesService.getLikes();
    }
}
