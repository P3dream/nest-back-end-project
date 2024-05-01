import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"
import { isEmpty } from "rxjs"

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    username : string

    @ApiProperty()
    @IsNotEmpty()
    password : string

}
