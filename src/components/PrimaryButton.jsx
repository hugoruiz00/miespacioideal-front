import React from 'react'

export const PrimaryButton = ({children, type, title, className}) => {
  const getClasses = () => {
    const baseClasses = 'inline-flex items-center px-2 py-2 bg-[#FF5C00] border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-[#CF4D04] focus:bg-[#CF4D04] active:bg-[#CF4D04] focus:outline-none transition ease-in-out duration-150';
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <button
      type={type}
      className={getClasses()}
      title={title}
    >
      { children }
    </button>
  )
}
