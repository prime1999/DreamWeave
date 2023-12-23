import express from "express";
import {
	registerUser,
	authUser,
	logUserOut,
	updateUser,
	getUsers,
	getUserDetails,
} from "../controller/UserController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

/*
POST: registerUser Public;
POST: authUser Public
POST: logUserOut Private
PATCH: updateUser Private
GET: getUsers Private, admin;
GET: getUserDetails Private, admin;
*/

UserRouter.post("/registerUser", registerUser);
UserRouter.post("/authUser", authUser);
UserRouter.post("/logUserOut", protect, logUserOut);
UserRouter.patch("/updateUser", protect, updateUser);
UserRouter.get("/getUsers", protect, admin, getUsers);
UserRouter.get("/getUserDetails/:id", protect, admin, getUserDetails);

export default UserRouter;
