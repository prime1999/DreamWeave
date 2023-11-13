// -------------------------------function to handle 404s --------------------------------------- //
const notFound = (req, res, next) => {
	const error = new Error(`Not Found - ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// -------------------------------function to handle errors --------------------------------------- //
const errorHandler = (err, req, res, next) => {
	// if the error status code is 200, then send 500 instead  else send the staus code given
	let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	let message = err.message;

	// check for mongoose bad objectId
	if (err.name === "CastError" && err.kind === "ObjectId") {
		message = "Resource not Found";
		statusCode = 404;
	}

	// send the error message back with the status code to the frontend
	res.status(statusCode).json({
		message,
		// if the project is in production then the stack won't show in the error
		stack: process.env.NODE_ENV === "production" ? "" : err.stack,
	});
};

export { notFound, errorHandler };
