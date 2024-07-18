import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useTheme } from './contexts/themeContext';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import CustomNavbar from "./components/Nav/Nav";
import EditProfile from "./components/User/InfoUser";
import PreAlerta from "./components/Pre-Alerta/PreAlerta";
import ProtectedRoute from "./components/UI/ProtectedRoute";

const App = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col">
      <CustomNavbar />
      <div className={`flex-grow p-4 ${isDarkMode ? 'dark:bg-gray-900 dark:text-white' : 'bg-golden-sand-600 text-black'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<ProtectedRoute element={<EditProfile />} />} />
          <Route path="/prealertas" element={<ProtectedRoute element={<PreAlerta />} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
