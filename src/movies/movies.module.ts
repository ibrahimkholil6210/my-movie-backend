import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/users.schema';
import { MoviesController } from './movies.controller';
import { MovieSchema } from './movies.schema';
import { MoviesService } from './movies.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'Movie', schema: MovieSchema}]),
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}])
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService]
})
export class MoviesModule {}
