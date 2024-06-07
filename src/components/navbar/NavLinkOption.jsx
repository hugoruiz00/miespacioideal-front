import React from 'react'
import { NavLink } from 'react-router-dom';

export const NavLinkOption = ({children, to, className}) => {
  const defaultClasses = {
    active: 'inline-flex items-center px-1 pt-1 border-b-2 border-[#FF5C00] text-sm font-medium leading-5 text-gray-900 focus:outline-none focus:border-[#FF5C00] transition duration-150 ease-in-out',
    notActive: 'inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
  }

  const getClasses = (isActive) => {
    const baseClasses = isActive ? defaultClasses['active'] : defaultClasses['notActive'];
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <NavLink
      className={({isActive}) => getClasses(isActive) } 
      to={to}>
        {children}
    </NavLink>
  )
}
