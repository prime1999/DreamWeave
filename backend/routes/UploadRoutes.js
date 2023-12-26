import path from "path";
import multer from "multer";
import express from "express";

const UploadRoute = express.Router();

// define the path to store the files
const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, "uploads/");
	},
	// define the naming convention for the file
	filename(req, file, cb) {
		cb(
			null,
			`${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
		);
	},
});

// filter the files based on there file and mime type
const fileFIilter = (req, file, cb) => {
	const filetypes = /jpe?g|png|webp/;
	const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

	// check if the file type is the required file type by the server
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = mimetypes.test(path.mimetype(file.mimetype));

	if (extname && mimetype) {
		cb(null, true);
	} else {
		cb(new Error("Images only"), false);
	}
};

// set multer to know where to store the files and also the condition on which the files are save
const upload = multer({ storage, fileFIilter });
// ulpaod the file but just one at a time
const uploadSingeImage = upload.single("image");

// create the uplaod route
UploadRoute.post("/", (req, res) => {
	uploadSingeImage(req, res, (err) => {
		if (err) {
			return res.status(400).send({ message: err.message });
		} else {
			res.json(201);
			res.send({
				message: "image sent",
				path: `/${req.file.path}`,
			});
		}
	});
});

export default UploadRoute;
