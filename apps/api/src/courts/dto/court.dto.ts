import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEnum, IsNumber, IsOptional, IsBoolean, IsUUID, IsObject } from 'class-validator';
import { CourtType } from '../entities/court.entity';

export class CreateCourtDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({ enum: CourtType })
  @IsEnum(CourtType)
  type!: CourtType;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address!: string;

  @ApiProperty({ default: 'Iquique' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  pricePerHour!: number;

  @ApiPropertyOptional()
  @IsObject()
  @IsOptional()
  amenities?: Record<string, boolean>;
}

export class UpdateCourtDto extends PartialType(CreateCourtDto) {
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class CourtFilterDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ enum: CourtType })
  @IsEnum(CourtType)
  @IsOptional()
  type?: CourtType;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  priceMin?: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  priceMax?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  search?: string;
}

export class CreateCourtScheduleDto {
  @ApiProperty()
  @IsNumber()
  dayOfWeek!: number;

  @ApiProperty({ example: '08:00' })
  @IsString()
  openTime!: string;

  @ApiProperty({ example: '23:00' })
  @IsString()
  closeTime!: string;

  @ApiProperty({ default: true })
  @IsBoolean()
  isAvailable!: boolean;
}
