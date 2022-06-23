import { IsNotEmpty } from 'class-validator';

export class CreateMovieDto {
    @IsNotEmpty()
    readonly title: string;
    @IsNotEmpty()
    readonly description: string;
    @IsNotEmpty()
    readonly thumbnailUrl: string;
}