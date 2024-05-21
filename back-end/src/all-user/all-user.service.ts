/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateAllUserDto } from './dto/create-all-user.dto';
import { UpdateAllUserDto } from './dto/update-all-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllUser } from './entities/all-user.entity';
import * as bcrypt from 'bcrypt';
import { AllUserSignUpDto } from './dto/all-user-signup.dto';
import { Roles } from 'src/utility/common/user-roles.enum';
import { hash } from 'bcrypt';

@Injectable()
export class AllUsersService {
  constructor(
    @InjectRepository(AllUser)
    private allUserRepository: Repository<AllUser>,
  ) {}

  async findByUsername(username: string): Promise<AllUser | undefined> {
    return this.allUserRepository.findOne({ where: { username } });
  }

  async findById(id: number): Promise<AllUser | undefined> {
    return this.allUserRepository.findOne({ where: { id } });
  }

  async create(createAllUserDto: CreateAllUserDto): Promise<AllUser> {
    // Check if username or email already exists
    const isUnique = await this.isUnique(
      createAllUserDto.username,
      createAllUserDto.email,
    );
    if (!isUnique) {
      throw new ConflictException('Username or email already exists');
    }

    const newUser = this.allUserRepository.create(createAllUserDto);
    return this.allUserRepository.save(newUser);
  }

  async isUnique(username: string, email: string): Promise<boolean> {
    const existingUser = await this.allUserRepository.findOne({
      where: [{ username }, { email }],
    });
    return !existingUser;
  }
  async findAll() {
    return this.allUserRepository.find();
  }

  // async update(id: number, updateAllUserDto: UpdateAllUserDto): Promise<AllUser | undefined> {
  //   const user = await this.findById(id);
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }
  //   Object.assign(user, updateAllUserDto);
  //   return this.allUserRepository.save(user);
  // }

  async update(
    id: number,
    updateAllUserDto: UpdateAllUserDto,
  ): Promise<AllUser> {
    const user = await this.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateAllUserDto.firstname !== undefined) {
      user.firstname = updateAllUserDto.firstname;
    }
    if (updateAllUserDto.lastname !== undefined) {
      user.lastname = updateAllUserDto.lastname;
    }
    if (updateAllUserDto.mobile !== undefined) {
      user.mobile = updateAllUserDto.mobile;
    }
    // if (updateUserDto.email !== undefined) {
    //   user.email = updateUserDto.email;
    // }
    if (updateAllUserDto.password !== undefined) {
      user.password = await bcrypt.hash(updateAllUserDto.password, 10);
    }

    return await this.allUserRepository.save(user);
  }

  async deleteUserByEmail(email: string): Promise<AllUser> {
    const user = await this.allUserRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return await this.allUserRepository.remove(user);
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.allUserRepository.delete(userId);
  }

  async findOne(id: number): Promise<AllUser> {
    const user = await this.allUserRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found.');
    return user;
  }

  async addAdmin(
    allUserSignUpDto: AllUserSignUpDto,
    currentUser: AllUser,
  ): Promise<AllUser> {
    // if (!currentUser.roles.includes(Roles.ADMIN)) {
    //   throw new BadRequestException('Unauthorized to add user');
    // }

    let newAdmin = this.allUserRepository.create(allUserSignUpDto);
    newAdmin.password = await hash(allUserSignUpDto.password, 10);
    newAdmin.usertype = 'admin';
    newAdmin = await this.allUserRepository.save(newAdmin);

    return newAdmin;
  }

  async updateUserAccountBalance(email: string, amount: number): Promise<void> {
    await this.allUserRepository
      .createQueryBuilder()
      .update(AllUser)
      .set({ accountBalance: () => `"accountBalance" + ${amount}` })
      .where('email = :email', { email })
      .execute();
  }
}
