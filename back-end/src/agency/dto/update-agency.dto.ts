import { PartialType } from '@nestjs/mapped-types';
import { AddRoomDto, AddFlightDto, AddVehicleDto } from './create-agency.dto';

export class UpdateRoomDto extends PartialType(AddRoomDto) {}
export class UpdateFlightDto extends PartialType(AddFlightDto) {}
export class UpdateVehicleDto extends PartialType(AddVehicleDto) {}
