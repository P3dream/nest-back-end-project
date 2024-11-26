import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import { ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('patients')
@ApiTags('Patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 409, description: 'The socialName or covenantNumber is already being used.'})
  @Post()
  create(@Body() createPatientDto: CreatePatientDto) {
    return this.patientsService.create(createPatientDto);
  }

  @ApiResponse({ status: 200, description: 'The records were returned successfully.'})
  @Get()
  findAll() {
    return this.patientsService.findAll();
  }

  @ApiResponse({ status: 200, description: 'The record is returned successfully.'})
  @ApiResponse({ status: 400, description: 'Invalid UUID provided.'})
  @Get(':id')
  findOne(@Param('id') id: UUID) {
    return this.patientsService.findOne(id);
  }

  @ApiResponse({ status: 200, description: 'The record was updated successfully.'})
  @ApiResponse({ status: 409, description: 'SocialName or covenantNumber provided is already being used.'})
  @Patch(':id')
  update(@Param('id') id: UUID, @Body() updatePatientDto: UpdatePatientDto) {
    return this.patientsService.update(id, updatePatientDto);
  }

  @ApiResponse({ status: 200, description: 'The record was deleted successfully.'})
  @ApiResponse({ status: 400, description: 'Invalid UUID provided.'})
  @Delete(':id')
  remove(@Param('id') id: UUID) {
    return this.patientsService.remove(id);
  }
}
