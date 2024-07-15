import React from 'react';

const Button = (props) =>{
    return (
        <button
        className=" shadow-xl border rounded-md text-sm w-full py-1 hover:bg-golden-sand-600 dark:hover:bg-gray-700 transition duration-300"
        {...props}
        />
    )

}

export default Button;