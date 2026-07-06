const db = require("../config/db");
const { Parser } = require("json2csv");

// Mark Attendance
exports.markAttendance = (req, res) => {
  const { student_id, status } = req.body;

  // Check if attendance is already marked today
  const checkSql = `
    SELECT *
    FROM attendance
    WHERE student_id = ?
    AND date = CURDATE()
  `;

  db.query(checkSql, [student_id], (err, result) => {
    if (err) {
      console.log("Check Attendance Error:", err);

      return res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    }

    // Attendance already exists
    if (result.length > 0) {
      return res.json({
        success: false,
        message: "Attendance already marked for today.",
      });
    }

    // Insert new attendance
    const insertSql = `
      INSERT INTO attendance (student_id, date, status)
      VALUES (?, CURDATE(), ?)
    `;

    db.query(insertSql, [student_id, status], (err2) => {
      if (err2) {
        console.log("Insert Attendance Error:", err2);

        return res.status(500).json({
          success: false,
          message: err2.sqlMessage,
        });
      }

      res.json({
        success: true,
        message: "Attendance Marked Successfully",
      });
    });
  });
};

// Get Attendance Summary Report
exports.getAttendance = (req, res) => {
  const sql = `
    SELECT
      s.id,
      s.name,
      s.rollNo,
      s.department,

      COUNT(a.id) AS totalDays,

      SUM(
        CASE
          WHEN a.status='Present' THEN 1
          ELSE 0
        END
      ) AS presentDays,

      SUM(
        CASE
          WHEN a.status='Absent' THEN 1
          ELSE 0
        END
      ) AS absentDays,

      ROUND(
        (
          SUM(
            CASE
              WHEN a.status='Present' THEN 1
              ELSE 0
            END
          ) * 100
        ) / COUNT(a.id),
        2
      ) AS attendancePercentage

    FROM students s

    LEFT JOIN attendance a
      ON s.id = a.student_id

    GROUP BY
      s.id,
      s.name,
      s.rollNo,
      s.department

    ORDER BY s.name ASC;
  `;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    }

    res.json({
      success: true,
      attendance: result,
    });
  });
};
// Export Attendance CSV
exports.exportAttendanceCSV = (req, res) => {
  const sql = `
SELECT
    s.id,
    s.name,
    s.rollNo,
    s.department,

    COUNT(a.id) AS totalDays,

    SUM(CASE
        WHEN a.status='Present'
        THEN 1
        ELSE 0
    END) AS presentDays,

    SUM(CASE
        WHEN a.status='Absent'
        THEN 1
        ELSE 0
    END) AS absentDays,

    ROUND(
        (
            SUM(CASE
                WHEN a.status='Present'
                THEN 1
                ELSE 0
            END)
            /
            COUNT(a.id)
        ) * 100,
        0
    ) AS attendancePercentage

FROM students s

LEFT JOIN attendance a
ON s.id = a.student_id

GROUP BY s.id

ORDER BY s.name;
`;
  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err.sqlMessage,
      });
    }
   
    const { Parser } = require("json2csv");

    const fields = [
      "name",
      "rollNo",
      "department",
      "date",
      "status",
    ];

    const parser = new Parser({ fields });

    const csv = parser.parse(result);

    res.header("Content-Type", "text/csv");
    res.attachment("Attendance_Report.csv");

    res.send(csv);

  });

};