import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePatientDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsString()
  socialName?: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  age: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  civilStatus: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  nationality: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  gender: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  profession: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  homeAddress: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  covenantName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  covenantNumber: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  professionalName: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  color: string;
}
