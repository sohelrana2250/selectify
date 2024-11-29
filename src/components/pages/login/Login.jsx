import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import DeviceDetector from "device-detector-js";
import { AuthContext } from "../../AuthProvider/AuthProvider";



const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const [login, setLogain] = useState(false);
  const [error, setError] = useState(null);

  const { signIn, googleLogin,githubLogin } = useContext(AuthContext);

  const [deviceInfo, setDeviceInfo] = useState({});
  useEffect(() => {
    const deviceDetector = new DeviceDetector();
    const userAgent = navigator?.userAgent;
    const info = deviceDetector.parse(userAgent);
    setDeviceInfo(info);
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName = userTimeZone.split("/")[1];

  const onSubmit = async (data) => {
    signIn(data?.email, data?.password)
      .then(async (result) => {
        const user = await result?.user;
        if (user) {
          try {
            const response = await fetch(
              "https://selectify-server.vercel.app/api/v1/auth/token",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  email: user?.email,
                }),
              }
            );
            if (!response.ok) {
              throw new Error("Failed to fetch token");
            }
            const data = await response.json();
            const accessToken = data?.data;
            localStorage.setItem("token", accessToken);

            toast.success("Successfully Login");

            setLogain(true);
            setError("");
            if (user?.emailVerified) {
              const form = location.state?.from?.pathname || "/";
              navigate(form, { replace: true });
            } else {
              toast.error("You Are Not Varified User");
            }
          } catch (error) {
            console.error("Error fetching token:", error);
          }
        } else {
          console.log("Not Varified");
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    reset();
  };

  const handelGoogleSinIn = () => {
    // store in user Information
    googleLogin()
      .then(async (result) => {
        const user = result.user;
        if (user) {
          const userDetails={
            name:user?.displayName,email:user?.email,password:import.meta.env.VITE_GOOGLE_AUTH,photo:'',role:import.meta.env.VITE_USER_ROLE,os:deviceInfo?.os?.name,
            browser:deviceInfo?.client?.name,
            creationTime:user?.metadata?.creationTime,
            districtName,
            device:deviceInfo?.device?.type,
          }

          

             fetch(
              "https://selectify-server.vercel.app/api/v1/user/",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(userDetails),
              }
            ).then((res)=>{
              if(!res.ok){
                throw new Error("API ERROR");
              }
              return res.json();
            }).then((data)=>{
              localStorage.setItem("token", data?.data);
              if(data?.data){
                toast.success(data?.message);
                setLogain(true);
                setError("");
                if (user?.emailVerified) {
                  const form = location.state?.from?.pathname || "/";
                  navigate(form, { replace: true });
                } else {
                  toast.error("You Are Not Varified User");
                }
              }

            }).catch((error)=>{
              setError(error?.message);
              toast.error(error?.message);
            });      
          
        } else {
          toast.error("Not Varified");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handelGithhubSingIn=async()=>{
    //https://github.com/settings/applications/2795521
    try {
      // Assuming githubLogin() is an async function that handles GitHub login
      const result = await githubLogin();
      const user = result.user;
      console.log(user); // Log the user object to the console
    } catch (error) {
      console.error(error); // Use console.error to log the error
    }
  }

  return (
    <>
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}
    >
      <div className="bg-white/60 p-8 rounded-xl shadow-xl w-full max-w-lg backdrop-blur-sm">
        <h1 className="text-center text-3xl font-semibold text-gray-800 mb-6">
          Welcome Back! <span className="text-accent">Login</span>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
              placeholder="Email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "Password is required" })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent"
              placeholder="Password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="w-full py-3 bg-gray-900 text-white font-bold rounded-lg hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Login
            </button>
          </div>

          <p className="text-center  text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Create an account
            </Link>
          </p>
          <p className="text-center  text-sm text-gray-600">
            Forgot Password System? {" "}
            <Link to="/forget_password" className="text-accent hover:underline">
             Forget Password
            </Link>
          </p>
        </form>

        <div className="text-center mt-5">
          <p className="text-gray-600">Or Sign Up Using</p>
          <div className="flex justify-center mt-3 space-x-4">
            <button onClick={handelGoogleSinIn} className="btn btn-circle">
              <img
                src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
                alt="google logo"
              />
            </button>
            <button onClick={handelGithhubSingIn} className="btn btn-circle">
              <img
                src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
                width={35}
                height={35}
                alt="github logo"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
     {/* error or success  */}
     <div className="flex items-center justify-center">
        {login && (
          <p className="text-3xl text-danger font-serif text-center">
            Successfully Login
          </p>
        )}
        {error && <p className="text-3xl text-center text-red-600">{error}</p>}
      </div>
    </>
  );
};

export default Login;
