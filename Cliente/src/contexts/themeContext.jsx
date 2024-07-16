import React, { createContext, useContext, useState } from 'react';

const ThemesContext = createContext();

export const ThemesProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        try {
            const savedTheme = localStorage.getItem('isDarkMode');
            return savedTheme ? JSON.parse(savedTheme) : false;
        } catch (error) {
            console.error('Error parsing isDarkMode from localStorage', error);
            return false;
        }
    });

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            try {
                localStorage.setItem('isDarkMode', JSON.stringify(newMode));
            } catch (error) {
                console.error('Error setting isDarkMode in localStorage', error);
            }
            return newMode;
        });
    };

    return (
        <ThemesContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemesContext.Provider>
    );
};

export const useTheme = () => useContext(ThemesContext);
