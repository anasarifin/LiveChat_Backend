const conn = require("../configs/database");

module.exports = {
	getUsers: id => {
		// const page = query.page ? "LIMIT " + (query.page * 8 - 8) + ", 8" : "";
		// const dir = query.dir ? "DESC" : "ASC";
		// const sort = query.sort || "name";
		// const name = query.name ? "WHERE name LIKE '%" + query.name + "%'" : "";
		// const id = query.id ? "WHERE id = '" + query.id + "'" : "";
		// const helper = query.name ? "AND " : "WHERE ";
		// const type = query.type ? helper + "category_id = '" + query.type + "'" : "";

		return new Promise(resolve => {
			conn.query(`SELECT * FROM users WHERE id = '${id}'`, (err, result) => {
				if (err) console.log(err);
				if (!result[0]) result = { msg: "User not found..." };
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
	updateUsers: (id, data) => {
		return new Promise((resolve, reject) => {
			conn.query(`UPDATE users SET ? WHERE id = ${id}`, data, (err, result) => {
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
