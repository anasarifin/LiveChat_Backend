const conn = require("../configs/database");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

function checkUsername(username) {
	return new Promise(resolve => {
		conn.query(`SELECT username FROM users WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0]);
		});
	});
}
function checkPassword(username, password) {
	return new Promise(resolve => {
		conn.query(`SELECT password FROM users WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			bcrypt.compare(password, data[0].password, (err, result) => {
				if (result) {
					resolve(true);
				} else {
					resolve(false);
				}
			});
		});
	});
}
function checkAdmin(username) {
	return new Promise(resolve => {
		conn.query(`SELECT superuser, password FROM users WHERE username = '${username}'`, (err, data) => {
			if (err) throw err;
			resolve(data[0].superuser);
		});
	});
}
function hash(password) {
	return new Promise(resolve => {
		bcrypt.hash(password, 10, function(err, hash) {
			if (err) throw err;
			resolve(hash);
		});
	});
}

module.exports = {
	login: async (username, password) => {
		// check if username exist or not
		if (await checkUsername(username)) {
			// check if password is match with username
			if (await checkPassword(username, password)) {
				return new Promise(resolve => {
					resolve(jwt.sign({ username: username }, process.env.SECRET_KEY, { expiresIn: 240 * 60 }));
				});
			}
		}
		return new Promise((resolve, reject) => {
			reject("Username or password incorrect!");
		});
	},
	register: data => {
		return new Promise(async (resolve, reject) => {
			const regex = /[a-z0-9]/gi;
			if (data.username.length >= 4 && data.username.length <= 12 && regex.test(data.username)) {
				if (data.password.length >= 6 && regex.test(data.password)) {
					if ((await checkUsername(data.username)) == undefined) {
						const passwordHash = await hash(data.password);
						data.password = passwordHash;
						conn.query(`INSERT INTO users SET ?`, data, (err, result) => {
							if (err) throw err;
							resolve(result);
						});
					} else {
						reject("Username has already been taken!");
					}
				} else {
					reject("Password must have min 6 character and not included special char!");
				}
			} else {
				reject("Username must contain 4 - 12 character and not included special char!");
			}
		});
	},
};
