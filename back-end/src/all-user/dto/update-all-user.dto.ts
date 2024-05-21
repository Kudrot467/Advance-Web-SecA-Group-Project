/* eslint-disable @typescript-eslint/no-unused-vars */
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAllUserDto } from './create-all-user.dto';

// export class UpdateAllUserDto extends PartialType(CreateAllUserDto) {}

import { IsNotEmpty, IsOptional } from 'class-validator';
import { CreateAllUserDto } from './create-all-user.dto';

export class UpdateAllUserDto {
  @IsOptional()
  firstname: string;

  @IsOptional()
  lastname: string;

  //   @IsOptional()
  //   email: string;

  @IsOptional()
  mobile: string;

  @IsOptional()
  password: string;

  //roles: any;
}
