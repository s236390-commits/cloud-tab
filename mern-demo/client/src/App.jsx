import { useEffect, useState } from "react";
const API = "http://localhost:5000";

function App() {
  const [students, setStudents] = useState([]);

  const [mssv, setMssv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Lấy danh sách sinh viên
  useEffect(() => {
    fetch(`${API}/api/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);

  // Thêm sinh viên
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/api/students`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mssv,
          name,
          email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Thêm sinh viên thành công");

        setMssv("");
        setName("");
        setEmail("");

        setStudents([...students, data]);
      } else {
        alert("Có lỗi khi thêm sinh viên");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend");
    }
  };

  // Sửa sinh viên
  const handleUpdate = async (student) => {
    const newName = prompt("Nhập họ tên mới:", student.name);
    const newEmail = prompt("Nhập email mới:", student.email);

    if (newName === null || newEmail === null) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/students/${student._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mssv: student.mssv,
          name: newName,
          email: newEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Cập nhật sinh viên thành công");

        setStudents(
          students.map((item) =>
            item._id === student._id ? data : item
          )
        );
      } else {
        alert("Có lỗi khi cập nhật sinh viên");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend");
    }
  };

  // Xóa sinh viên
  const handleDelete = async (student) => {
    const confirmDelete = window.confirm(
      `Bạn có chắc muốn xóa sinh viên ${student.name}?`
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(`${API}/api/students/${student._id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (response.ok) {
        alert("Xóa sinh viên thành công");

        setStudents(
          students.filter((item) => item._id !== student._id)
        );
      } else {
        alert("Có lỗi khi xóa sinh viên");
        console.log(data);
      }
    } catch (error) {
      console.error(error);
      alert("Không thể kết nối Backend");
    }
  };

  return (
    <div>
      <h1>Danh sách sinh viên</h1>

      <h2>Thêm sinh viên</h2>

      <input
        type="text"
        placeholder="MSSV"
        value={mssv}
        onChange={(e) => setMssv(e.target.value)}
      />

      <input
        type="text"
        placeholder="Họ tên"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Thêm sinh viên</button>

      <h2>Danh sách</h2>

      {students.length === 0 ? (
        <p>Chưa có sinh viên</p>
      ) : (
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              {student.name} - {student.email}

              <button onClick={() => handleUpdate(student)}>
                Sửa
              </button>

              <button onClick={() => handleDelete(student)}>
                Xóa
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;