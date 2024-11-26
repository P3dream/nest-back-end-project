import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Patient } from './entities/patient.entity';
import { UUID } from 'crypto';

@Injectable()
export class PatientsService {
  constructor(
    @InjectRepository(Patient)
    private patientsRepository: Repository<Patient>
  ){}

  async validPatientId(id: UUID) {
    const foundPatient = await this.findOne(id);
    if (!foundPatient) {
      throw new BadRequestException("Patient id not found!");
    }
    return foundPatient;
  }

  async validPatient(createPatientDto: CreatePatientDto, id?: UUID) {
    const { socialName, covenantNumber } = createPatientDto;

    const existingPatientSocialName = id ? await this.patientsRepository.find({ where: { socialName, id: Not(id) } }) : await this.patientsRepository.find({ where: { socialName } });
    if (existingPatientSocialName.length > 0) throw new ConflictException("This Social Name is already being used");

    const existingPatientCovenantNumber = id ? await this.patientsRepository.find({ where: { covenantNumber, id: Not(id) } }) : await this.patientsRepository.find({ where: { covenantNumber } });
    if (existingPatientCovenantNumber.length > 0) throw new ConflictException("This Covenant Number is already being used");
  }

  async create(createPatientDto: CreatePatientDto) {
    await this.validPatient(createPatientDto);

    const patient = this.patientsRepository.create(createPatientDto);
    
    return await this.patientsRepository.save(patient);
  }

  async findAll() {
    return await this.patientsRepository.find();
  }

  async findOne(id: UUID) {
    const patient = await this.patientsRepository.findOneBy({ id });
    if (!patient) {
      throw new BadRequestException("UUID provided is not valid");
    }
    return patient;
  }

  async update(id: UUID, updatePatientDto: UpdatePatientDto) {
    await this.validPatientId(id);
   
    await this.validPatient(updatePatientDto as CreatePatientDto, id);

    return this.patientsRepository.update(id, updatePatientDto);
  }

  async remove(id: UUID) {
    await this.validPatientId(id);
    return this.patientsRepository.softDelete(id);
  }
}
