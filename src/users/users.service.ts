import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { updateUserDTO, createUserDTO } from './users.dto';
dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
  ) {}

  async create(data: Partial<createUserDTO>): Promise<Users> {
    const user = this.usersRepo.create(data);
    return this.usersRepo.save(user);
  }

  async update(id: number, updateData: updateUserDTO): Promise<Users> {
    const user = await this.usersRepo.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    Object.assign(user, updateData);
    await this.usersRepo.update(id, updateData);

    return user;
  }

  async findAll(): Promise<Users[]> {
    return this.usersRepo.find();
  }

  async findOne(id: number): Promise<Users | null> {
    return this.usersRepo.findOneBy({ id });
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    return this.usersRepo.findOneBy({ email });
  }

  async remove(id: number): Promise<void> {
    await this.usersRepo.delete(id);
  }
}
