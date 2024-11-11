import Router from "express"
import { getAllCandidatesController } from "../controller/candidateController"
import { authMiddleware,managerAuthMiddleware } from "../middleware/authMiddleware";

const candidateRouter = Router();
candidateRouter.use(authMiddleware,managerAuthMiddleware)
candidateRouter.get("/allcandidates", getAllCandidatesController);
export default candidateRouter;