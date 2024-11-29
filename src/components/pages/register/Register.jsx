import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeviceDetector from "device-detector-js";
import Swal from 'sweetalert2';
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState(null);
  const [isRegister, setRegister] = useState(false);
  const navigate = useNavigate();


  const { createUser, updateUserProfile, EmailVarification, logOut } =useContext(AuthContext);

  const [deviceInfo,setDeviceInfo]=useState({});

  const userTimeZone=Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName=userTimeZone.split("/")[1];




  useEffect(()=>{

    const deviceDetector = new DeviceDetector();
    const userAgent=navigator?.userAgent;
    const info=deviceDetector.parse(userAgent);
    setDeviceInfo(info);

  },[]);

  const onSubmit = async (data) => {

  
    if (data.password.length < 6) {
      setError("Password should be 6 characters or more.");
      return;
    }

    if (data?.password !== data?.confirmpassword) {
      setError("Your Password did not match");
      return;
    }

    createUser(data.email, data.password).then(async(result)=>{
      const user = result.user;

      // if(user){
      //   // token create 
      // }

      updateProfileInfo(data?.username);
      setRegister(true);
      setError("");
      EmailVarification();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Checked Your Email and Varified",
        showConfirmButton: false,
        timer: 1500
      });
      await storeUserInformation(data?.username,user?.email,user?.metadata?.creationTime,data?.password,user?.photoURL,import.meta.env.VITE_USER_ROLE);

      reset();
    }).catch((error)=>{
      setError(error.message);
    });

  };

  const  updateProfileInfo=(name)=>{
    const photoURL = {
      displayName: name,
      photoURL:null,
    };
    updateUserProfile(photoURL)
    .then(() => {})
    .catch((error) => {
      setError(error.message);
    });
  };
 

  const storeUserInformation = async (name,email,creationTime,password,photo, role) =>{

    const userDetails={
      name,email,password,photo:'',role,os:deviceInfo?.os?.name,
      browser:deviceInfo?.client?.name,
      creationTime,
      districtName,
      device:deviceInfo?.device?.type,
    }

    
    fetch(`https://selectify-server.vercel.app/api/v1/user/`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify(userDetails)
    }).then((res)=>{
      if(!res.ok){
        throw new Error('API ERROR');
      }
      return res.json();

    }).then((data)=>{

      

      if(data?.success){
        logOut()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          setError(error.message);
        });
      }

    }).catch((error)=>{
      toast.error(error?.message);
      setError(error?.message)
    })   
  
  };

  return (
   <>
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center mt-10"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}
    >
      <div className="bg-white/50 p-6 rounded-xl shadow-xl w-full max-w-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">
          Register <span className="text-cyan-200">Now</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              {...register("username", { required: "Full Name is required" })}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="Email Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmpassword", { required: "confirmpassword is required" })}
              placeholder="Confirm Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.confirmpassword.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-gray-950 text-white font-bold rounded-lg hover:bg-accent-dark focus:ring-2 focus:ring-accent focus:outline-none"
            >
              Register
            </button>
          </div>

          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-accent hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

       
    </div>
   {/* error or success  */}
   <div className="flex items-center justify-center">
        {isRegister && (
          <p className="text-3xl text-danger font-serif text-center">
            Successfully Register
          </p>
        )}
        {error && <p className="text-3xl text-center text-red-600">{error}</p>}
      </div>
   </>
  );
};

export default Register;
