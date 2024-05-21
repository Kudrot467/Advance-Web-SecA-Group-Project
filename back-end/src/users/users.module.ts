import { Module,NestModule } from '@nestjs/common';
import { UsersService } from './users.service';
import { AllUsersService } from '../all-user/all-user.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { Rooms } from 'src/admin/entities/admin.entity';
import { Booking } from 'src/booking/entities/booking.entity';
import { faq } from 'src/faq/entities/faq.entity';
import { AllUser } from 'src/all-user/entities/all-user.entity';
// import { UserMiddleware } from 'src/users/user.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([Rooms,Booking,faq,AllUser])],
  controllers: [UsersController],
  providers: [UsersService,AllUsersService,JwtService],
})
export class UsersModule implements NestModule {

  async configure(consumer: import('@nestjs/common').MiddlewareConsumer){
  
  // consumer.apply(UserMiddleware).forRoutes('user');
  
  }
  
 
  
  }
