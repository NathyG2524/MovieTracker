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
    movie.genre = body.genre;
    movie.watchedDate = body.watchedDate;
    if (body.rating < 0 || body.rating > 5) {
      throw new HttpException(
        'Enter rating between 0 to 5',
        HttpStatus.BAD_REQUEST,
      );
    }
    movie.rating = body.rating;
    this.movieRepository.save(movie);
    return {
      status: '200',
      sucess: true,
      message: 'Created',
    };
  }

  findAll() {
    return this.movieRepository.find({ order: { id: 'ASC' } });
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
      return {
        updated: id,
        success: true,
        status: 200,
      };
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
    return {
      deleted: id,
      success: true,
      status: 200,
    };
  }

  async favoriteGenre() {
    const allMovies = await this.findAll();
    const movieGenre = [];
    const generCount = {};

    if (allMovies.length == 0) {
      throw new HttpException(
        'Please add movies you watched',
        HttpStatus.BAD_REQUEST,
      );
    }
    //find all genre in the movie
    for (let i = 0; i < allMovies.length; i++) {
      if (!movieGenre.includes(allMovies[i]['genre'])) {
        movieGenre.push(allMovies[i]['genre']);
      }
    }
    //count total rating for each genre
    for (let i = 0; i < movieGenre.length; i++) {
      let count = 0;
      for (let j = 0; j < allMovies.length; j++) {
        if (movieGenre[i] == allMovies[j]['genre']) {
          count += allMovies[j]['rating'];
        }
      }
      generCount[movieGenre[i]] = count;
    }

    let fav = movieGenre[0];
    let favRating = generCount[fav];
    const favlist = [];
    //find the highest rating
    for (const key of Object.keys(generCount)) {
      if (favRating < generCount[key]) {
        fav = key;
        favRating = generCount[key];
      }
    }
    //create a list of genre with the highest rating
    for (const key of Object.keys(generCount)) {
      if (favRating == generCount[key]) {
        favlist.push(key);
      }
    }

    return favlist;
  }

  async averageMovie() {
    const allMovies = await this.findAll();

    const totalMovies = allMovies.length;
    if (!totalMovies) {
      throw new HttpException(
        'Please add movies you watched',
        HttpStatus.BAD_REQUEST,
      );
    }
    let firstDay = new Date();

    //search for the first time movie were watched
    for (let i = 0; i < allMovies.length; i++) {
      if (firstDay > allMovies[i]['watchedDate']) {
        firstDay = allMovies[i]['watchedDate'];
      }
    }
    //find tota duration of date starting from
    //the first day upto today
    const totalDays = Math.ceil(
      (Date.now() - new Date(firstDay).getTime()) / (1000 * 3600 * 24),
    );
    const totalMonths = Math.ceil(totalDays / 30);
    return Math.ceil(totalMovies / totalMonths);
  }

  async currentMood() {
    const allMovies = await this.findAll();

    let lastWatched = allMovies[0];
    if (!lastWatched) {
      throw new HttpException(
        'Please add movies you watched',
        HttpStatus.BAD_REQUEST,
      );
    }
    let lastWatchedDate = allMovies[0]['watchedDate'];

    //search for the last time movie were watched
    for (let i = 0; i < allMovies.length; i++) {
      if (lastWatchedDate < allMovies[i]['watchedDate']) {
        lastWatched = allMovies[i];
        lastWatchedDate = allMovies[i]['watchedDate'];
      }
    }
    //return last watched movie rating
    return lastWatched['rating'];
  }
}
