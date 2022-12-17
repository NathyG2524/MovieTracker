import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MovieService {
  @InjectRepository(Movie)
  private readonly movieRepository: Repository<Movie>;

  async create(body: CreateMovieDto) {
    const movie: Movie = new Movie();
    movie.title = body.title;
    movie.genre = body.gener;
    if (body.rating < 0 || body.rating > 5) {
      throw new HttpException(
        'Enter rating between 0 to 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    movie.rating = body.rating;
    return this.movieRepository.save(movie);
  }

  findAll() {
    return this.movieRepository.find();
  }

  findOne(id: number) {
    return this.movieRepository
      .createQueryBuilder('Movie')
      .where('Movie.id = :id', { id: id })
      .getOne();
  }

  async update(id: number, body: UpdateMovieDto) {
    if (body.rating < 0 || body.rating > 5) {
      throw new HttpException(
        'Enter rating between 0 to 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.movieRepository.update(id, body);
    const movie: Movie = await this.movieRepository
      .createQueryBuilder('Movie')
      .where('Movie.id = :id', { id: id })
      .getOne();
    if (movie) {
      return movie;
    }
    throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
  }

  async remove(id: string) {
    const deleteduser = await this.movieRepository
      .createQueryBuilder('Movie')
      .delete()
      .where('id = :id', { id: id })
      .execute();
    if (!deleteduser.affected) {
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
    }
  }
}
