// auth.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login-dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,private usersService : UsersService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto : LoginDto) {
    const user = await this.authService.validateUser(loginDto)
    return await this.authService.login(user)
  }

  @Public()
  @Post('register')
  async register(@Body() createUserDto : CreateUserDto) {
    await this.usersService.create(createUserDto)
  }
}