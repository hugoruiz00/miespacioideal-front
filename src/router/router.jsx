import { Navigate, createBrowserRouter } from "react-router-dom";
import { NotFound } from "../views/NotFound";
import { DefaultLayout } from "../layouts/DefaultLayout";
import { Home } from "../views/Home";
import { Login } from "../auth/views/Login";
import { AuthCallback } from "../auth/views/AuthCallback";
import { Property } from "../properties/views/create/Property";
import { PropertyCreateStepOne } from "../properties/views/create/PropertyCreateStepOne";
import { PropertyCreateStepTwo } from "../properties/views/create/PropertyCreateStepTwo";
import { PropertyCreateStepThree } from "../properties/views/create/PropertyCreateStepThree";
import { PropertyCreateStepFour } from "../properties/views/create/PropertyCreateStepFour";
import { GuestLayout } from "../layouts/GuestLayout";
import { GeneralLayout } from "../layouts/GeneralLayout";
import { PropertyShow } from "../properties/views/show/PropertyShow";

const router = createBrowserRouter([
  {
    path: '/',
    element: <GeneralLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/property/show/:propertyId',
        element: <PropertyShow />
      },
    ]
  },
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      // {
      //   path: '/',
      //   element: <Navigate to={'/users'}/>
      // },
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
      // {
      //   path: '/signup',
      //   element: <Signup />
      // },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export default router;