import { Router } from "express";
import { memberController } from "../../infrastructure/config/bootstrap";

const memberRouter = Router();

memberRouter.post("/members", memberController.create.bind(memberController));
memberRouter.get("/members", memberController.list.bind(memberController));

export default memberRouter;