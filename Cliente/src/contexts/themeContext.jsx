import React, { createContext, useContext, useState } from 'react';

const ThemesContext = createContext();

export const ThemesProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
        console.log(isDarkMode)
    };

    return (
        <ThemesContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemesContext.Provider>
    );
};

export const useTheme = () => useContext(ThemesContext);
