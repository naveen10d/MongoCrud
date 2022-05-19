
import mongoose from 'mongoose';

const { Schema } = mongoose;

export interface EmployeeModel {
    employeeId: String,
    firstName: String,
    lastName: String,
    address: {
        no: Number,
        street: String,
        place: String,
        tk: String,
        dt: String,
        state: String,
        pin: Number
    },
    mobileNumber: Number,
}

export const empSchema = new Schema({
    employeeId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
        type: {
            no: Number,
            street: String,
            place: String,
            tk: String,
            dt: String,
            state: String,
            pin: Number
        }, required: true
    },
    mobileNumber: {
        type: Number,
        required: true
    },
});

export const EmployeeModel = mongoose.model('employees', empSchema);
