const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		if (req.body?.author) {
			cb(null, path.join(__dirname, "../uploads/authorImages"));
		} else if (req.body?.tweet) {
			cb(null, path.join(__dirname, "../uploads/tweets"));
		} else {
			cb(null, path.join(__dirname, "../uploads/coursesImages"));
		}
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`);
	},
});

const filefilter = (req, file, cb) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/jpg"
	) {
		cb(null, true);
	} else cb(null, false);
};

const upload = multer({
	storage: storage,
	fileFilter: filefilter,
});

module.exports = upload;
