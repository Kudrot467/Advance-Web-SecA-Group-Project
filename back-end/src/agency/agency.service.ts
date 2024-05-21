import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { AddRoomDto, AddFlightDto, AddVehicleDto } from './dto/create-agency.dto';
import { UpdateRoomDto, UpdateFlightDto, UpdateVehicleDto } from './dto/update-agency.dto';
import { Repository } from 'typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Room, Flight, Vehicle } from './entities/agency.entity';
import { AllUser } from '../all-user/entities/all-user.entity';
import { userInfo } from 'os';
@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Flight)
    private flightRepository: Repository<Flight>,
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,
    @InjectRepository(AllUser)
    private allUserRepository: Repository<AllUser>,
  ) {}

  async getRoomById(id: number): Promise<Room | undefined> {
    return this.roomRepository.findOne({ where: { id } });
  }

  async getFlightById(id: number): Promise<Flight | undefined> {
    return this.flightRepository.findOne({ where: { id } });
  }

  async getVehicleById(id: number): Promise<Vehicle | undefined> {
    return this.vehicleRepository.findOne({ where: { id } });
  }

  async getResourceByTypeAndId(type: string, id: number, username: string): Promise<Room | Flight | Vehicle | undefined> {
    switch (type) {
      case 'room':
        return this.roomRepository.findOne({ where: { id, username } });
      case 'flight':
        return this.flightRepository.findOne({ where: { id, username } });
      case 'vehicle':
        return this.vehicleRepository.findOne({ where: { id, username } });
      default:
        throw new NotFoundException(`Resource type ${type} not found`);
    }
  }

  async getResourcesByTypeAndUsername(type: string, username: string): Promise<(Room | Flight | Vehicle)[]> {
    switch (type) {
      case 'room':
        return this.roomRepository.find({ where: { username } });
      case 'flight':
        return this.flightRepository.find({ where: { username } });
      case 'vehicle':
        return this.vehicleRepository.find({ where: { username } });
      default:
        throw new NotFoundException(`Resource type ${type} not found`);
    }
  }

  // async addRoom(addRoomDto: AddRoomDto): Promise<Room> {
  //   const newRoom = this.roomRepository.create(addRoomDto);
  //   return this.roomRepository.save(newRoom);
  // }
  async addRoom(addRoomDto: AddRoomDto, username: string): Promise<Room> {
    const user = await this.allUserRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const newRoom = new Room();
    newRoom.name = addRoomDto.name;
    newRoom.description = addRoomDto.description;
    newRoom.capacity = addRoomDto.capacity;
    newRoom.pricePerNight = addRoomDto.pricePerNight;
    newRoom.username = username;
  
    return this.roomRepository.save(newRoom);
  }
  

  // async addFlight(addFlightDto: AddFlightDto): Promise<Flight> {
  //   const newFlight = this.flightRepository.create(addFlightDto);
  //   return this.flightRepository.save(newFlight);
    
  // }

  // async addVehicle(addVehicleDto: AddVehicleDto): Promise<Vehicle> {
  //   const newVehicle = this.vehicleRepository.create(addVehicleDto);
  //   return this.vehicleRepository.save(newVehicle);
  // }

  async addFlight(addFlightDto: AddFlightDto, username: string): Promise<Flight> {
    const user = await this.allUserRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const newFlight = new Flight();
    newFlight.airline = addFlightDto.airline;
    newFlight.departureDateTime = addFlightDto.departureDateTime;
    newFlight.arrivalDateTime = addFlightDto.arrivalDateTime;
    newFlight.origin = addFlightDto.origin;
    newFlight.destination = addFlightDto.destination;
    newFlight.price = addFlightDto.price;
    newFlight.username = username;

    return this.flightRepository.save(newFlight);
  }

  async addVehicle(addVehicleDto: AddVehicleDto, username: string): Promise<Vehicle> {
    const user = await this.allUserRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const newVehicle = new Vehicle();
    newVehicle.make = addVehicleDto.make;
    newVehicle.model = addVehicleDto.model;
    newVehicle.year = addVehicleDto.year;
    newVehicle.type = addVehicleDto.type;
    newVehicle.pricePerDay = addVehicleDto.pricePerDay;
    newVehicle.username = username;

    return this.vehicleRepository.save(newVehicle);
  }

  async updateRoom(id: number, username: string, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.getRoomById(id);
    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }
    
    // Update room properties
    room.name = updateRoomDto.name;
    room.description = updateRoomDto.description;
    room.capacity = updateRoomDto.capacity;
    room.pricePerNight = updateRoomDto.pricePerNight;
    room.username = username;
  
    // Save the updated room
    return this.roomRepository.save(room);
  }
  

  async updateFlight(id: number, username: string, updateFlightDto: UpdateFlightDto): Promise<Flight> {
    const flight = await this.getFlightById(id);
    if (!flight) {
      throw new NotFoundException(`Flight with ID ${id} not found`);
    }
    
    // Update flight properties
    flight.airline = updateFlightDto.airline;
    flight.departureDateTime = updateFlightDto.departureDateTime;
    flight.arrivalDateTime = updateFlightDto.arrivalDateTime;
    flight.origin = updateFlightDto.origin;
    flight.destination = updateFlightDto.destination;
    flight.price = updateFlightDto.price;
    flight.username = username;
    // Save the updated flight
    return this.flightRepository.save(flight);
  }
  
  async updateVehicle(id: number, username: string, updateVehicleDto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id);
    if (!vehicle) {
      throw new NotFoundException(`Vehicle with ID ${id} not found`);
    }
    
    // Update vehicle properties
    vehicle.make = updateVehicleDto.make;
    vehicle.model = updateVehicleDto.model;
    vehicle.year = updateVehicleDto.year;
    vehicle.type = updateVehicleDto.type;
    vehicle.pricePerDay = updateVehicleDto.pricePerDay;
    vehicle.username = username;
    // Save the updated vehicle
    return this.vehicleRepository.save(vehicle);
  }
  
  
}
