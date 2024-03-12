import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, isString } from "class-validator"

export class CreateProfessionalDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name : string
    
    @ApiProperty()
    @IsString()
    telephone? : string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    documentNumber : string;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    cpf : string;

}
