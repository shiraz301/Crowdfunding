import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { navlinks } from '../constants';
import { logo, sun } from '../assets';

//Sidebar component of Web Crowdfunding 

const Icon = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name && 'bg-[#2c2f32]'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    <img src={imgUrl} alt={name} className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`} />
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const { disconnect } = useStateContext();

  const handleClick = (link) => {
    if (!link.disabled) {
      setIsActive(link.name);
      if (link.name === 'logout') {
        disconnect()
        navigate('/');
      } else {
        navigate(link.link);
      }
    }
  };

  return (
    <div className="flex justify-between items-center  flex-col sticky top-5 h-[93vh]">
      <Link to="/" className="w-[52px] h-[52px] mt-[3px] bg-[#2c2f32] rounded-[10px]">
        <img src={logo} alt="logo" className="w-12 h-12" />
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-[#1c1c24] rounded-[20px] w-[76px] py-4 mt-12'>
        <div className="flex flex-col justify-center items-center space-y-4">
          {navlinks.map((link) => (
            <Icon
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => handleClick(link)}
            />
          ))}
        </div>
        <img src={sun} alt="sun_icon" className="bg-[#1c1c24] shadow-secondary" />
      </div>
    </div>
  );
};

export default Sidebar;
