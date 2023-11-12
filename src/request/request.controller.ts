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
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
    constructor(private requestService: RequestService) { }

    @Get()
    async getAll() {
        try {
            return await this.requestService.getRequests();
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Get(':_id')
    async getRequestById(@Param('_id') _id: string) {
        try {
            return await this.requestService.getRequestById(_id);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Get('systemsRequests/:systemUid')
    async getRequestsOfSystem(@Param('systemUid') systemUid: string) {
        return await this.requestService.getRequestsOfSystem(systemUid);
    }

    @Post()
    async createRequest(
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('systemId') systemId: string,
        @Body('displayName') displayName: string,
        @Body('status') status: string,
        @Body('notes') notes: string,
    ) {
        try {
            return await this.requestService.AddRequest(
                firstName,
                lastName,
                email,
                phone,
                systemId,
                displayName,
                status,
                notes,
            );
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Put(':_id')
    async updateRequest(
        @Param('_id') _id: string,
        @Body('firstName') firstName: string,
        @Body('lastName') lastName: string,
        @Body('email') email: string,
        @Body('phone') phone: string,
        @Body('systemId') systemId: string,
        @Body('displayName') displayName: string,
        @Body('status') status: string,
        @Body('notes') notes: string,
    ) {
        try {
            const isExists = await this.requestService.getRequestById(_id);

            if (!isExists) {
                return {
                    statusCode: 403,
                    message: ['user is not exists'],
                    error: 'Bad Request',
                };
            }

            return await this.requestService.updateRequest(
                _id,
                firstName,
                lastName,
                email,
                phone,
                systemId,
                displayName,
                status,
                notes,
            );
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Delete(':_id')
    async deleteRequest(@Param('_id') _id: string) {
        try {
            return await this.requestService.deleteRequest(_id);
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}
