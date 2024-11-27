
import React, { useState,  useRef } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { MdAutoDelete, MdOutlinePassword } from "react-icons/md";
import { CgProfile } from "react-icons/cg";


const Navbar = () => {
 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Manage dropdown state
 

  
 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the dropdown open/close state
  };

  
  const detailsRef = useRef(null);

  const handleLinkClick = () => {
    if (detailsRef.current) {
      detailsRef.current.removeAttribute("open"); // Close the details element
    }
  };

  // compnay dropdown box
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClickCompany = () => {
    setIsOpen(false); // Close the dropdown when a link is clicked
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        
        <div className="navbar bg-[#e4dfdf31] backdrop-blur-md shadow-lg">
          <div className="navbar-start">
            <div className="dropdown">
              <button
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
                onClick={toggleMenu} // Toggle the menu on button click
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                // Conditionally render the menu when open
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 rounded-box z-[1] text-black w-52 bg-white backdrop-blur-md shadow-lg"
                >
                  <li>
                    <Link to="/" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <details>
                      <summary>About Us</summary>
                      <ul className="w-48 rounded-sm">
                        <li>
                          <Link
                            to="/company"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Company
                          </Link>
                        </li>
                        <li>
                          <Link to="/work" onClick={() => setIsMenuOpen(false)}>
                            Office Section
                          </Link>
                        </li>
                        <li>
                          <Link to="/team" onClick={() => setIsMenuOpen(false)}>
                            Our Team
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/careers"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Careers Groth
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/licence"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Running Company 
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/terms_and_condition"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            Terms And Conditions
                          </Link>
                        </li>
                      </ul>
                    </details>
                  </li>
                  <li>
                    <Link to="/all_services" onClick={() => scrollToSection("our-work")}>
                      Interview
                    </Link>
                  </li>
                  <li>
                    <Link to="/all_service" onClick={() => scrollToSection("services")}>
                      Services{" "}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </li>
                </ul>
              )}
            </div>
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-12 h-12 ml-2 rounded-full bg-white overflow-hidden p-1">
                  <img
                    src="https://uploads.commoninja.com/searchengine/shopify/multiselect-variant-selector.png"
                    alt="Fast Office Logo"
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="relative inline-block text-left">
              <div className="flex items-center">
                 <button className="btn btn-ghost text-xl font-bold">
                 Selectify
                </button>
              </div>


                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {[]?.map((company, index) => (
                        <Link
                          key={index}
                          to={`${company.path}/${index + 1}`}
                        //   onClick={handleLinkClickCompany} // Close dropdown on link click
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 border-b border-gray-400"
                          role="menuitem"
                        >
                          {company.companyName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <details ref={detailsRef}>
                  <summary>About Us</summary>
                  <ul className="w-48 rounded-sm">
                    <li>
                      <Link to="/company" onClick={handleLinkClick}>
                        Company
                      </Link>
                    </li>
                    <li>
                      <Link to="/work" onClick={handleLinkClick}>
                        How We Work
                      </Link>
                    </li>
                    <li>
                      <Link to="/team" onClick={handleLinkClick}>
                        The Team
                      </Link>
                    </li>
                    <li>
                      <Link to="/all_services" onClick={handleLinkClick}>
                      Interview
                      </Link>
                    </li>
                    <li>
                      <Link to="/licence" onClick={handleLinkClick}>
                      Running Company 
                      </Link>
                    </li>
                    <li>
                      <Link to="/terms_and_condition" onClick={handleLinkClick}>
                        Terms And Conditions
                      </Link>
                    </li>
                  </ul>
                </details>
              </li>

              <li>
                <Link to="" onClick={() => scrollToSection("our-work")}> Interview</Link>
              </li>
              <li to="/all_services">
                <Link onClick={() => scrollToSection("services")}>
                  Services{" "}
                </Link>
              </li>

              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="navbar-end">
            {isAuthenticated ? (
              <>
                <h1 className="text-xl mr-5">
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
              </>
            ) : (
              <>
                
                  <Link   to="/login" className="btn btn-ghost ">
                    LogIn
                  </Link>
                  
                
              </>
            )}
            {/* {isAuthenticated ? (
            <Link to="/profile">
              <div className="flex gap-2 items-center mr-5">
                <h2>{showData[0]?.name}</h2>
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    showData[0]?.profilePhoto
                      ? showData[0]?.profilePhoto
                      : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"
                  }
                  alt="profile"
                />
              </div>
            </Link>
          ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
