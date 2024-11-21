import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/pages/login/Login";
import Register from "../components/pages/register/Register";
import OfficeSection from "../components/pages/OfficeSection/OfficeSection";
import Dashboard from "../components/OfficeProductDashboard/Dashboard/Dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:"/",element:<Home/>,

      },
      // {
      //   path:"/login",element:<Login/>
      // },
      // {path:"/register",element:<Register/>},
      // {path:"/office_section",element:<OfficeSection/>}
    ]
    
  },

  {
    path:"/fast_office_product",
    element:<Dashboard/>,
    children:[

    ]
    
  }
]);

export default router;
