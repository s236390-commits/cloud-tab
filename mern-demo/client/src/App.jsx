import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [mssv, setMssv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error(error));
  }, []);
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("/api/students", {
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

    console.log(data);

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
              {student.name} - {student.age} - {student.class}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;