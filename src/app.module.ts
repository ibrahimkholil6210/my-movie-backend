import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesController } from './movies/movies.controller';
import { MoviesModule } from './movies/movies.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb+srv://iamibrahim:RysxEItR5C91XXmL@cluster0.i09md.mongodb.net/my-movie?retryWrites=true&w=majority'),
    UsersModule,
    AuthModule,
    MoviesModule
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
