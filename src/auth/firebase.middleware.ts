/* eslint-disable prettier/prettier */
import * as firebase from 'firebase-admin';
import config from './config';

export const app =  firebase.initializeApp(config.firebase);