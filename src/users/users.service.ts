import { BadRequestException, ConflictException, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { EmailService } from './email.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository : Repository<User>,
    private readonly emailService: EmailService,

  ){}
  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;
    const existingUser = await this.userRepository.findOneBy({ username }); 
    if (existingUser) {
      throw new ConflictException('This username is already being used');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const creatingUser = {
      ...createUserDto,
      password: hashedPassword,
    };
    creatingUser.roles = createUserDto?.roles || ['user'];
    const user = this.userRepository.create(creatingUser);
    const savedUser =  await this.userRepository.save(user);

    try{
      const subject = 'Bem-vindo ao nosso sistema!';
      const text = `Olá ${username}, seu cadastro foi realizado com sucesso.`;
      const html = `<p>Olá <b>${username}</b>,</p><p>Seu cadastro foi realizado com sucesso.</p>`;

      const emailSent = await this.emailService.sendMail(email, subject, text, html);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new ServiceUnavailableException("It was not possible to send the email");
    }
    return savedUser
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email } = resetPasswordDto; 
    try{
      const subject = 'Recuperação de senha';
      const text = `Olá, para recuperar sua senha, clique no link abaixo.`;
      const html = `<a href="http://localhost:3000/users/resetPassword">Recuperar senha</a>`;

      const emailSent = await this.emailService.sendMail(email, subject, text, html);
    } catch (error) {
      console.error('Erro ao enviar e-mail:', error);
      throw new ServiceUnavailableException("It was not possible to send the email");
    }

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
