import React from 'react';

const Input = (props) => {
    return (
        <input 
        className="bg-gray-50/50 border border-gray-300 text-black text-sm rounded-lg placeholder-black focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500"
        {...props} />
    );
}

export default Input;
