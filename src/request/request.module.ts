/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestController } from './request.controller';
import { RequestSchema } from './request.model';
import { RequestService } from './request.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Request', schema: RequestSchema }])],
  controllers: [RequestController],
  providers: [RequestService],
})
export class RequestModule {}
