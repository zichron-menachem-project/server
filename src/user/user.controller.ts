/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get()
  async getAll() {
    try {
      return await this.userService.getUsers();
    } catch (err) {
      console.log(err);
      return err;
    }

  }

  @Get(':fireBaseUId')
  async getUserById(@Param('fireBaseUId') fireBaseUId: string) {
    try {
      return await this.userService.getUserById(fireBaseUId);
    } catch (err) {
      return err;
    }
  }

  @Get('email:email')
  async getUserByEmail(@Param('email') email: string) {
    try {
      return await this.userService.getUserByEmail(email);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Post()
  async signup(
    @Body('fireBaseUId') fireBaseUId: string,
    @Body('role') role: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string | undefined | null,
  ) {
    try {
      const aa = await this.userService.AddUser(
        fireBaseUId,
        role,
        firstName,
        lastName,
        email,
        phone,
      );
      console.log(aa);
      return aa;
    } catch (err) {
      return err;
    }

  }

  @Put(':fireBaseUId')
  async updateUser(
    @Param('fireBaseUId') fireBaseUId: string,
    @Body('role') role: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('email') email: string,
    @Body('phone') phone: string | undefined | null,
  ) {
    try {
      const isExists = await this.userService.getUserById(fireBaseUId);

      if (!isExists) {
        return {
          statusCode: 403,
          message: ['user is not exists'],
          error: 'Bad Request',
        };
      }

      return await this.userService.updateUser(fireBaseUId, role, firstName, lastName, email, phone);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':fireBaseUId')
  async deleteUser(@Param('fireBaseUId') fireBaseUId: string) {
    try {
      return await this.userService.deleteUser(fireBaseUId);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
