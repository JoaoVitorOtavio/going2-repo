import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    try {
      const user = this.usersRepo.create(data);
      const result = await this.usersRepo.save(user);

      return result;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error?.message || 'Erro ao criar usuário',
        );
      }

      throw new BadRequestException('Erro ao criar usuário');
    }
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
