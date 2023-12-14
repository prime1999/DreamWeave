import express from "express";
import {
	registerUser,
	authUser,
	logUserOut,
	updateUser,
} from "../controller/UserController.js";
import { protect } from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

/*
POST: registerUser Public;
POST: authUser Public
POST: logUserOut Private
PATCH: updateUser Private
*/

UserRouter.post("/registerUser", registerUser);
UserRouter.post("/authUser", authUser);
UserRouter.post("/logUserOut", protect, logUserOut);
UserRouter.patch("/updateUser", protect, updateUser);

export default UserRouter;
