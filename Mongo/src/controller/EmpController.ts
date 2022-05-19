import { Request, Response } from 'express';
import { EmpService } from '../service/EmpService';
import { EmployeeModel } from '../model/EmpModel';
import { Jwt } from '../config/JwtConfig';
import { logger } from '../config/LoggerConfig';
import {MESSAGE} from '../config/Constants';
export class EmpController {

    constructor(private empService: EmpService, private jwt: Jwt) {
    }
    async empCreate(req: Request, res: Response): Promise<void> {

        try {
            logger.info(MESSAGE.CONTROLLER_POST_INFO);
            const employee: EmployeeModel = await this.empService.empCreate(req.body);
            const response = {
                employee: employee,
                token: await this.jwt.generateToken(employee.employeeId)
            }
            res.status(201).send(response);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_POST_ERROR + err)
            if (err && err.name && err.name === 'ValidationError') {
            res.status(400).send(err);
            } else {
            res.status(500).send(err);
            }
        }
    }
    async empGet(req: Request, res: Response): Promise<void> {
          try {
                logger.info(MESSAGE.CONTROLLER_GETALL_INFO);
                const employee: EmployeeModel = await this.empService.empGet(req.body);
                res.status(200).send(employee);
            }
         catch (err) {
            logger.error(MESSAGE.CONTROLLER_GETALL_ERROR + err)
            res.status(500).send(err);
            }
    }

    async empRead(req: Request, res: Response): Promise<void> {
        try {   logger.info(MESSAGE.CONTROLLER_GET_INFO);
                const employee: EmployeeModel = await this.empService.empRead(req.params.id);
                res.status(200).send(employee);
        }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_GET_ERROR + err)
            if (err && err.path =="_id")  {
            res.status(404).send(err);
            } else {
                res.status(500).send(err);
            }
        }
    }


    async empUpdate(req: Request, res: Response): Promise<void> {

        try {    logger.info(MESSAGE.CONTROLLER_UPDATE_INFO);
                const employee: EmployeeModel = await this.empService.empUpdate(req.params.id, req.body);
                res.status(201).send(employee);
        } 
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_UPDATE_ERROR + err)
            if (err && err.path =="_id") {
            res.status(404).send(err);
            } else {
            res.status(500).send(err);
            }
        }
    }
    async empDelete(req: Request, res: Response): Promise<void> {
        try {
            logger.info(MESSAGE.CONTROLLER_DELETE_INFO);
            await this.empService.empDelete(req.params.id);
                res.status(204).send({ data: "Deleted" });
            }
        catch (err) {
            logger.error(MESSAGE.CONTROLLER_DELETE_ERROR + err)
            if ( err && err.path =="_id")  {
            res.status(404).send(err);
            } else {
            res.status(500).send(err);
            }
        }
    }


}

