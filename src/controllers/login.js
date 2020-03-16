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
		const data = {
			username: req.body.username,
			password: req.body.password,
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
