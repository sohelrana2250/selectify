import { RiAccountBoxFill } from "react-icons/ri";
import { TiHomeOutline } from "react-icons/ti";


const RoutesController = () => {

    const UserRoleRoute = [
        {
          icon: <TiHomeOutline className="text-2xl" />,
          name: "Dashboard",
          path: "/",
        },
        {
          categorie: [
            {
              categorie_name: "Jobs Markets",
              categorie_routes: [
                {
                  icon: "",
                  name: "Interview Report",
                  path: "/interview_report",
                },
                {
                  icon: "",
                  name: "Your Profile",
                  path: "/jobprofile",
                },
                {
                  icon: "",
                  name: "Interview List",
                  path: "/interviwer_list",
                },
                {
                  icon:"",
                  name:"Apply Company",
                  path:"/all_services/post_jobs_recuritments"
                }
              ],
            },
            {
              categorie_name: "Applyed Jobs",
              categorie_routes: [
                {
                  icon: "",
                  name: "Apply Jobs",
                  path: "/apply_jobs",
                },
                {
                  icon: "",
                  name: "Question Bank",
                  path: "/question Bank",
                },
              ],
            },
          ],
        },
        {
          icon: <RiAccountBoxFill className="text-2xl" />,
          name: "Contact Details",
          path: "/account",
        },
      ];

      return {
        UserRoleRoute
      }
  
}

export default RoutesController