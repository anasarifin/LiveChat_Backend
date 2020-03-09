const router = require("express").Router();
const users = require("../controllers/users");
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

router.get("/users/:id", users.getUsers);
// router.post("/users", upload.single("image"), users.insertUsers);
router.patch("/users/:id", upload.single("image"), users.updateUsers);
router.delete("/users/:id", users.deleteUsers);

module.exports = router;
