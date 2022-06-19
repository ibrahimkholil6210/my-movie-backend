import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie';
import IFilterOptions from './interfaces/filter-options.interface';
import { Movie } from './interfaces/movies.interface';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private movieModal: Model<Movie>) {}

  async createMovie(
    createMovieDto: CreateMovieDto,
    userId: string,
  ): Promise<Movie> {

    try{
        const createdMovie = new this.movieModal(createMovieDto);
        createdMovie.user = userId;
        return await createdMovie.save();
    }catch(err){
        throw new HttpException(err.message, err.status || 500);
    }
  }

  async myMovies(userId: string,options: IFilterOptions): Promise<Movie[]> {
    try{        
        return await this.movieModal.find({user: userId, $text: { $search: options.search || '' }});
    }catch(err){
        throw new HttpException(err.message, err.status || 500);
    }
  } 
}
