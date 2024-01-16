import { Controller, Get, UseGuards } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('matches')
export class MatchesController {
    constructor(private matchesService: MatchesService) {}

    @UseGuards(JwtAuthGuard)
    @Get('')
    getAll() {
        return this.matchesService.getMatches();
    }
}
