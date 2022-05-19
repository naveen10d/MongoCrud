import mongoose from 'mongoose';
import { logger } from './LoggerConfig';

export class MongoConfig {
    constructor() {
            mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
                logger.info('DB Connnected');
            }).catch(() => {
                logger.error('Err on connection');
            });
        }
    }