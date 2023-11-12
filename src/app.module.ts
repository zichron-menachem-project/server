/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SystemModule } from './system/system.module';
import { MarkerModule } from './marker/marker.module';
import { RequestModule } from './request/request.module';
import { ManagerModule } from './manager/manager.module';
import { SendGridModule } from './sendgrid/sendGrid.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb+srv://ezerplace:${process.env.DB_KEY}/ezerplaceDB?retryWrites=true&w=majority`,
    ),
    UserModule,
    SystemModule,
    ManagerModule,
    MarkerModule,
    RequestModule,
    SendGridModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}


