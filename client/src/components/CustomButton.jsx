import React from 'react';

//Custom Button Component for Button Click Events

const CustomButton = ({ btnType, title, handleClick, styles }) => {
  return (
    <button
      type={btnType}
      className={`mt-[20px] bg-[#1dc071] hover:bg-green-400 text-white font-bold py-2 px-4 rounded mr-4 transition duration-300 ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  )
}


export default CustomButton