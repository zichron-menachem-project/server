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
import { ManagerService } from './manager.service';

@Controller('manager')
export class ManagerController {
    constructor(private managerService: ManagerService) { }

    @Get()
    async getAll() {
        try {
            return await this.managerService.getManagers();
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Get(':_id')
    async getManagerById(@Param('_id') _id: string) {
        try {
            return await this.managerService.getManagerById(_id);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Get('systemsManagers/:systemUid')
    async getManagersOfSystem(@Param('systemUid') systemUid: string) {
        return await this.managerService.getManagersOfSystem(systemUid);
    }

    @Post()
    async createManager(
        @Body('userId') userId: string,
        @Body('systemId') systemId: string,
        @Body('active') active: string,
        @Body('displayName') displayName: string,
        @Body('role') role: string,
    ) {
        try {
            return await this.managerService.AddManager(
                userId,
                systemId,
                active,
                displayName,
                role,
            );
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Put(':_id')
    async updateManager(
        @Param('_id') _id: string,
        @Body('userId') userId: string,
        @Body('systemId') systemId: string,
        @Body('active') active: string,
        @Body('displayName') displayName: string,
        @Body('role') role: string,
    ) {
        try {
            const isExists = await this.managerService.getManagerById(_id);

            if (!isExists) {
                return {
                    statusCode: 403,
                    message: ['user is not exists'],
                    error: 'Bad Request',
                };
            }

            return await this.managerService.updateManager(
                _id,
                userId,
                systemId,
                active,
                displayName,
                role,
            );
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    @Delete(':_id')
    async deleteManager(@Param('_id') _id: string) {
        try {
            return await this.managerService.deleteManager(_id);
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}
