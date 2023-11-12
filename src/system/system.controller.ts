/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request } from 'express';
import { 
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { SystemService } from './system.service';

@Controller('system')
export class SystemController {
  constructor(private systemService: SystemService) { }

  @Get()
  async getAllSystems() {
    return await this.systemService.getAllSystems();
  }

  @Get('ofAdmin')
  async getSystemsOfAdmin(@Req() request: Request) {
    return await this.systemService.getSystemsOfAdmin(request['user'].uid);
  }

  @Get(':_id')
  async getSystemById(@Param('_id') _id: string) {
    try {
      return await this.systemService.getSystemById(_id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Get('urlName/:urlName')
  async getSystemByUrlName(@Param('urlName') urlName: string) {
    return await this.systemService.getSystemByUrlName(urlName);
  }

  @Post()
  async createSystem(
    @Body('topic') topic: string,
    @Body('urlName') urlName: string,
    @Body('urlImg') urlImg: string,
    @Body('objectName') objectName: string,
    @Body('adminUid') adminUid: string,
    @Body('description') description: string,
    @Body('communicationDetails') communicationDetails: object,
  ) {
    try {
      return await this.systemService.AddSystem(
        topic,
        urlName,
        urlImg,
        objectName,
        adminUid,
        description,
        communicationDetails,
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Put(':_id')
  async updateSystem(
    @Param('_id') _id: string,
    @Body('topic') topic: string,
    @Body('urlName') urlName: string,
    @Body('urlImg') urlImg: string,
    @Body('objectName') objectName: string,
    @Body('adminUid') adminUid: string,
    @Body('description') description: string,
    @Body('communicationDetails') communicationDetails: object,
    @Req() request: Request
  ) {
    try {
      const isExists = await this.systemService.getSystemById(_id);

      if (!isExists) {
        return {
          statusCode: 403,
          message: ['user is not exists'],
          error: 'Bad Request',
        };
      }
      
      return await this.systemService.updateSystem(
        _id,
        topic,
        urlName,
        urlImg,
        objectName,
        adminUid,
        description,
        communicationDetails,
      );
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  @Delete(':_id')
  async deleteSystem(@Param('_id') _id: string) {
    try {
      return await this.systemService.deleteSystem(_id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

