import React, { useState } from 'react'
import { NavLinkOption } from './NavLinkOption';
import Logo from '../../assets/svg/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from './Dropdown';
import { NavLink, useLocation } from 'react-router-dom';
import { ResponsiveNavLink } from './ResponsiveNavLink';
import { startLogout } from '../../store/auth/thunks';

export const Navbar = () => {

  const {user} = useSelector(state => state.auth);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();

  const onLogout = (e) => {
    e.preventDefault();
    dispatch(startLogout());
  }

  return (
    <nav className="bg-[#F3F3F3] shadow-md shadow-[#D4D4D4]">
        {/* Primary Navigation Menu */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                {/* Logo */}
                <div className="shrink-0 flex items-center">
                  <NavLink to={'/'}>
                    <div className="flex justify-center items-center">
                      <img src={Logo} className="block h-10 w-auto fill-current text-gray-800" alt="logo"/>
                      <p className='text-[#FF5C00] mx-2 font-bold text-xl'>Mi espacio ideal</p>
                    </div>
                  </NavLink>
                </div>
              </div>

              {/* Settings Dropdown */}
              { (location.pathname != '/login' && location.pathname != '/auth/callback') &&
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <NavLinkOption
                    className={'mr-3'}
                    to={'property/step-one'}>
                    Publica tu anuncio
                  </NavLinkOption> {/**Crear propiedad */}
                  {user && <Dropdown />}
                  {!user && <NavLinkOption to={'/login'}>Ingresar</NavLinkOption> }{/**Crear propiedad */}
                </div>
              }

              {/* <!-- Hamburger --> */}
              { (location.pathname != '/login' && location.pathname != '/auth/callback') &&
                <div className="-mr-2 flex items-center sm:hidden">
                  <button onClick={() => setOpen(!open)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path className={`${open ? 'hidden':'inline-flex'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                      <path className={`${open ? 'inline-flex' : 'hidden'}`} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              }
            </div>
        </div>

        {/* <!-- Responsive Navigation Menu --> */}
        <div className={open ? 'block sm:hidden' : 'hidden sm:hidden'}>
          {/* <div className="pt-2 pb-3 space-y-1">
            <x-responsive-nav-link :href="route('dashboard')" :active="request()->routeIs('dashboard')">
              {{ __('Dashboard') }}
            </x-responsive-nav-link>
          </div> */}

          {/* <!-- Responsive Settings Options --> */}
          <div className="pt-4 pb-1 border-t border-gray-200">
            {/* <div className="px-4">
              <div className="font-medium text-base text-gray-800">{ user?.name }</div>
              <div className="font-medium text-sm text-gray-500">{ user?.email }</div>
            </div> */}

            <div className="mt-3 space-y-1">
              {/* <!-- Authentication --> */}
              <ResponsiveNavLink
                to={'property/step-one'}>
                Publica tu anuncio
              </ResponsiveNavLink>
              { !user &&
                <ResponsiveNavLink
                to={'login'}
                >
                Ingresar
              </ResponsiveNavLink>}
              { user &&
                <ResponsiveNavLink onClick={onLogout} to={'logout'}>
                Cerrar sesión
              </ResponsiveNavLink>}
            </div>
          </div>
        </div>

    </nav>

  )
}
