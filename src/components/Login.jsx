import React, { useState } from 'react';
import '../style/Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('kumara123');
  const [password, setPassword] = useState('kumara123');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication check (in real-world, you'll use an API for this)
    if (username === 'kumara123' && password === 'kumara123') {
      onLogin(true); // Trigger login success
    } else {
      alert('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    return <div>Welcome! Now you can search for recipes.</div>;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default Login;
