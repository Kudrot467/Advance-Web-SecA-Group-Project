import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class AddRoomDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNumber()
  readonly capacity: number;

  @IsNumber()
  readonly pricePerNight: number;
}

export class AddFlightDto {
  @IsNotEmpty()
  readonly airline: string;

  @IsDateString()
  readonly departureDateTime: Date;

  @IsDateString()
  readonly arrivalDateTime: Date;

  @IsNotEmpty()
  readonly origin: string;

  @IsNotEmpty()
  readonly destination: string;

  @IsNumber()
  readonly price: number;
}

export class AddVehicleDto {
  @IsNotEmpty()
  readonly make: string;

  @IsNotEmpty()
  readonly model: string;

  @IsNumber()
  readonly year: number;

  @IsNotEmpty()
  readonly type: string;

  @IsNumber()
  readonly pricePerDay: number;
}
