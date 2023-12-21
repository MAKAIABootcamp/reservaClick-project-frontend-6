import React from 'react';
import { IoHome } from 'react-icons/io5';
import { FaCalendarAlt } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

import './navigation.scss';

const Navigation = () => {
  return (
    <main className='main_container_navigation'>
      <div className='main_container_navigation__mobile'>
        <IoHome className='main_container_navigation__mobile__icon' />
        <FaCalendarAlt className='main_container_navigation__mobile__icon' />
        <FaCircleUser className='main_container_navigation__mobile__icon' />
      </div>
      <div className='main_container_navigation__desktop'>
        <nav>
          <Link className='main_container_navigation__desktop__link'>Home</Link>
          <Link className='main_container_navigation__desktop__link'>
            Mis reservas
          </Link>
          <Link className='main_container_navigation__desktop__link'>
            Mi perfil
          </Link>
        </nav>
      </div>
    </main>
  );
};

export default Navigation;
