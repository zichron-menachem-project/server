/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { app } from './firebase.middleware';


@Injectable()
export class PreauthMiddleware implements NestMiddleware {
    private defaultApp: any;

    constructor() {
        this.defaultApp = app;
    }

    async use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            try {
                const decodedToken = await this.defaultApp.auth().verifyIdToken(token.replace('Bearer ', ''));
                const user = {
                    uid: decodedToken.uid,
                    email: decodedToken.email
                }
                req['user'] = user;
                next();
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