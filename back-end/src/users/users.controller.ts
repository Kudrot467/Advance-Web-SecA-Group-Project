import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
  UseInterceptors,
  Delete
} from '@nestjs/common';
// import { CreateAdminDto } from "./dto/create-admin.dto";
// import { CreateRoomDto } from "./dto/create-room.dto";
import { UsersService } from "./users.service";
import { CreateFaqDto } from "../faq/dto/create-faq.dto";
import { CreateUserDto } from './dto/create-user.dto';
// import { AllUsersService } from '../all-user/all-user.service';

// import { SessionGuard } from "./session.guard";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { Admin, Rooms } from "src/admin/entities/admin.entity";

// import { Rider } from "src/rider/entities/rider.entity";
interface FileParams { fileName: string; }
@Controller('user')

export class UsersController {
  constructor(
    private readonly userService: UsersService,
    // private readonly allUsersService: AllUsersService,
  ) {}

  @Get('BookingHistory')
  // @UseGuards(SessionGuard)
  findAll() {
      return this.userService.findAll();
  }


  @Get("search/:location")

  findRoom(@Param("location") location: string) {
    return this.userService.findroom(location);
  }
  @Post('showfaq')
async seefaq(@Body('question') question: string) {
    return this.userService.seefaq(question);
}
// @Post('signup')

 
// async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto) {
//   return await this.allUsersService.create(createUserDto);
// }

  // @Post("booking/:id")
  // // @UseGuards(UserGuard)
  // // @UseGuards(SessionGuard)
  // // BookRoom(@Param("id") id: number) {
  // //   return this.userService.BookRoom(id);
  // // }

  @Post("booking/:name")
BookRoom(@Param("name") name: string) {
  return this.userService.BookRoom(name);
}

  @Get('Showfaq') 
  async showAllFaqs(){
    return this.userService.getAllFaqs();
  }

 

 

 








  // @Get()
  // // @UseGuards(SessionGuard)
  // findAll() {
  //   return this.adminService.findAll();
  // }





  // @Post('create')
  // createAdmin(@Body(ValidationPipe) CreateAdminDto: CreateAdminDto) {
  //   return this.adminService.create(CreateAdminDto);
  // }



  // // @Patch(":id")
  // // // @UseGuards(SessionGuard)
  // // update(@Param("id") id:number, @Body()UpdateAdminDto:UpdateAdminDto){
  // //     return this.adminService.update(id,UpdateAdminDto);
  // // }

  // @Delete(':id')
  // // @UseGuards(SessionGuard)
  // remove(@Param('id') id: number) {
  //   return this.adminService.deleteById(+id);
  // }

  // @Delete(":name")
  // // @UseGuards(SessionGuard)
  // removeByName(@Param('name') name: string) {
  //   return this.adminService.removeByName(name);
  // }


  // @Post('/addroom')
  // createroom(@Body(ValidationPipe) CreateRoomDto: CreateRoomDto) {
  //   return this.adminService.createroom(CreateRoomDto);
  // }











}