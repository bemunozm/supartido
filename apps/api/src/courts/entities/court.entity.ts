import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { CourtImage } from './court-image.entity';
import { CourtSchedule } from './court-schedule.entity';

export enum CourtType {
  FIVE_VS_FIVE = 'FIVE_VS_FIVE',
  SIX_VS_SIX = 'SIX_VS_SIX',
  SEVEN_VS_SEVEN = 'SEVEN_VS_SEVEN',
  ELEVEN_VS_ELEVEN = 'ELEVEN_VS_ELEVEN',
}

@Entity('courts')
export class Court {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'text' })
  description!: string;

  @Column({
    type: 'enum',
    enum: CourtType,
    default: CourtType.FIVE_VS_FIVE,
  })
  type!: CourtType;

  @Column()
  address!: string;

  @Column({ default: 'Iquique' })
  city!: string;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 7 })
  latitude?: number;

  @Column({ type: 'decimal', nullable: true, precision: 10, scale: 7 })
  longitude?: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerHour!: number;

  @Column({ type: 'uuid' })
  ownerId!: string;

  @Column({ default: true })
  isActive!: boolean;

  @Column({ type: 'jsonb', default: {} })
  amenities!: Record<string, boolean>;

  @OneToMany(() => CourtImage, (image) => image.court)
  images?: CourtImage[];

  @OneToMany(() => CourtSchedule, (schedule) => schedule.court)
  schedule?: CourtSchedule[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
