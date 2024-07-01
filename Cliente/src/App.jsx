import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';

const App = () => {
    return (
        <Routes>
            <Route path="/login" component={Login} />
        </Routes>
    );
};

export default App;