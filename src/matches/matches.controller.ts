import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateMatchDto } from './create-match-dto';

@Controller('matches')
export class MatchesController {

    constructor(private matchesService: MatchesService) {

    }

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.matchesService.getMatches()
    }

}
