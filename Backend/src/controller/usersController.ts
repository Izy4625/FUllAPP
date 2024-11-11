import {Request,Response} from "express";
import { getAllUsers ,updateVote,updateReverseVote} from "../services/dbservices";
import { AuthRequest } from "../middleware/authMiddleware";


export const getAllUsersController = async (req: Request,res: Response)=>{
      const allUsers = await getAllUsers();
      if(!allUsers){
        res.status(400).json({mess: "couldnt fetch all users"});
        return
      };
      res.status(200).json({message: "here you go" + allUsers})
}
export const voteController = async (req: AuthRequest,res: Response)=>{
  const userId = req.user?._id
    const {votedFor} = req.body;
    if(!userId)return
    const newUser = await updateVote(userId,votedFor);
    if(!newUser){
        res.status(400).json({mess: "couldnt update your vote"});
        return
    };
    res.status(200).json({message: "here you go you voted" + newUser})
}
export const unVoteController = async(req: AuthRequest,res: Response)=>{
    const userId = req.user?._id
    const {votedFor} = req.body;
    if(!userId)return
    const newUser = await updateReverseVote(userId,votedFor);
    if(!newUser){
        res.status(400).json({mess: "couldnt update your vote"});
        return
    };
    res.status(200).json({message: "here you go you voted" + newUser})
}
