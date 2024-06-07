import React from 'react'
import { Link } from 'react-router-dom'

export const DropdownLink = ({text, onClick}) => {
  return (
    <Link
      onClick={onClick}
      className='block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out'>
      {text}
    </Link>
  )
}
