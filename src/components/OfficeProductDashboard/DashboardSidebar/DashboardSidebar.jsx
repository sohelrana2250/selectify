// DashboardSidebar
import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { TiHomeOutline } from "react-icons/ti";
import { RiAccountBoxFill} from "react-icons/ri";

import { IoCreateOutline } from "react-icons/io5";
import { MdOutlinePostAdd, MdFormatListNumbered, MdAutoDelete, MdOutlinePassword } from "react-icons/md";

import { BiLogOutCircle } from "react-icons/bi";
import { RiLogoutCircleRLine } from "react-icons/ri";


import { CgProfile } from "react-icons/cg";


const DashboardSidebar = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const detailsRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open");
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* Main Navigation Bar */}
      <div className="navbar bg-[#e4dfdf31] backdrop-blur-md shadow-lg">
        <div className="navbar-start flex items-center">
          <FaBars 
            className="text-xl cursor-pointer " 
            onClick={toggleSidebar}
          />
          
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden p-1 ml-2">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7n0zOg9jtsSGeRzYKN4J3HC8sr1z4vy1sIw&s"
                alt="Fast Office Logo"
                className="object-contain"
              />
            </div>
          </div>
          
          <Link to="/" className="btn btn-ghost text-xl font-bold">
            Fast Office
          </Link>

        </div>

        <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <details >
                  <summary>About Us</summary>
                  <ul className="w-48 rounded-sm">
                    <li>
                      <Link to="/company" >
                        Company
                      </Link>
                    </li>
                    <li>
                      <Link to="/work" >
                        How We Work
                      </Link>
                    </li>
                    <li>
                      <Link to="/team" >
                        The Team
                      </Link>
                    </li>
                    <li>
                      <Link to="/office_section" >
                      Office Section
                      </Link>
                    </li>
                    <li>
                      <Link to="/licence" >
                      Running Company 
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms_and_condition" >
                        Terms And Conditions
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link to="/fast_office_product" onClick={() => scrollToSection("our-work")}>Office Section</Link>
              </li>
              <li>
                <Link onClick={() => scrollToSection("services")}>
                  Services{" "}
                </Link>
              </li>

              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>


        

        <div className="navbar-end flex items-center gap-2">
        <h1 className="text-xl mr-2">
                  Sohel Rana
                </h1>
        <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                           "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                        }
                        alt="profile"
                      />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link to="/profile" className="justify-between">
                        <div className="flex m-1">
                          <CgProfile className="text-xl mr-2" />
                          <span>Profile</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link to="/chnage_password">
                        <div className="flex m-1">
                          <MdOutlinePassword className="text-xl mr-2" />
                          <span>Change Password</span>
                        </div>
                      </Link>
                    </li>
                    {/* /new_products/reset_password */}
                    <li>
                      <Link to="/delete_account">
                        <div className="flex m-1">
                          <MdAutoDelete className="text-xl mr-2" />
                          <span>Delete Account</span>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <button
                        
                        className="btn btn-error btn-outline btn-sm rounded"
                      >
                        <RiLogoutCircleRLine className="text-xl text-gray-700" />
                      </button>
                    </li>
                  </ul>
                </div>
          
          {/* {isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    className="h-10 w-10 rounded-full"
                    src="https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                    alt="profile"
                  />
                </div>
              </label>
              <ul className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <Link to="/profile" className="justify-between">
                    <div className="flex m-1">
                      <CgProfile className="text-xl mr-2" />
                      <span>Profile</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/chnage_password">
                    <div className="flex m-1">
                      <MdOutlinePassword className="text-xl mr-2" />
                      <span>Change Password</span>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link to="/delete_account">
                    <div className="flex m-1">
                      <MdAutoDelete className="text-xl mr-2" />
                      <span>Delete Account</span>
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost">
              LogIn
            </Link>
          )} */}
        </div>
      </div>

      {/* Sidebar */}
      <section
        className={`fixed top-0 left-0 px-3 h-full bg-[#e4dfdf31] transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "250px", marginTop: "65px" }}
      >
        <div className="py-5 flex justify-between items-center">
          <h1 className="text-xl font-bold">
          
            Our Services
          </h1>
          <FaTimes 
            className="text-xl cursor-pointer" 
            onClick={toggleSidebar}
          />
        </div>
        
        <hr />
        <h2 className="text-xl font-bold mt-2 text-gray-500">USER DASHBOARD</h2>
        <hr className="border-gray-700 border-solid" />

        <Link to="/" className="flex gap-5 mt-5 hover:bg-black hover:text-white py-3 rounded-lg px-5">
          <TiHomeOutline className="text-2xl" />
          <h3>Dashboard</h3>
        </Link>

        {/* User Management Section */}
        <div className="collapse group hover:bg-black hover:text-white mt-3 collapse-arrow bg-gray-100 rounded-lg shadow-lg">
          <input type="checkbox" name="my-accordion-3" />
          <div className="collapse-title flex items-center gap-3 font-semibold px-4 py-3">
            <MdFormatListNumbered className="text-3xl" />
            <h2 className="text-xl">User</h2>
          </div>
          <div className="collapse-content">
            <ul className="ml-8 mt-2 space-y-3">
              <li>
                <NavLink
                  to="/all_user"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/all_visitor_activity"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  All Visitors
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Features Section */}
        <div className="collapse group hover:bg-black hover:text-white mt-3 collapse-arrow bg-gray-100 rounded-lg shadow-lg">
          <input type="checkbox" name="my-accordion-3" />
          <div className="collapse-title flex items-center gap-3 font-semibold px-4 py-3">
            <MdFormatListNumbered className="text-3xl" />
            <h2 className="text-xl">Features</h2>
          </div>
          <div className="collapse-content">
            <ul className="ml-8 mt-2 space-y-3">
              <li>
                <NavLink
                  to="/news"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  News
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/team"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  The Team
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/licence"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  Trade Licence
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/uplode_file"
                  className="text-lg m-2 hover:text-red-500 transition duration-300"
                  style={({ isActive }) => ({
                    color: isActive ? "red" : "",
                    textDecoration: isActive ? "underline" : "",
                  })}
                >
                  Upload File
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Additional Navigation Links */}
        <Link to="/account" className="flex gap-5 mt-5 hover:bg-black hover:text-white py-3 rounded-lg px-5">
          <RiAccountBoxFill className="text-2xl" />
          <h3>Contact Details</h3>
        </Link>

        <Link to="/create_admin" className="flex gap-5 mt-5 hover:bg-black hover:text-white py-3 rounded-lg px-5">
          <IoCreateOutline className="text-2xl" />
          <h3>Create Admin</h3>
        </Link>

        <Link to="/careers_page" className="flex gap-5 mt-5 hover:bg-black hover:text-white py-3 rounded-lg px-5">
          <MdOutlinePostAdd className="text-2xl" />
          <h3>Careers</h3>
        </Link>

        <Link to="/chnage_password" className="flex gap-5 mt-5 hover:bg-black hover:text-white py-3 rounded-lg px-5">
          <MdOutlinePassword className="text-2xl" />
          <h3>Change Password</h3>
        </Link>
      </section>
    </div>
  );
};

export default DashboardSidebar;