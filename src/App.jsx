import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import "./styles/App.css"; // Importa el archivo CSS específico para SignUp
function App() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="app">
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignUp onSwitch={() => setIsLogin(true)} />
      )}
    </div>
  );
}

export default App;