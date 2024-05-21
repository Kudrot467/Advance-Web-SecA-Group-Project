/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common';
import { AllUsersService } from './all-user.service';
import { AllUsersController } from './all-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllUser } from './entities/all-user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
@Module({
  imports: [
    TypeOrmModule.forFeature([AllUser]),
    JwtModule.register({ secret: 'secret101' }),
  ],
  controllers: [AllUsersController],
  providers: [AllUsersService],
  exports: [AllUsersService],
})
export class AllUsersModule {}
