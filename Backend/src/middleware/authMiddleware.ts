//פונקציה גנרית לאימות תוקן של משתמש
import { Request, Response, NextFunction } from "express";
import jwt, { decode } from "jsonwebtoken";
import {Types} from "mongoose"

//לפני שאממש בפועל אני מגדיר אינטרפייס שיכלול משתמש

export interface AuthRequest extends Request {
    user?: { _id: Types.ObjectId, role?: string }
};


//אימות משתמש
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    // ניסיון לחלץ את הטוקן 
    const token = req.cookies.token
    //אם אין תוקן תחזיר שגיאה 401
    if (!token) {
        res.status(401).json({ message: 'אין לך תוקן התנתק וזריזז' });
        return;
    }
    try {
        //ניסיון לאמת את הטוקן
        const decoded = jwt.verify(token, "Eibeshter_Hot_Mich_lib") as { _id: Types.ObjectId, role: string }
    
        //אם האימות מצליח אני מוסיף את פרטי המשתמש לאובייקט הבקשה
        req.user = decoded;
        //ממשיך לפונקציה הבאה בשרשרת הטיפול
        next();
    } catch (error) {
        res.status(401).json({ message: 'הטוקן לא בתוקף' });
    }
}

export const managerAuthMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !=='admin') {
        res.status(403).json({message: "Access denied, admins only!"})
    } else {
        next()
    }
}

