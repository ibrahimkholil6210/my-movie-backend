import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  Request,
  UseGuards,
  Get,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { Movie } from './interfaces/movies.interface';
import { CreateMovieDto } from './dto/create-movie';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createMovie(
    @Request() req,
    @Body(ValidationPipe) createMovieDto: CreateMovieDto,
  ): Promise<Movie> {
    return this.moviesService.createMovie(createMovieDto, req?.user?.id);
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async myMovies(@Request() req): Promise<Movie[]> {
    return this.moviesService.myMovies(req?.user?.id,{
        search: req.query.search,
    });
  }
}
