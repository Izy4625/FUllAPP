import jwt from 'jsonwebtoken';
import {Types} from "mongoose"

export const generateToken = (userId: Types.ObjectId, role:string): string => {
    return jwt.sign({userId, role}, "Eibeshter_Hot_Mich_lib", {expiresIn: '1h'})
}