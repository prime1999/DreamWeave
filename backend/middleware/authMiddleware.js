import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/UserModel.js";

// ------------------------ function to check if the user is authenticated ----------------------------- //
const protect = asyncHandler(async (req, res, next) => {
	// init a token variable
	let token;
	// get the token from the cookies and store it in the token variable
	token = req.cookies.jwt;
	// check if the token is in the cookies
	if (token) {
		// make a try-catch block
		try {
			// if it is then:
			// verify the token usin gthe JWT_SECRET
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			// once the token is verified, get the user using the token
			req.user = await User.findById(decoded.userId).select("-password");
			// move on to the next middleware
			next();
		} catch (error) {
			// if any error occured in the try block, then:
			res.status(401);
			throw new Error("User not authorized");
		}
	} else {
		// if there is no token in the cookies in the request then:
		res.status(401);
		throw new Error("User not authorized, No token");
	}
});

// ---------------------------------- function to check if the user is an admin --------------------------- //
const admin = (req, res, next) => {
	// check if there is a user logged in and if the user is an admin

	if (req.user && req.user.isAdmin) {
		// if yes, then allow passage
		next();
	} else {
		// if no, then
		res.status(400);
		throw new Error("User not authorized");
	}
};

export { protect, admin };
