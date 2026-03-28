import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFile, UseInterceptors, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourtsService } from './courts.service';
import { CreateCourtDto, UpdateCourtDto, CourtFilterDto, CreateCourtScheduleDto } from './dto/court.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard, Roles } from '../auth/guards/roles.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('courts')
@Controller('courts')
export class CourtsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new court' })
  create(@Body() createCourtDto: CreateCourtDto, @CurrentUser() user: any) {
    return this.courtsService.create(createCourtDto, user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all courts with filters' })
  findAll(@Query() filters: CourtFilterDto) {
    return this.courtsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get court details' })
  findOne(@Param('id') id: string) {
    return this.courtsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update court details' })
  update(@Param('id') id: string, @Body() updateCourtDto: UpdateCourtDto, @CurrentUser() user: any) {
    return this.courtsService.update(id, updateCourtDto, user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Soft delete a court' })
  remove(@Param('id') id: string, @CurrentUser() user: any) {
    return this.courtsService.remove(id, user.id);
  }

  @Post(':id/images')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload an image for a court' })
  uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: any,
    @CurrentUser() user: any,
  ) {
    return this.courtsService.uploadImage(id, file, user.id);
  }

  @Delete(':id/images/:imageId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a court image' })
  deleteImage(
    @Param('id') id: string,
    @Param('imageId') imageId: string,
    @CurrentUser() user: any,
  ) {
    return this.courtsService.deleteImage(id, imageId, user.id);
  }

  @Get(':id/schedule')
  @ApiOperation({ summary: 'Get court schedule' })
  getSchedule(@Param('id') id: string) {
    return this.courtsService.getSchedule(id);
  }

  @Put(':id/schedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('OWNER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update court schedule' })
  updateSchedule(
    @Param('id') id: string,
    @Body() schedules: CreateCourtScheduleDto[],
    @CurrentUser() user: any,
  ) {
    return this.courtsService.updateSchedule(id, schedules, user.id);
  }
}
