import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  genre: string;

  @ApiProperty()
  @IsNumber()
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  watchedDate: Date;
}
