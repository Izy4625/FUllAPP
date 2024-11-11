import mongoose, {Schema,Document,Types} from "mongoose";

export interface ICandidate {
    name: string,
    image: string,
    votes: number,
}
const candidateSchema = new Schema<ICandidate> ({
    name:{
        type: String
    },
    image:{
        type: String
    },
    votes:{
     votes: { type: Number,default: 0}
    },

})

export default mongoose.model<ICandidate>("Candidate",candidateSchema);