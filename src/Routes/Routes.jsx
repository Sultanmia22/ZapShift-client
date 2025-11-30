import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import Home from "../Pages/Home/Home";
import Coverage from "../Pages/Caverage/Coverage";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import PrivetRoutes from "./PrivetRoutes";
import SendPercel from "../Pages/SendPercel/SendPercel";
import Dashboard from "../Layouts/Dashboard";
import MyPercel from "../Pages/Dashboard/MyPercel";
import Payment from "../Pages/Dashboard/Payment";
import SuccessPayment from "../Pages/Dashboard/SuccessPayment";
import CancelPayment from "../Pages/Dashboard/CancelPayment";
import HistoryPayment from "../Pages/Dashboard/PaymentHistory/HistoryPayment";
import Rider from "../Pages/Rider/Rider";
import ApproveRiders from "../Pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../Pages/UserManagement/UsersManagement";
import AdminRoutes from "./AdminRoutes";
import AssignRiders from "../Pages/Dashboard/AssignRiders/AssignRiders";
import RiderRoutes from "./RiderRoutes";
import AssignDelivary from "../Pages/Dashboard/AssignDelivary/AssignDelivary";
import CompletedDelivary from "../Pages/Dashboard/CompletedDelivary/CompletedDelivary";
import PercelTrack from "../Pages/PercelTrack/PercelTrack";
import DashboardHome from "../Pages/Dashboard/DashboradHome/DashboardHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayouts />,
    children: [
      { index: true, element: <Home /> },

      {
        path: '/coverage',
        element: <Coverage />,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },

      {
        path: '/sendpercel',
        element: <PrivetRoutes>
          <SendPercel />
        </PrivetRoutes>,
        loader: () => fetch('/serviceCenter.json').then(res => res.json())
      },

      {
        path: '/rider',
        element: <PrivetRoutes>
          <Rider />
        </PrivetRoutes>
      },

      {
        path: '/percel-track/:trackingId',
        element: <PercelTrack/>
      }
    ]
  },

  {
    path: '/',
    element: <AuthLayouts />,
    children: [
      {
        path: 'login',
        element: <Login />
      },

      {
        path: 'register',
        element: <Register />
      },
    ]
  },

  {
    path: 'dashboard',
    element: <PrivetRoutes>
      <Dashboard />
    </PrivetRoutes>,
    children: [

      {
        index: true,
        element: <DashboardHome/>
      },

      {
        path: 'mypercels',
        element: <MyPercel />
      },
      {
        path: 'payment/:percelID',
        element: <Payment />
      },

      {
        path: 'success-payment',
        element: <SuccessPayment />
      },

      {
        path: 'payment-cancel',
        element: <CancelPayment />
      },

      {
        path: 'payment-history',
        element: <HistoryPayment />
      },

      {
        path: 'approveRider',
        element: <AdminRoutes>
          <ApproveRiders />
        </AdminRoutes>
      },

      {
        path: 'users-management',
        element: <AdminRoutes>
          <UsersManagement />
        </AdminRoutes>
      },

      {
        path: 'assign-riders',
        element: <AdminRoutes>
          <AssignRiders />
        </AdminRoutes>
      },

      {
        path: 'assign-delivary',
        element: <RiderRoutes>
          <AssignDelivary />
        </RiderRoutes>
      },

      {
        path: 'completed-delivery',
        element: <RiderRoutes>
          <CompletedDelivary/>
        </RiderRoutes>
      }

    ]
  }
]);
export default router;