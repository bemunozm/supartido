import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Court } from './court.entity';

@Entity('court_images')
export class CourtImage {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  courtId!: string;

  @Column()
  url!: string;

  @Column({ type: 'int', default: 0 })
  order!: number;

  @ManyToOne(() => Court, (court) => court.images, { onDelete: 'CASCADE' })
  court?: Court;

  @CreateDateColumn()
  createdAt!: Date;
}
