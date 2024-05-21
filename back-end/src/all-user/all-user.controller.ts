/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AllUsersService } from './all-user.service';
import { CreateAllUserDto } from './dto/create-all-user.dto';
import { UpdateAllUserDto } from './dto/update-all-user.dto';
import { OwnUserGuard } from './own-user.guard';
import { Auth } from 'src/auth/entities/auth.entity';
import { AllUserSignUpDto } from './dto/all-user-signup.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AllUser } from './entities/all-user.entity';
import { AuthenticationGuard } from 'src/utility/guards/authentication.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('All Users')
@Controller('all-users')
export class AllUsersController {
  constructor(private readonly allUsersService: AllUsersService) {}
  @Post()
  create(@Body() createAllUserDto: CreateAllUserDto) {
    return this.allUsersService.create(createAllUserDto);
  }
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body(ValidationPipe) createAllUserDto: CreateAllUserDto) {
    return await this.allUsersService.create(createAllUserDto);
  }
  @UseGuards(AuthGuard)
  @Get('all-user')
  findAll() {
    return this.allUsersService.findAll();
  }

  @UseGuards(OwnUserGuard)
  @Get('username/:username')
  async findByUsername(@Param('username') username: string) {
    const user = await this.allUsersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getByType(@Request() req: any) {
    const { username } = req.user;
    const user = await this.allUsersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.allUsersService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  // @UseGuards(AuthGuard)
  // @Patch(':id')
  // async update(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body(ValidationPipe) updateAllUserDto: UpdateAllUserDto,
  // ) {
  //   const updatedUser = await this.allUsersService.update(id, updateAllUserDto);
  //   if (!updatedUser) {
  //     throw new NotFoundException('User not found');
  //   }
  //   return updatedUser;
  // }

  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateAllUserDto: UpdateAllUserDto,
  ) {
    const updatedUser = await this.allUsersService.update(id, updateAllUserDto);
    return updatedUser;
  }

  @UseGuards(AuthGuard)
  @Delete('deleteuser/:email')
  async deleteUserByEmail(@Param('email') email: string) {
    const deletedUser = await this.allUsersService.deleteUserByEmail(email);
    return { message: 'User deleted successfully', deletedUser };
  }

  // @UseGuards(AuthenticationGuard)
  // @UseGuards(AuthGuard)
  // @Delete('delete/me')
  // async deleteAccount(): Promise<{ message: string }> {
  //   await this.allUsersService.deleteAccount(currentUser.id.toString());
  //   return { message: 'Your account has been deleted successfully.' };
  // }

  @UseGuards(AuthGuard)
  @Post('add-admin')
  async addAdmin(
    @Body() allUserSignUpDto: AllUserSignUpDto,
    @CurrentUser() currentUser: AllUser,
  ): Promise<{ user: AllUser }> {
    return {
      user: await this.allUsersService.addAdmin(allUserSignUpDto, currentUser),
    };
  }
}
