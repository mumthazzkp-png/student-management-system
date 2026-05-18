import React, { useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !course) {
      alert("Please fill all fields");
      return;
    }

    if (editId) {
      const updatedStudents = students.map((student) =>
        student.id === editId
          ? { ...student, name, course }
          : student
      );

      setStudents(updatedStudents);
      setEditId(null);
    } else {
      const newStudent = {
        id: Date.now(),
        name,
        course,
      };

      setStudents([...students, newStudent]);
    }

    setName("");
    setCourse("");
  };

  const handleDelete = (id) => {
    setStudents(
      students.filter((student) => student.id !== id)
    );
  };

  const handleEdit = (student) => {
    setName(student.name);
    setCourse(student.course);
    setEditId(student.id);
  };

  return (
    <div className="container">
      <h1>Student Management System</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Student Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Course"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="3">No Students Added</td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.course}</td>

                <td>
                  <button onClick={() => handleEdit(student)}>
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;