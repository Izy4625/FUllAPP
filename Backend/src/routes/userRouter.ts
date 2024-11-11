import {Router} from "express";
import { getAllUsersController,voteController ,unVoteController} from "../controller/usersController";
import { authMiddleware ,managerAuthMiddleware} from "../middleware/authMiddleware";

const userRouter = Router();
userRouter.use(authMiddleware);
userRouter.get("/allusers", managerAuthMiddleware,getAllUsersController)
userRouter.post("/vote",voteController)
userRouter.post("/unvote", unVoteController)
export default userRouter