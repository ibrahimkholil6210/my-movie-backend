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
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.DB_URL
    ),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [AppController, MoviesController],
  providers: [AppService],
})
export class AppModule {}
