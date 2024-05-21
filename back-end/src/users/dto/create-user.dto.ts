import { IsEmail,  IsString,IsNotEmpty,Length  } from "class-validator";
import { PartialType } from "@nestjs/mapped-types"; 
export class CreateUserDto{
    @IsString()
    @IsNotEmpty() 
    username: string;

    @IsEmail()
    @IsNotEmpty() 
    email: string;

    @IsString()
    @Length(3, 8)
    @IsNotEmpty() 
    password: string;

}



