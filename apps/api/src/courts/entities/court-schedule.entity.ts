import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Court } from './court.entity';

@Entity('court_schedules')
export class CourtSchedule {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'uuid' })
  courtId!: string;

  @Column({ type: 'int' })
  dayOfWeek!: number; // 0=domingo, 6=sábado

  @Column({ type: 'time', default: '08:00' })
  openTime!: string;

  @Column({ type: 'time', default: '23:00' })
  closeTime!: string;

  @Column({ default: true })
  isAvailable!: boolean;

  @ManyToOne(() => Court, (court) => court.schedule, { onDelete: 'CASCADE' })
  court?: Court;
}
