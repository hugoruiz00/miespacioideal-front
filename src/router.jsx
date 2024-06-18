import { Navigate, createBrowserRouter } from "react-router-dom";
import { Signup } from "./auth/views/Signup";
import { Users } from "./views/Users";
import { NotFound } from "./views/NotFound";
import { DefaultLayout } from "./properties/layout/DefaultLayout";
import { Home } from "./views/Home";
import { UserForm } from "./auth/components/UserForm";
import { Login } from "./auth/views/Login";
import { GuestLayout } from "./auth/layout/GuestLayout";
import { AuthCallback } from "./auth/views/AuthCallback";
import { PropertyCreate } from "./properties/components/create/PropertyCreate";

const router = createBrowserRouter([
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      // {
      //   path: '/',
      //   element: <Navigate to={'/users'}/>
      // },
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/property/create',
        element: <PropertyCreate />
      },
      {
        path: '/users',
        element: <Users />
      },
      {
        path: '/users/new',
        element: <UserForm key={'userCreate'}/>
      }, 
      {
        path: '/users/:id',
        element: <UserForm key={'userUpdate'}/>
      },      
    ]
  },
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/auth/callback',
        element: <AuthCallback />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;