import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { 
    IsArray, 
    IsEmail, 
    IsNotEmpty, 
    IsOptional, 
    IsString, 
    Length, 
    Matches, 
    MinLength 
} from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty({ message: "O nome de usuário é obrigatório." })
    @IsString({ message: "O nome de usuário deve ser uma string." })
    @Length(3, 20, { message: "O nome de usuário deve ter entre 3 e 20 caracteres." })
    username: string;

    @ApiProperty()
    @IsNotEmpty({ message: "A senha é obrigatória." })
    @IsString({ message: "A senha deve ser uma string." })
    @MinLength(8, { message: "A senha deve ter no mínimo 8 caracteres." })
    @Matches(/(?=.*[A-Z])/, { message: "A senha deve conter pelo menos uma letra maiúscula." })
    @Matches(/(?=.*[a-z])/, { message: "A senha deve conter pelo menos uma letra minúscula." })
    @Matches(/(?=.*\d)/, { message: "A senha deve conter pelo menos um número." })
    @Matches(/(?=.*[@$!%*?&])/, { message: "A senha deve conter pelo menos um caractere especial." })
    password: string;

    @ApiProperty()
    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsEmail({}, { message: "O email deve ser válido." })
    email: string;

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray({ message: "Os roles devem ser um array de strings." })
    @IsString({ each: true, message: "Cada role deve ser uma string." })
    roles: Array<string>;
}