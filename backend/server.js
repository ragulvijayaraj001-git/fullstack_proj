require("dotenv").config();

const app = require("./app");

const db =
require("./config/db");

const seedSuperAdmin =
require("./seeders/superAdminSeeder");

db.connect((err) => {

    if (err) {

        console.log(err);

    } else {

        console.log(
            "Database Connected"
        );

        seedSuperAdmin();

    }
});

app.listen( //telling it to run in the port mentioned in .env file
    process.env.PORT,
    () => {

        console.log(
            `Server Running On Port ${process.env.PORT}`
        );

    }
);