const router = require("express").Router();
const login = require("../controllers/login");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function(req, file, callback) {
		callback(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
	},
});
const upload = multer({
	storage: storage,
});

router.post("/login", login.login);
router.post("/register", upload.single("image"), login.register);

module.exports = router;
