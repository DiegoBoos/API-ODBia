import { Body, Controller, Get, Param, Patch } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Auth } from 'src/auth/decorators';
import { UserService } from './user.service';


@ApiTags('2. API User')
@Controller('user')
@Auth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.userService.findUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, UpdateUserDto);
  }
}
