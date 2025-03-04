import React, { useState } from 'react';
import '../AuthStyle.css'; // Import the styles
import Login from './Login'; // Import Login component
import Register from './Register'; // Import Register component

const App = () => {
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

  const handleSwitchToRegister = () => {
    setIsLogin(false); // Switch to Register form
  };

  const handleSwitchToLogin = () => {
    setIsLogin(true); // Switch to Login form
  };

  return (
    <div className="app-container">
      {isLogin ? (
        <Login onSwitchToRegister={handleSwitchToRegister} /> // Show Login form
      ) : (
        <Register onSwitchToLogin={handleSwitchToLogin} /> // Show Register form
      )}
    </div>
  );
};

export default App;
