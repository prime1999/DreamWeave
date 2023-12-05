import express from "express";
import {
	registerUser,
	authUser,
	logUserOut,
} from "../controller/UserController.js";
import { protect } from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

/*
POST: registerUser Public;
POST: authUser Public
POST: logUserOut Private
*/

UserRouter.post("/registerUser", registerUser);
UserRouter.post("/authUser", authUser);
UserRouter.post("/logUserOut", protect, logUserOut);

export default UserRouter;
