import React from 'react';

const Button = (props) =>{
    return (
        <button
        className=" shadow-xl border rounded-md text-sm w-full py-1 hover:bg-slate-300"
        {...props}
        />
    )

}

export default Button;