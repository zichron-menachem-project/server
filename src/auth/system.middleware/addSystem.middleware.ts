/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { app } from '../firebase.middleware';
import { SystemService } from '../../system/system.service';

@Injectable()
export class AddSystemMiddleware implements NestMiddleware {
    private defaultApp: any;
    private maxSystems: number;
    
    constructor(private systemService: SystemService) {
        this.defaultApp = app;
        this.maxSystems = 4;
    }

    async use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        // const _id = req.params._id;
        if (token != null && token != '') {
            try {
                const decodedToken = await this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''));
                const user = {
                    uid: decodedToken.uid,
                    email: decodedToken.email
                }
                req['user'] = user;

                const systems = await this.systemService.getSystemsOfAdmin(user.uid);
                if (systems.length < this.maxSystems) {
                    next();
                }
                else {
                    this.accessDenied(req.url, res);
                }
            } catch (error) {
                console.error(error);
                this.accessDenied(req.url, res);
            }
        } else {
            this.accessDenied(req.url, res);
        }
    }

    private accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'Access Denied'
        });
    }
}