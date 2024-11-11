import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";



export interface IUser extends Document  {
        userName: string,
        email: string,
        password?: string,
        isVoted: boolean,
        votedFor: Types.ObjectId | null
        role: "user" | "admin",
        comparePassword(userPassword: string): Promise<boolean>
           
}

const userSchema = new Schema<IUser> ({
    userName: {
        type: String,
        required: true,

    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        
        validate: [validator.isEmail , "your email adress is not valid" ]
        
      },
      password: {
            type: String,
            required: true
      },
      isVoted:{
        type: Boolean
      },
      votedFor:{
         type: Schema.Types.ObjectId , ref: "candidates"
      },
      role: {type: String,
        enum: ["user","admin"]
      }
   
})

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return next();
    if(this.password){
  
    this.password = await bcrypt.hash(this.password, 10);}
    next();
  });
  
  // השוואה בין הסיסמה שהמשתמש הזין לעומת ההצפנה
  userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    return await bcrypt.compare(userPassword, this.password)
  }
  export default mongoose.model<IUser>("User", userSchema);
  