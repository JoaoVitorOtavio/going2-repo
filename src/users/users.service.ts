import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import * as dotenv from 'dotenv';
import { updateUserDTO, createUserDTO } from './users.dto';
import * as bcrypt from 'bcrypt';
dotenv.config();

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepo: Repository<Users>,
  ) {}

  async create(data: createUserDTO): Promise<Users> {
    try {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(data.password, salt);

      data.password = hashedPassword;

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
    try {
      const user = await this.usersRepo.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      Object.assign(user, updateData);
      await this.usersRepo.update(id, updateData);

      return user;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error?.message || 'Erro ao criar usuário',
        );
      }

      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  // async updatePassword(
  //   id: number,
  //   newPassword: string,
  //   currentPassword: string,
  // ): Promise<Users> {}

  async findAll(): Promise<Users[]> {
    try {
      return await this.usersRepo.find();
    } catch (error: any) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          error?.message || 'Erro ao buscar usuários',
        );
      }

      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }

  async findOne(id: number): Promise<Users | null> {
    try {
      const user = await this.usersRepo.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error?.message || 'Erro ao buscar usuário',
        );
      }

      throw new BadRequestException('Erro ao buscar usuário');
    }
  }

  async findOneByEmail(email: string): Promise<Users | null> {
    try {
      const user = await this.usersRepo.findOneBy({ email });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      return user;
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error?.message || 'Erro ao buscar usuário por e-mail',
        );
      }

      throw new BadRequestException('Erro ao buscar usuário por e-mail');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      const user = await this.usersRepo.findOneBy({ id });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      await this.usersRepo.delete(id);
    } catch (error: any) {
      if (error instanceof Error) {
        throw new BadRequestException(
          error?.message || 'Erro ao deletar usuário',
        );
      }

      throw new BadRequestException('Erro ao deletar usuário');
    }
  }
}
