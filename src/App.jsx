//Configura la navegación entre la página
import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";


import "./styles/App.css";
import "./styles/Login.css";
import "./styles/SignUp.css";

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