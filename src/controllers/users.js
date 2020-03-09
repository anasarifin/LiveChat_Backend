const users = require("../models/users.js");

const imagePath = "http://localhost:9999/public/img/";

module.exports = {
	getUsers: (req, res) => {
		users.getUsers(req.params.id).then(result => {
			res.json(result);
		});
	},
	// insertUsers: (req, res) => {
	// 	const { username, name, email, phone, address, birth, gender, image, password } = req.body;
	// 	const data = {
	// 		username: username,
	// 		name: name,
	// 		email: email,
	// 		phone: phone,
	// 		address: address,
	// 		birth: birth,
	// 		gender: parseFloat(gender),
	// 		image: req.file ? imagePath + req.file.filename : image,
	// 		password: password,
	// 	};
	// 	users.insertUsers(data).then(result => {
	// 		res.json(result);
	// 	});
	// },
	updateUsers: (req, res) => {
		const id = req.params.id;
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
		if (image) {
			data.image = req.file ? imagePath + req.file.filename : image;
		}

		users.updateUsers(id, data).then(result => {
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
