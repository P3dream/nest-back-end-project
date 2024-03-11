import { IsNotEmpty } from "class-validator"
import { isEmpty } from "rxjs"

export class CreateUserDto {
    
    @IsNotEmpty()
    username : string

    @IsNotEmpty()
    password : string

}
