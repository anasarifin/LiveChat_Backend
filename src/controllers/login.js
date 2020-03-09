const login = require("../models/login");

const imagePath = "http://localhost:9999/public/img/";

module.exports = {
	login: (req, res) => {
		const username = req.body.username;
		const password = req.body.password;
		login
			.login(username, password)
			.then(resolve => {
				res.json({ token: resolve });
			})
			.catch(reject => {
				res.json({ warning: reject });
			});
	},
	register: (req, res) => {
		const { username, name, email, phone, address, birth, gender, image, password } = req.body;
		const data = {
			username: username,
			name: name,
			email: email,
			phone: phone,
			address: address,
			birth: birth,
			gender: parseFloat(gender),
			image: req.file ? req.file.filename : image,
			password: password,
		};

		login
			.register(data)
			.then(resolve => {
				res.json(resolve);
			})
			.catch(reject => {
				res.json({ warning: reject });
			});
	},
};
