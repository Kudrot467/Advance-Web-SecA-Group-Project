import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/admin/entities/admin.entity';
import { Rooms } from 'src/admin/entities/admin.entity';
import { promises } from 'dns';
import { Booking } from 'src/booking/entities/booking.entity';
import { faq } from 'src/faq/entities/faq.entity';
import { CreateFaqDto } from "../faq/dto/create-faq.dto";

@Injectable()
export class UsersService {
  updateUserAccountBalance(email: string, amount: number) {
    throw new Error('Method not implemented.');
  }
  findOne(arg0: number) {
    throw new Error('Method not implemented.');
  }
  constructor(

    @InjectRepository(Rooms) private readonly roomRepo: Repository<Rooms>,
    @InjectRepository(Booking) private readonly bookRepo: Repository<Booking>,
    @InjectRepository(faq) private readonly faqRepo: Repository<faq>
  ) { }


 async findroom(location: string) {
    return this.roomRepo.find({ where: { location: location } });

  }

  // async BookRoom(id:number){

  // const room=await this.roomRepo.find({ where: { id: id } });
  
  // return await this.bookRepo.save(room);


  // }
  async BookRoom(name: string) {
    // Find the room by name instead of ID
    const room = await this.roomRepo.findOne({ where: { Hotelname: name } });
    if (!room) {
      throw new Error("Room not found");
    }
    
    
    const booking = new Booking();
    booking.Hotelname = room.Hotelname;
    booking.price = room.price;
    booking.location = room.location;
    booking.type = room.type;
  
   
  
    
    return await this.bookRepo.save(booking);
  }
 

  async findAll() {
   
    return await this.bookRepo.find({});
  }
  async seefaq(question: string) {
   
    return await this.faqRepo.findOne({ where: { question: question } });
  }

  async getAllFaqs() {
    const faqs = await this.faqRepo.find({ select: ["question"] });
    return faqs.map(faq => faq.question);
  }

}
