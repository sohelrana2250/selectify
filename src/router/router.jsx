import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import OfficeSection from "../components/pages/OfficeSection/OfficeSection";
import Dashboard from "../components/OfficeProductDashboard/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Contact from "../components/pages/Contact/Contact";
import Interview from "../components/pages/Interview/Interview";
import Chnagepassword from "../components/pages/ChangePassword/Chnagepassword";
import DeleteAccount from "../components/pages/DeleteAccount/DeleteAccount";
import Profile from "../components/pages/Profile/Profile";
import Forgetpassword from "../components/pages/Forget/Forgetpassword";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      { path: "/register", element: <Register /> },
      { path: "/office_section", element: <OfficeSection /> },
      { path: "/contact", element: <Contact /> },
      { path: "/interview", element: <Interview /> },
      {
        path: "/chnage_password",
        element: (
          <PrivateRoute>
            ,
            <Chnagepassword />
          </PrivateRoute>
        ),
      },
      {
        path: "/delete_account",
        element: (
          <PrivateRoute>
            <DeleteAccount />
          </PrivateRoute>
        ),
      },
      {
        path:"/profile",
        element:<PrivateRoute>
            <Profile/>
        </PrivateRoute>
      },
      {
        path:"/forget_password",
        element:<Forgetpassword/>
      }
    ],
  },

  {
    path: "/all_services",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [],
  },
]);

export default router;
