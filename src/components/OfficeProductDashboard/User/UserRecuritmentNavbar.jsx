import React, { useState } from "react";
import { Menu, X, FileText, Users, UserCheck, Calendar } from "lucide-react";
import { Link, Outlet } from "react-router-dom";


export const UserRecuritmentNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = [
    {
      title: "Post Recruitment",
      icon: <FileText className="h-5 w-5" />,
      route: "/all_services/user_recuritment_navbar",
    },
    {
      title: "All Recruitment",
      icon: <Users className="h-5 w-5" />,
      route: "/all_services/user_recuritment_navbar/all_recruitment",
    },
    {
      title: "All Candidate",
      icon: <UserCheck className="h-5 w-5" />,
      route: "/all_services/user_recuritment_navbar/all_candidate",
    },
    {
      title: "Interview List",
      icon: <Calendar className="h-5 w-5" />,
      route: "/all_services/user_recuritment_navbar/interview_list",
    },
  ];
  return (
    <>
      <nav className="bg-gradient-to-br from-white/30 to-green-400 shadow-lg animate-pulse">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between ">
            <div className="flex items-center">
              <span className="text-xl font-semibold">Recruitment Portal</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  to={item.route}
                  key={item.title}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:bg-gray-100 p-2 rounded-md"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.title}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100 w-full"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>
      <Outlet/>
     
    </>
  );
};
