import User, { IUser } from "../models/userModel"
import Candidate, { ICandidate } from "../models/candidateModel";
import { Types } from "mongoose";

export const createUser = async (user: Partial<IUser>): Promise<IUser | null> => {
    console.log("inside service");
    
    const newUser = await User.create(user);
    console.log(newUser);
    
    if (!newUser) {
        throw new Error("no user"); 
       
    }
    await newUser.save()
    return newUser   
    
}

export const findUserbyName = async (name: string): Promise<IUser | null> => {
    const currentUser = await User.findOne({ userName: name });
    console.log(currentUser);
    
    if(currentUser)return currentUser;
    return null
  

}
export const getAllUsers = async (): Promise<IUser[] | null> => { return User.find().select("-password") };

export const updateVote = async (id: Types.ObjectId, voteId: string) => {
    const tatrgetedUser: IUser | null = await User.findById(id);
    if (tatrgetedUser?.isVoted) return
    const user = await  User.findByIdAndUpdate(id, { votedFor: voteId, isVoted: true }, { new: true });
    const newcandidate = await  Candidate.findByIdAndUpdate(voteId, { $inc: { votes: 1 } })
    console.log(newcandidate);
    

    return user
};
export const updateReverseVote = async (id: Types.ObjectId, voteId: string) => {
    const tatrgetedUser: IUser | null = await User.findById(id);
    if (!tatrgetedUser?.isVoted) return
    const user = User.findByIdAndUpdate(id, { votedFor: null, isVoted: false }, { new: true });
    const candidate = Candidate.findByIdAndUpdate(voteId, { $inc: { votes: -1 } });
    return user
};
export const getAllCandidates = async (): Promise<ICandidate[] | null> => { return Candidate.find() };
