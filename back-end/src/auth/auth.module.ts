import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AllUsersService } from 'src/all-user/all-user.service';
import { JwtModule, JwtService } from '@nestjs/jwt'
import { AllUsersModule } from 'src/all-user/all-user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllUser } from '../all-user/entities/all-user.entity';

@Module({
  imports: [AllUsersModule, JwtModule.register({
    secret: 'secret101',
    signOptions: { expiresIn: '30m' }, // Token will expire in 30 minutes
  }), TypeOrmModule.forFeature([AllUser])],
  controllers: [AuthController],
  providers: [AuthService],
})

export class AuthModule {
  
}

