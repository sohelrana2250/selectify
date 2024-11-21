import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      // Handle your form submission logic here
    } catch (err) {
      console.error(err.message);
      throw new Error(err.message);
    }
  };

  return (
    <div className=" mt-20 px-4">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 items-center">
        {/* Image Section */}
        <div className="w-full">
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?t=st=1710081713~exp=1710085313~hmac=f637c194f1f143e63a84950cbf978997453777c872adf4aebbbecdaa445601a1&w=740"
            alt="register page"
            className="w-full h-auto"
          />
        </div>



        {/* Form Section */}
        <div className="card w-full max-w-md mx-auto shadow-xl bg-base-100">
        <h1 className="text-center text-3xl md:text-4xl">
        Register <span className="text-accent">Now</span>
      </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body py-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                {...register("username", { required: "Full Name is required" })}
                placeholder="User Name"
                className="input input-bordered"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">{errors.username.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                className="input input-bordered"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="Password"
                className="input input-bordered"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password.message}</p>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-accent btn-outline w-full">
                Register
              </button>
            </div>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <Link className="text-accent" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
