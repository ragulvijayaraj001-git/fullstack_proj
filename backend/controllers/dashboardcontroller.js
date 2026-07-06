const db = require("../config/db");

exports.getDashboardStats = (req, res) => {

  const statsSql = `
    SELECT
      (SELECT COUNT(*) FROM students) AS totalStudents,
      (SELECT COUNT(*) FROM attendance WHERE status='Present' AND date=CURDATE()) AS presentToday,
      (SELECT COUNT(*) FROM attendance WHERE status='Absent' AND date=CURDATE()) AS absentToday
  `;

  const deptSql = `
    SELECT
      department,
      COUNT(*) AS total
    FROM students
    GROUP BY department
  `;

  db.query(statsSql, (err, statsResult) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
      });
    }

    db.query(deptSql, (err2, deptResult) => {

      if (err2) {
        console.log(err2);

        return res.status(500).json({
          success: false,
        });
      }

      res.json({
        success: true,
        stats: statsResult[0],
        departments: deptResult,
      });

    });

  });

};