import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMovieDto } from './dto/create-movie';
import IFilterOptions, {
  SortBy,
} from './interfaces/filter-options.interface';
import { Movie } from './interfaces/movies.interface';

@Injectable()
export class MoviesService {
  constructor(@InjectModel('Movie') private movieModal: Model<Movie>) {}

  async createMovie(
    createMovieDto: CreateMovieDto,
    userId: string,
  ): Promise<{ title: string; description: string; thumbnailUrl: string }> {
    try {
      const createdMovie = new this.movieModal(createMovieDto);
      createdMovie.user = userId;
      const saveMovie = await createdMovie.save();
      return {
        title: saveMovie.title,
        description: saveMovie.description,
        thumbnailUrl: saveMovie.thumbnailUrl,
      };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async myMovies(
    userId: string,
    options: IFilterOptions,
  ): Promise<{ totalCount: number; list: Movie[] }> {
    try {
      const totalCount = await this.movieModal.countDocuments({
        user: userId,
        ...(options.search && {
          title: { $regex: options.search, $options: 'i' },
        }),
      });
      let sort = {}
      sort[options.sortBy] = options.sortDirection || 1;
      const movies = await this.movieModal
        .find({
          user: userId,
          ...(options.search && {
            title: { $regex: options.search, $options: 'i' },
          }),
        })
        .skip(options.offset || 0)
        .limit(options.limit || 10)
        .sort(sort);

      return {
        totalCount,
        list: movies,
      };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }

  async deleteMovie(
    id: string,
    userId: string,
  ): Promise<{ isDeleted: boolean }> {
    try {
      await this.movieModal.findOneAndDelete({ _id: id, user: userId });
      return {
        isDeleted: true,
      };
    } catch (err) {
      throw new HttpException(err.message, err.status || 500);
    }
  }
}
