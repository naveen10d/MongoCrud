import cors from 'cors';
import express from 'express';
import { MongoConfig } from './config/MongoConfig'
import { EmpRoute } from './routes/EmpRouter';
import { EmpController } from './controller/EmpController';
import { EmpService } from './service/EmpService';
import { EmpDao } from './dao/EmpDao';
import { Jwt } from './config/JwtConfig';
import * as dotenv from 'dotenv';
import { logger } from './config/LoggerConfig';

        const empDao = new EmpDao();
        const empService = new EmpService(empDao);
        const jwt=new Jwt();
        const empController = new EmpController(empService,jwt);
        const empRoute = new EmpRoute(empController,jwt);
        const app: express.Application = express();
        app.use(cors());
        app.use(express.urlencoded({extended:true}));
        app.use(express.json());
        dotenv.config();
        new MongoConfig();
        empRoute.empRoutes(app);
        app.listen(process.env.PORT, () => {
        logger.info('App is listening on port',process.env.PORT);
        });
        export default app;
