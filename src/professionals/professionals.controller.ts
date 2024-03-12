import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProfessionalsService } from './professionals.service';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { Professional } from './entities/professional.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('professionals')
@ApiTags('Professionals')
export class ProfessionalsController {
  constructor(private readonly professionalsService: ProfessionalsService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 409, description: 'The CPF or Document Number is already beeing used.'})
  @Post()
  create(@Body() createProfessionalDto: CreateProfessionalDto) {
    return this.professionalsService.create(createProfessionalDto);
  }

  @ApiResponse({ status: 200, description: 'The records were returned successfully.'})
  @Get()
  findAll() {
    return this.professionalsService.findAll();
  }
  
  @ApiResponse({ status: 200, description: 'The record is returned successfully.'})
  @ApiResponse({ status: 400, description: 'Invalid UUID provided.'})
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.professionalsService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'The record was updated successfully.'})
  @ApiResponse({ status: 409, description: 'Document or CPF provided is already beeing used.'})
  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updateProfessionalDto: UpdateProfessionalDto) {
    return this.professionalsService.update(id, updateProfessionalDto);
  }

  @ApiResponse({ status: 200, description: 'The record was deleted successfully.'})
  @ApiResponse({ status: 400, description: 'Invalid UUID provided.'})
  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.professionalsService.remove(id);
  }
}
