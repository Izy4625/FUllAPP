import {Request, Response} from "express";
import { getAllCandidates } from "../services/dbservices";


export const getAllCandidatesController = async (req: Request,res: Response)=>{
    const allcandidates = await getAllCandidates();
    if(!allcandidates){
        res.status(400).json({mess: "couldnt fetch all users"});
        return
      };
      res.status(200).json({message: "here you go" + allcandidates})
}
