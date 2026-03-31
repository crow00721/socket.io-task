import React, { useState } from "react";
import Login from "./pages/Login";
import Chat from "./pages/Chat";
import Payments from "./pages/Payments";

function App() {
  const [user, setUser] = useState(null);

  if (!user) return <Login setUser={setUser} />;

  return (
    <div>
      <h1>Dashboard</h1>
      <Chat />
      <Payments />
    </div>
  );
}

export default App;