
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const ChangePassword = () => {
  
  
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
      } = useForm();
    
      const { UpdatePassword, logOut } = useContext(AuthContext);
    
      const [error, setError] = useState("");
      const [passwordStrength, setPasswordStrength] = useState("");
      const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
      });
    
      const togglePasswordVisibility = (field) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
      };
    
      const evaluatePasswordStrength = (password) => {
        if (password.length < 8) {
          setPasswordStrength("Weak");
        } else if (/[A-Z]/.test(password) && /[0-9]/.test(password)) {
          setPasswordStrength("Strong");
        } else {
          setPasswordStrength("Moderate");
        }
      };
    
      const onSubmit = async (data) => {
        if (data.newPassword !== data.confirmPassword) {
          setError("Passwords do not match.");
          return;
        }
    
        const result = await UpdatePassword(data.currentPassword, data.newPassword);
    
        if (result) {
          logOut()
            .then(() => {
              localStorage.setItem("token", null);
              setError("");
            })
            .catch((err) => console.error(err));
        }
    
        reset();
      };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}
    >
     <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white/60 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Change Password
        </h1>
        <p className="text-gray-600 text-center mb-4">
          Secure your account by updating your password.
        </p>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Current Password */}
          <div>
            <label
              htmlFor="currentPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Current Password
            </label>
            <div className="relative">
              <input
                id="currentPassword"
                type={showPassword.current ? "text" : "password"}
                {...register("currentPassword", { required: "Current password is required." })}
                className="mt-1 block w-full px-4 py-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none focus:shadow-md"

              />
              <span
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.currentPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.currentPassword.message}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <div className="relative">
              <input
                id="newPassword"
                type={showPassword.new ? "text" : "password"}
                {...register("newPassword", {
                  required: "New password is required.",
                  onChange: (e) => evaluatePasswordStrength(e.target.value),
                })}
                className="mt-1 block w-full px-4 py-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none focus:shadow-md"

              />
              <span
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {passwordStrength && (
              <div className="mt-2">
                <div
                  className={`h-2 rounded ${
                    passwordStrength === "Strong"
                      ? "bg-green-500"
                      : passwordStrength === "Moderate"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{
                    width: passwordStrength === "Strong" ? "100%" : passwordStrength === "Moderate" ? "75%" : "50%",
                  }}
                ></div>
                <p className="text-sm mt-1">{`Password Strength: ${passwordStrength}`}</p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword.confirm ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your new password.",
                })}
                className="mt-1 block w-full px-4 py-2 border rounded border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-600 focus:outline-none focus:shadow-md"

              />
              <span
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-3 text-gray-500 cursor-pointer"
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.confirmPassword && (
              <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-800 text-sm"
              onClick={() => reset()}
            >
              Clear
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-800 text-white px-5 py-2 rounded shadow focus:ring-2 focus:ring-blue-300"
            >
             Chnage Password
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
