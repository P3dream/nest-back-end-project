import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Controller('professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.professionalsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalsService.update(id, updateProfessionalDto);
  }

  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.professionalsService.remove(id);
  }
}
