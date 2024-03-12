import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository : Repository<Professional>
  ){}
  async create(createProfessionalDto: CreateProfessionalDto) {
    const {documentNumber,cpf} = createProfessionalDto
    
    const existingProfessionalCpf = await this.professionalRepository.findOneBy({cpf})
    if(existingProfessionalCpf) throw new ConflictException("This CPF is already beeing used")

    const existingProfessionalDocument = await this.professionalRepository.findOneBy({documentNumber})
    if(existingProfessionalDocument) throw new ConflictException("This Document Number is already beeing used")

    const professional = this.professionalRepository.create(createProfessionalDto)
    
    return await this.professionalRepository.save(professional)
  }
  async findAll() {
    return await this.professionalRepository.find()
  }

  async findByCpf(cpf : string) {
    return await this.professionalRepository.find({where:{cpf:cpf}})
  }

  async findByDocumentNumber(documentNumber : string) {
    return await this.professionalRepository.find({where:{documentNumber:documentNumber}})
  }


  async findOne(id: UUID) {
    return await this.professionalRepository.findOneBy({ id }).catch((error) =>{
      throw new BadRequestException("UUID provided is not valid")
    })
  }

  async update(id: UUID, updateProfessionalDto: UpdateProfessionalDto) {
    const existingProfessional = await this.findOne(id);
    if(!existingProfessional){
      throw new BadRequestException("UUID provided is not valid")
    }
    const {cpf,documentNumber} = updateProfessionalDto
    
    if(await this.professionalRepository.findOneBy({cpf})) throw new ConflictException("This CPF is already beeing used")
    if(await this.professionalRepository.findOneBy({documentNumber})) throw new ConflictException("This document is already beeing used")

    return this.professionalRepository.update(id,updateProfessionalDto);
  }

  async remove(id: UUID) {
    const existingProfessional = await this.professionalRepository.findOneBy({ id }).catch((error) =>{
      throw new BadRequestException("UUID provided is not valid")
    })
    return this.professionalRepository.softDelete(id)
  }
}
