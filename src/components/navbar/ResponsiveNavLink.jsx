import React from 'react'
import { NavLink } from 'react-router-dom';

export const ResponsiveNavLink = ({children, to, className, ...props}) => {
  const defaultClasses = {
    active: 'block w-full pl-3 pr-4 py-2 border-l-4 border-[#FF5C00] text-left text-base font-medium text-black bg-[#FF5C0010] focus:outline-none focus:text-black focus:bg-[#FF5C0020] focus:border-[#FF5C00] transition duration-150 ease-in-out',
    notActive: 'block w-full pl-3 pr-4 py-2 border-l-4 border-transparent text-left text-base font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300 transition duration-150 ease-in-out'
  }

  const getClasses = (isActive) => {
    const baseClasses = isActive ? defaultClasses['active'] : defaultClasses['notActive'];
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <NavLink
      {...props}
      className={({isActive}) => getClasses(isActive) } 
      to={to}>
        {children}
    </NavLink>
  )
}
