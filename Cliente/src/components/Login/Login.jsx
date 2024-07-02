import React, { useState } from "react";
import { useAuth } from '../../contexts/authContext';
import { Navigate } from "react-router-dom";

const Login = () => {
  const { login, token, error } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
    // No necesitas almacenar el resultado de login en una variable extra (const hola = await login(username, password);)
  };

  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            aria-required="true"
            aria-label="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-required="true"
            aria-label="Password"
          />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;