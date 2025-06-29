import {
  createBrowserRouter,
} from "react-router"
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Authtication/Login";
import Register from "../pages/Authtication/Register";
import Covarage from "../pages/Covarage/Covarage";
import PrivetRoute from "./PrivetRoute";
import SendPercel from "../pages/SendPercel/SendPercel";
import DashBoardLayout from "../layouts/DashBoardLayout";
import MyParcel from "../pages/DashBoard/MyParcel";
import Payment from "../pages/Payment/Payment";
import PaymentHistory from "../pages/DashBoard/PaymentHistory";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'covarage',
        Component: Covarage,
        loader: () => fetch('/public/warehouses.json')
      },
      {
        path: 'sendPercel',
        element: <PrivetRoute><SendPercel></SendPercel></PrivetRoute>,
        loader: () => fetch('/public/warehouses.json')
      }
    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'register',
        Component: Register
      }
    ]
  },
  {
    path: '/dashBoard',
    element: <PrivetRoute><DashBoardLayout></DashBoardLayout></PrivetRoute>,
    children: [
      {
        path: 'myParcel',
        Component: MyParcel


      },
      {
        path: 'payment/:parcelId',
        element: <Payment></Payment>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      }
    ]
  }
]);