import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ type: 'timestamptz' })
  watchedDate: Date;

  @Column()
  genre: string;

  @Column()
  rating: number;
}
