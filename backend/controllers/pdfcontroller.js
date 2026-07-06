const PDFDocument = require("pdfkit");
const db = require("../config/db");

exports.exportAttendancePDF = (req, res) => {

  const sql = `
    SELECT
    s.id,
    s.name,
    s.rollNo,
    s.department,

    COUNT(a.id) AS totalDays,

    SUM(
      CASE
      WHEN a.status='Present'
      THEN 1
      ELSE 0
      END
    ) AS presentDays,

    SUM(
      CASE
      WHEN a.status='Absent'
      THEN 1
      ELSE 0
      END
    ) AS absentDays,

    ROUND(
      (
        SUM(
          CASE
          WHEN a.status='Present'
          THEN 1
          ELSE 0
          END
        )
        /
        COUNT(a.id)
      )*100,
      0
    ) AS attendancePercentage

FROM students s

LEFT JOIN attendance a
ON s.id=a.student_id

GROUP BY s.id

ORDER BY s.name;
  `;

  db.query(sql, (err, result) => {

    if (err) {
      return res.status(500).json({
        success: false,
        message: err.message,
      });
    }

    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
    });

    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=Attendance_Report.pdf"
    );

    doc.pipe(res);

    doc
      .fontSize(22)
      .text("SMART CAMPUS", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(16)
      .text("Attendance Report", {
        align: "center",
      });

    doc.moveDown();

    doc
      .fontSize(11)
      .text(
        "Generated On : " +
        new Date().toLocaleDateString()
      );

    doc.moveDown();

    result.forEach((student) => {

      doc.text(
        `Name : ${student.name}`
      );

      doc.text(
        `Roll No : ${student.rollNo}`
      );

      doc.text(
        `Department : ${student.department}`
      );

      doc.text(`Working Days : ${student.totalDays}`);

     doc.text(`Present : ${student.presentDays}`);

     doc.text(`Absent : ${student.absentDays}`);

    doc.text(
       `Attendance : ${student.attendancePercentage}%`
);
      doc.moveDown();

    });

    doc.end();

  });

};