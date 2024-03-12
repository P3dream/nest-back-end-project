import { IsNotEmpty, IsString, isString } from "class-validator"

export class CreateProfessionalDto {
    @IsNotEmpty()
    @IsString()
    name : string
    
    @IsString()
    telephone? : string;

    @IsNotEmpty()
    @IsString()
    documentNumber : string;
    
    @IsNotEmpty()
    @IsString()
    cpf : string;

}
