import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useTheme } from './contexts/themeContext';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import CustomNavbar from "./components/Nav/Nav";
import EditProfile from "./components/User/InfoUser";

const App = () => {
  const { isDarkMode } = useTheme();
  const isAuthenticated = useSelector(state => state.isAuthenticated);
  console.log(isAuthenticated)
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
          {isAuthenticated && (
          <>
          <Route path="/perfil" element={<EditProfile/>}/>
          </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
