import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { isEmpty } from "rxjs"

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    username : string

    @ApiProperty()
    @IsNotEmpty()
    password : string

    @ApiPropertyOptional()
    @IsOptional()
    @IsArray()
    roles : Array<string>
}
