import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateProfessionalDto } from './dto/create-professional.dto';
import { UpdateProfessionalDto } from './dto/update-professional.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from './entities/professional.entity';
import { Repository, Not } from 'typeorm';
import { UUID } from 'crypto';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class ProfessionalsService {
  constructor(
    @InjectRepository(Professional)
    private professionalRepository : Repository<Professional>
  ){}

  async validProfessionalId(id : UUID){
    const foundProfessional = await this.findOne(id);
    if(!foundProfessional){
      throw new BadRequestException("Professional id not found!");
    }
    return foundProfessional;
  }

  async validProfessional(createProfessionalDto: CreateProfessionalDto, id? : UUID){
    const {documentNumber,cpf} = createProfessionalDto
    
    const existingProfessionalCpf = id? await this.professionalRepository.find({where:{cpf, id: Not(id)}}) : await this.professionalRepository.find({where:{cpf}})
    if(existingProfessionalCpf) throw new ConflictException("This CPF is already beeing used")

    const existingProfessionalDocument = id? await this.professionalRepository.find({where:{documentNumber, id: Not(id)}}) : await this.professionalRepository.find({where:{documentNumber}})
    if(existingProfessionalDocument) throw new ConflictException("This Document Number is already beeing used")
  }

  async create(createProfessionalDto: CreateProfessionalDto) {

    await this.validProfessional(createProfessionalDto)

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
    await this.validProfessionalId(id)
   
    await this.validProfessional(updateProfessionalDto as CreateProfessionalDto, id)

    return this.professionalRepository.update(id,updateProfessionalDto);
  }

  async remove(id: UUID) {
    const existingProfessional = await this.professionalRepository.findOneBy({ id }).catch((error) =>{
      throw new BadRequestException("UUID provided is not valid")
    })
    return this.professionalRepository.softDelete(id)
  }
}
