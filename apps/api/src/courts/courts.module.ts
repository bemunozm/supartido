import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourtsService } from './courts.service';
import { CourtsController } from './courts.controller';
import { Court } from './entities/court.entity';
import { CourtImage } from './entities/court-image.entity';
import { CourtSchedule } from './entities/court-schedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Court, CourtImage, CourtSchedule])],
  controllers: [CourtsController],
  providers: [CourtsService],
  exports: [CourtsService],
})
export class CourtsModule {}
