require("dotenv").config();

const db = require("./config/db");
const seedSuperAdmin = require("./seeders/superAdminSeeder");

db.connect((err) => {

    if (err) {
        console.log(err);
    } else {

        console.log("Database Connected");

        seedSuperAdmin();

        process.exit();
    }
});