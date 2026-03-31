import React, { useState } from "react";
import API from "../Api";

export default function Login({ setUser }) {
  const [name, setName] = useState("");

  const handleLogin = async () => {
    const res = await API.post("/auth/login", {
      name,
      role: "user",
    });

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("userId", res.data.user._id);

    setUser(res.data.user);
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={(e) => setName(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}