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
import { PaymentStatus } from "../components/OfficeProductDashboard/JobsRecuritments/PaymentStatus";
import AllCompanyList from "../components/OfficeProductDashboard/Admin/AllCompanyList/AllCompanyList";
import SpecificCompanyList from "../components/OfficeProductDashboard/Admin/AllCompanyList/SpecificCompanyList";
import AllPayment from "../components/OfficeProductDashboard/Admin/AllPayment/AllPayment";
import { UserRecuritmentNavbar } from "../components/OfficeProductDashboard/User/UserRecuritmentNavbar";
import PostRecuritment from "../components/OfficeProductDashboard/User/RecuritmentFeatures/PostRecuritment";
import MyAllRecuritmentPost from "../components/OfficeProductDashboard/User/RecuritmentFeatures/MyAllRecuritmentPost";
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
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/forget_password",
        element: <Forgetpassword />,
      },
      {
        path: "/subscription_details/:subscriptionId",
        element: (
          <PrivateRoute>
            <Subscription />
          </PrivateRoute>
        ),
      },
      {
        path: "/companyvarification",
        element: (
          <PrivateRoute>
            <CompanyValidation />
          </PrivateRoute>
        ),
      },
      {
        path: "/uplode_cv",
        element: <UplodeCV />,
      },
      {
        path: "/payment",
        element: (
          <PrivateRoute>
            <PaymentStatus />
          </PrivateRoute>
        ),
      },
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
      // { path: "", element: "" },
      {
        path: "/all_services/post_jobs_recuritments",
        element: (
          <PrivateRoute>
            <JobsRecuritments />
          </PrivateRoute>
        ),
      },
      {
        path: "/all_services/all_apply_company",
        element: (
          <PrivateRoute>
            <AllCompanyList />
          </PrivateRoute>
        ),
      },
      {
        path: "/all_services/specific_company_list/:id",
        element: (
          <PrivateRoute>
            <SpecificCompanyList />
          </PrivateRoute>
        ),
      },
      {
        path: "/all_services/all_payment_list",
        element: (
          <PrivateRoute>
            <AllPayment />
          </PrivateRoute>
        ),
      },
      {
        path: "/all_services/user_recuritment_navbar",
        element: (
          <PrivateRoute>
            <UserRecuritmentNavbar />
          </PrivateRoute>
        ),
        children: [
          {
            path: "/all_services/user_recuritment_navbar",
            element: (
              <PrivateRoute>
                <PostRecuritment />
              </PrivateRoute>
            ),
          },
          {
            path: "/all_services/user_recuritment_navbar/all_recruitment",
            element: (
              <PrivateRoute>
                <MyAllRecuritmentPost />
              </PrivateRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
