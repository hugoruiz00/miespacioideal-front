import React, { useState } from 'react'
import { DropdownLink } from './DropdownLink';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

export const Dropdown = () => {

  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);

  const onLogout = (e) => {
    e.preventDefault();
console.log("testWW");
    dispatch(startLogout());
  }

  return (
    // @click.outside="open = false" @close.stop="open = false"
    <div className="relative">
        <div onClick={() => setOpen(!open) }>
          <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
              <div>{user.name}</div>

              <div className="ml-1">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
              </div>
          </button>
        </div>        

        {open && 
          <div
            className="absolute z-50 mt-2 w-48 rounded-md shadow-lg origin-top-right right-0"
            onClick={() => setOpen(false) }>
            <div className="rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white">          
              <DropdownLink text={'Perfil'}/>{/**Ir a editar perfil */}
              <DropdownLink text={'Cerrar sesión'} onClick={onLogout}/>
              </div>
          </div>
        }
    </div>

  )
}
