const conn = require("../configs/database");

module.exports = {
	getUsers: username => {
		return new Promise(resolve => {
			conn.query(`SELECT * FROM users WHERE username = '${username}'`, (err, result) => {
				if (err) console.log(err);
				if (!result[0]) result = { msg: "User not found..." };
				resolve(result);
			});
		});
	},
	getUsersBatch: data => {
		return new Promise(resolve => {
			conn.query(`SELECT * FROM users WHERE username IN ${data}`, (err, result) => {
				if (err) console.log(err);
				if (!result) result = { msg: "User not found..." };
				resolve(result);
			});
		});
	},
	insertUsers: data => {
		return new Promise((resolve, reject) => {
			conn.query(`INSERT INTO users SET ?`, data, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	updateUsers: (username, data) => {
		return new Promise((resolve, reject) => {
			conn.query(`UPDATE users SET ? WHERE username = '${username}'`, data, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
	deleteUsers: id => {
		return new Promise((resolve, reject) => {
			conn.query(`DELETE FROM users WHERE id = ${id}`, (err, result) => {
				if (!err) {
					resolve(result);
				} else {
					reject(new Error(err));
				}
			});
		});
	},
};
