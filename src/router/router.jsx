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
import UplodeCV from "../components/OfficeProductDashboard/UplodeCV/UplodeCV";
import Subscription from "../components/pages/subscription/Subscription";
import CompanyValidation from "../components/pages/CompanyValidation/CompanyValidation";
import JobsRecuritments from "../components/OfficeProductDashboard/JobsRecuritments/JobsRecuritments";
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
      },
      {
        path:"/subscription_details/:subscriptionId",
        element:<PrivateRoute>
          <Subscription/>
        </PrivateRoute>

      },
      {
        path:"/companyvarification",
        element:<PrivateRoute>
          <CompanyValidation/>
        </PrivateRoute>

      },
      {
        path:"/uplode_cv",
        element:<UplodeCV/>
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
    children: [
      {path:"",element:""},
      {path:"/all_services/post_jobs_recuritments",element:<PrivateRoute>
        <JobsRecuritments/>
      </PrivateRoute>}
    ],
  },
]);

export default router;
