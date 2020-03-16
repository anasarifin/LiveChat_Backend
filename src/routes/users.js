const router = require("express").Router();
const users = require("../controllers/users");
const multer = require("multer");
const storage = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./public/img");
	},
	filename: function(req, file, callback) {
		callback(null, req.params.username + '_-_' + file.originalname);
	},
});
const upload = multer({
	storage: storage,
});

router.get("/users/:username", users.getUsers);
router.post("/users/batch", users.getUsersBatch);
// router.post("/users", upload.single("image"), users.insertUsers);
router.patch("/users/:username", upload.single("image"), users.updateUsers);
router.delete("/users/:id", users.deleteUsers);

module.exports = router;
