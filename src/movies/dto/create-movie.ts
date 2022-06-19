import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export class CreateMovieDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly thumbnailUrl: string;
}