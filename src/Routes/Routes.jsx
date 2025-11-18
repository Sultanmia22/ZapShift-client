import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Caverage/Coverage";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivetRoutes from "./PrivetRoutes";
import SendPercel from "../Pages/SendPercel/SendPercel";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts/>,
    children:[
      {index:true,element:<Home/>},

      {
        path: '/coverage',
        element: <Coverage/>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },

      {
        path: '/sendpercel',
        element: <PrivetRoutes>
          <SendPercel/>
        </PrivetRoutes>,
         loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },
    ]
  },

  {
    path:'/',
    element:<AuthLayouts/>,
    children:[
      {
        path:'/login',
        element:<Login/>
      },

      {
        path: '/register',
        element: <Register/>
      },
    ]
  }
]);
export default router;