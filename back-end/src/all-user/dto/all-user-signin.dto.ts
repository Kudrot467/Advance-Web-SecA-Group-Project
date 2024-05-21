import { IsNotEmpty, MinLength } from 'class-validator';
// import { ApiTags, ApiProperty } from '@nestjs/swagger';

// @ApiTags('Users')
export class AllUserSignInDto {
  //   @ApiProperty()
  @IsNotEmpty({ message: 'Username can not be empty.' })
  username: string;

  //   @ApiProperty()
  @IsNotEmpty({ message: 'Password can not be empty.' })
  @MinLength(5, { message: 'Minimum character should be 5.' })
  password: string;
}
