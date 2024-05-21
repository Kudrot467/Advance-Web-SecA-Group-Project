import { IsNotEmpty, IsString } from 'class-validator';
import { AllUserSignInDto } from './all-user-signin.dto';

export class AllUserSignUpDto extends AllUserSignInDto {
  @IsNotEmpty({ message: 'Firstame can not be empty.' })
  @IsString({ message: 'Firstame should be string.' })
  firstname: string;

  @IsNotEmpty({ message: 'Lastame can not be empty.' })
  @IsString({ message: 'Lastame should be string.' })
  lastname: string;
}
