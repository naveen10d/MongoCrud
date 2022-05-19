import { EmpDao } from "../dao/EmpDao";
import { EmployeeModel } from "../model/EmpModel";
import { logger } from '../config/LoggerConfig';
import {MESSAGE} from '../config/Constants';

      
export class EmpService {
    constructor(private empDao: EmpDao) {

    }
    async empCreate(employees: EmployeeModel):Promise<EmployeeModel> {
        logger.info(MESSAGE.SERVICE_POST_INFO);
        return await this.empDao.save(employees);
    }

    async empGet(body: EmployeeModel):Promise<EmployeeModel> {
        logger.info(MESSAGE.SERVICE_GETALL_INFO);
        return await this.empDao.getAll();
    }
    async empRead(id: String):Promise<EmployeeModel> {
        logger.info(MESSAGE.SERVICE_GET_INFO);
        return await this.empDao.getById(id);
    }
    async empUpdate(id: String, employees: EmployeeModel):Promise<EmployeeModel> {
        logger.info(MESSAGE.SERVICE_UPDATE_INFO);
       return await this.empDao.findByIdAndUpdate(id, employees);
    }
    //returns nothing as void
    async empDelete(id: String):Promise<void> {
         logger.info(MESSAGE.SERVICE_DELETE_INFO);
         return await this.empDao.findByIdAndDelete(id);
    }
}