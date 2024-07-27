import { Navigate, createBrowserRouter } from "react-router-dom";
import { Signup } from "../auth/views/Signup";
import { Users } from "../views/Users";
import { NotFound } from "../views/NotFound";
import { DefaultLayout } from "../properties/layout/DefaultLayout";
import { Home } from "../views/Home";
import { UserForm } from "../auth/components/UserForm";
import { Login } from "../auth/views/Login";
import { GuestLayout } from "../auth/layout/GuestLayout";
import { AuthCallback } from "../auth/views/AuthCallback";
import { Property } from "../properties/components/create/Property";
import { PropertyCreateStepOne } from "../properties/components/create/PropertyCreateStepOne";
import { PropertyCreateStepTwo } from "../properties/components/create/PropertyCreateStepTwo";
import { PropertyCreateStepThree } from "../properties/components/create/PropertyCreateStepThree";
import { PropertyCreateStepFour } from "../properties/components/create/PropertyCreateStepFour";

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
        path: '/property',
        element: <Property />,
        children: [
          {
            path: 'step-one/:propertyId?',
            element: <PropertyCreateStepOne/>
          },
          {
            path: 'step-two/:propertyId',
            element: <PropertyCreateStepTwo/>
          },
          {
            path: 'step-three/:propertyId',
            element: <PropertyCreateStepThree/>
          },
          {
            path: 'step-four/:propertyId',
            element: <PropertyCreateStepFour/>
          }
        ],
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