import mongoose from 'mongoose';
import { empSchema, EmployeeModel } from '../model/EmpModel';
import { logger } from '../config/LoggerConfig';
import { MESSAGE } from '../config/Constants';

export class EmpDao {
    constructor() {

    }
    async save(employees: EmployeeModel):Promise<EmployeeModel> {
        logger.info(MESSAGE.DAO_POST_INFO);
        const employee = new EmployeeModel(employees);
        return await employee.save();
    }
    async getAll():Promise<EmployeeModel> {
        logger.info(MESSAGE.DAO_GETALL_INFO);
        return await EmployeeModel.find();
    }
    async getById(id: String):Promise<EmployeeModel> {
        logger.info(MESSAGE.DAO_GET_INFO);
        return await EmployeeModel.findById(id);
    }
    async findByIdAndUpdate(id: String, employees: EmployeeModel):Promise<EmployeeModel> {
        logger.info(MESSAGE.DAO_UPDATE_INFO);
        return await EmployeeModel.findByIdAndUpdate(id,employees,{new: true});
    }

    //returns nothing as void
    async findByIdAndDelete(id: String):Promise<void> {
        logger.info(MESSAGE.DAO_DELETE_INFO);
        await EmployeeModel.findByIdAndDelete(id);
    }
}