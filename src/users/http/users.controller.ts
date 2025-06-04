import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../users.service';
import { Users } from '../users.entity';
import { createUserDTO, updateUserDTO } from '../users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: createUserDTO): Promise<Users> {
    return this.usersService.create(data);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: updateUserDTO,
  ): Promise<Users> {
    return this.usersService.update(id, data);
  }

  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Users | null> {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
