import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, Matches } from 'class-validator';

export class CreateAllUserDto {
    id: number;

    @IsNotEmpty()
    usertype: string;

    @IsString({ message: 'Valid name is required' })
    @IsNotEmpty()
    firstname: string;

    @IsString({ message: 'Valid name is required' })
    @IsNotEmpty()
    lastname: string;

    @Matches(/^\+\d+$/, { message: 'Valid phone number is required. It should start with + followed by numeric values' })
    @IsNotEmpty()
    mobile: string;

    @IsEmail({}, { message: 'Invalid email format' })
    @IsNotEmpty()
    email: string;

    @IsString({ message: 'Valid gender is required' })
    gender: string;

    @IsString({ message: 'Valid username is required' })
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}
