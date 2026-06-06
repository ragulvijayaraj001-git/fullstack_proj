const db = require("../config/db");

const createUser = (userData, callback) => { //userdata and get inserted in database, callback is used to handle the response from database

    const sql =
    `INSERT INTO users
    (name,email,password,role)
    VALUES (?,?,?,?)`;

    db.query(
        sql,
        [
            userData.name,
            userData.email,
            userData.password,
            userData.role 
        ],
        callback
    );
};

module.exports = {
    createUser 
};