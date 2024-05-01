import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>
  ){}
  async create(createUserDto: CreateUserDto) {
    const {username,password} = createUserDto
    
    const creatingUser = {
      ...createUserDto,
      password: await bcrypt.hash(password,12)
    }
    
    const existingUser = await this.userRepository.findOneBy({username})
    
    if(existingUser) throw new ConflictException("This username is already being used")

    const user = this.userRepository.create(creatingUser)
    
    return await this.userRepository.save(user)
  }

  async findByUsername(username : string) : Promise<User>{
    return await this.userRepository.findOneBy({username})
  }

  async findAll() {
    return await this.userRepository.find()
  }

  async findOne(id: UUID) {
    return await this.userRepository.findOneBy({ id }).catch((error) =>{
      throw new BadRequestException("UUID provided is not valid")
    })
  }

  async update(id: UUID, updateUserDto: UpdateUserDto) {
    const existingUser = await this.findOne(id);
    if(!existingUser){
      throw new BadRequestException("UUID provided is not valid")
    }

    return this.userRepository.update(id,updateUserDto);

  }

  async remove(id: UUID) {
    const existingUser = await this.userRepository.findOneBy({ id }).catch((error) =>{
      throw new BadRequestException("UUID provided is not valid")
    })
    return this.userRepository.softDelete(id)
  }

}
