const users = require("../models/users.js");

const imagePath = "http://localhost:9999/public/img/";

module.exports = {
	getUsers: (req, res) => {
		users.getUsers(req.params.username).then(result => {
			res.json(result);
		});
	},
	getUsersBatch: (req, res) => {
		// const parse = JSON.parse(req.body.data);
		// const data = parse.slice(1, parse.length - 1);
		users.getUsersBatch(req.body.data).then(result => {
			res.json(result);
		});
	},
	updateUsers: (req, res) => {
		const { name, email, phone, address, birth, gender, image } = req.body;
		const data = {};
		if (name) {
			data.name = name;
		}
		if (email) {
			data.email = email;
		}
		if (phone) {
			data.phone = phone;
		}
		if (address) {
			data.address = address;
		}
		if (birth) {
			data.birth = birth;
		}
		if (gender) {
			data.gender = parseFloat(gender);
		}
		if (req.file) {
			data.image = req.file.filename;
		}

		users.updateUsers(req.params.username, data).then(result => {
			res.json(result);
		});
	},
	deleteUsers: (req, res) => {
		const id = req.params.id;
		users.deleteUsers(id).then(result => {
			res.json(result);
		});
	},
};
