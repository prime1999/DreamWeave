import jwt from "jsonwebtoken";

// function to generate a token for the user
const generateToken = async (res, userId) => {
	// generate the token
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "30d",
	});
	// save JWT as a http only cookie (save te token in the cookie)
	res.cookie("jwt", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		sameSite: "strict",
		maxAge: 30 * 24 * 60 * 60 * 1000,
	});
};

export default generateToken;
