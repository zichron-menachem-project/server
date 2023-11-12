/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UpdateMarkerMiddleware } from '../auth/marker.middleware/updateMarker.middleware';
import { AddMarkerMiddleware } from '../auth/marker.middleware/addMarker.middleware';
import { MarkerController } from './marker.controller';
import { MarkerSchema } from './marker.model';
import { MarkerService } from './marker.service';
import { SystemModule } from 'src/system/system.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Marker', schema: MarkerSchema }]), SystemModule],
  controllers: [MarkerController],
  providers: [MarkerService],
})
export class MarkerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AddMarkerMiddleware).forRoutes({
      path: 'marker', method: RequestMethod.POST
    });
    consumer.apply(UpdateMarkerMiddleware).forRoutes({
      path: 'marker*', method: RequestMethod.PUT
    }, {
      path: 'marker*', method: RequestMethod.DELETE
    });
  }
}
