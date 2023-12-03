import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('me')
  getUserInfo(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUserInfo(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUserInfo(userId, dto);
  }
}
