import React, { useEffect, useState } from "react";
import "./style.css";
import { Card } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState("");
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };

    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    //corpo do useEffect
    fetch("https://api.github.com/users/andreserafin")
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
      });
    console.log("UseEffect foi chamado");
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <a href="http://github.com/andreserafin">
            <img src={user.avatar} alt="Foto de Perfil" />
          </a>
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
      />
      <button type="button" onClick={handleAddStudent}>
        Adicionar
      </button>
      <div className="container-list">
        {students.map((student) => (
          <Card key={student.time} name={student.name} time={student.time} />
        ))}
      </div>
    </div>
  );
}
