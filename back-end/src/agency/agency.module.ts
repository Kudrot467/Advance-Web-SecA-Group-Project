import { Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { Room, Flight, Vehicle } from './entities/agency.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule, JwtService } from '@nestjs/jwt'
import {AllUser} from '../all-user/entities/all-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Flight, Vehicle, AllUser]), AuthModule, JwtModule.register({ secret: 'secret101' })], 
  controllers: [AgencyController],
  providers: [AgencyService],
  exports: [AgencyService]
})
export class AgencyModule {}
