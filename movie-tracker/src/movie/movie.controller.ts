import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Movie } from './entities/movie.entity';

@ApiTags('movie')
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiCreatedResponse({ type: Movie })
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @ApiCreatedResponse({ type: Movie })
  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @ApiCreatedResponse({ type: Movie })
  @Get('fav')
  favoriteGener() {
    return this.movieService.favoriteGenre();
  }

  @ApiCreatedResponse({ type: Movie })
  @Get('avg')
  averageMovie() {
    return this.movieService.averageMovie();
  }

  @ApiCreatedResponse({ type: Movie })
  @Get('mood')
  currentMood() {
    return this.movieService.currentMood();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movieService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movieService.remove(id);
  }
}
