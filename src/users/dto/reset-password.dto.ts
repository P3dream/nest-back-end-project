import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class ResetPasswordDto{
    @ApiProperty()
    @IsNotEmpty({ message: "O email é obrigatório." })
    @IsEmail({}, { message: "O email deve ser válido." })
    email : string
}