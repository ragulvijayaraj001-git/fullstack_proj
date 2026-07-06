const db = require("../config/db");
const bcrypt = require("bcryptjs");

const seedSuperAdmin = async () => {

    const email =
    "superadmin@gmail.com";

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (
                !err &&
                result.length === 0
            ) {

                const password =
                await bcrypt.hash(
                    "Admin@123",
                    10
                );

                db.query(
                    `INSERT INTO users
                    (name,email,password,role)
                    VALUES (?,?,?,?)`,
                    [
                        "Super Admin",
                        email,
                        password,
                        "SUPER_ADMIN"
                    ]
                );

                console.log(
                    "Super Admin Seeded"
                );
            }
        }
    );
};

module.exports = seedSuperAdmin;