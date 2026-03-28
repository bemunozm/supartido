import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between, In } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Court, CourtType } from './entities/court.entity';
import { CourtImage } from './entities/court-image.entity';
import { CourtSchedule } from './entities/court-schedule.entity';
import { CreateCourtDto, UpdateCourtDto, CourtFilterDto, CreateCourtScheduleDto } from './dto/court.dto';

@Injectable()
export class CourtsService {
  private supabase: SupabaseClient;

  constructor(
    @InjectRepository(Court)
    private courtRepository: Repository<Court>,
    @InjectRepository(CourtImage)
    private courtImageRepository: Repository<CourtImage>,
    @InjectRepository(CourtSchedule)
    private courtScheduleRepository: Repository<CourtSchedule>,
    private configService: ConfigService,
  ) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL') || '';
    const supabaseKey = this.configService.get<string>('SUPABASE_SERVICE_KEY') || '';
    this.supabase = createClient(supabaseUrl, supabaseKey);
  }

  async create(createCourtDto: CreateCourtDto, ownerId: string) {
    const court = this.courtRepository.create({
      ...createCourtDto,
      ownerId,
    });
    return this.courtRepository.save(court);
  }

  async findAll(filters: CourtFilterDto) {
    const { city, type, priceMin, priceMax, search } = filters;
    const where: any = { isActive: true };

    if (city) where.city = city;
    if (type) where.type = type;
    if (priceMin && priceMax) {
      where.pricePerHour = Between(priceMin, priceMax);
    } else if (priceMin) {
      where.pricePerHour = Between(priceMin, 999999);
    } else if (priceMax) {
      where.pricePerHour = Between(0, priceMax);
    }

    if (search) {
      where.name = Like(`%${search}%`);
    }

    return this.courtRepository.find({
      where,
      relations: ['images', 'schedule'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const court = await this.courtRepository.findOne({
      where: { id },
      relations: ['images', 'schedule'],
    });

    if (!court) {
      throw new NotFoundException(`Court with ID ${id} not found`);
    }

    return court;
  }

  async update(id: string, updateCourtDto: UpdateCourtDto, ownerId: string) {
    const court = await this.findOne(id);

    if (court.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this court');
    }

    Object.assign(court, updateCourtDto);
    return this.courtRepository.save(court);
  }

  async remove(id: string, ownerId: string) {
    const court = await this.findOne(id);

    if (court.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this court');
    }

    // Soft delete
    court.isActive = false;
    return this.courtRepository.save(court);
  }

  async uploadImage(courtId: string, file: any, ownerId: string) {
    const court = await this.findOne(courtId);

    if (court.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this court');
    }

    const fileName = `${courtId}/${Date.now()}-${file.originalname}`;
    const { data, error } = await this.supabase.storage
      .from('court-images')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        cacheControl: '3600',
      });

    if (error) {
      throw new BadRequestException(error.message);
    }

    const { data: { publicUrl } } = this.supabase.storage
      .from('court-images')
      .getPublicUrl(fileName);

    const courtImage = this.courtImageRepository.create({
      courtId,
      url: publicUrl,
    });

    return this.courtImageRepository.save(courtImage);
  }

  async deleteImage(courtId: string, imageId: string, ownerId: string) {
    const court = await this.findOne(courtId);

    if (court.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this court');
    }

    const image = await this.courtImageRepository.findOne({ where: { id: imageId, courtId } });
    if (!image) {
      throw new NotFoundException(`Image with ID ${imageId} not found for this court`);
    }

    // Delete from Supabase Storage
    const path = image.url.split('court-images/')[1];
    if (path) {
      await this.supabase.storage.from('court-images').remove([path]);
    }

    return this.courtImageRepository.remove(image);
  }

  async getSchedule(courtId: string) {
    return this.courtScheduleRepository.find({
      where: { courtId },
      order: { dayOfWeek: 'ASC' },
    });
  }

  async updateSchedule(courtId: string, schedules: CreateCourtScheduleDto[], ownerId: string) {
    const court = await this.findOne(courtId);

    if (court.ownerId !== ownerId) {
      throw new ForbiddenException('You are not the owner of this court');
    }

    // Delete existing schedules
    await this.courtScheduleRepository.delete({ courtId });

    // Create new schedules
    const newSchedules = schedules.map((s) =>
      this.courtScheduleRepository.create({
        ...s,
        courtId,
      }),
    );

    return this.courtScheduleRepository.save(newSchedules);
  }
}
