const BASE_URL = "http://localhost:5005/api";

// Add Student
export const addStudent = async (data: any) => {
  const res = await fetch(`${BASE_URL}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

// Get All Students
export const getStudents = async () => {
  const res = await fetch(`${BASE_URL}/students`);

  return res.json();
};