import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import ErrorPage from "../../../shared/ErrorPage/ErrorPage";
import PostAction from "../../CommonAction/PostAction";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
const AppyCompanyModal = ({ subscriptionmodelId, refetch }) => {
  const [country, setCountry] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("API ERROR");
        }
        return res.json();
      })
      .then((data) => {
        const countryOptions = data.map((country) => ({
          value: country.name.common,
          label: country.name.common,
        }));
        setCountry(countryOptions);
      })
      .catch((errors) => {
        if (errors) {
          return <ErrorPage message={errors?.message} />;
        }
      });
  }, []);

  const onSubmit = async (data) => {
    data.phonenumber = "+88".concat(data.phonenumber);

    const companyData = {
      subscriptionmodelId,
      ...data,
    };
    const respone = await PostAction(
      `${
        import.meta.env.VITE_COMMON_ROOT_API
      }/api/v1/company_apply/create_companyapply`,
      companyData 
    );
    document.getElementById("apply_company_modal").close();
    if (respone?.errorSources?.length >= 1) {
      toast.error(respone?.message);
    } else {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: respone?.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <dialog id="apply_company_modal" className="modal">
        <div
          className="modal-box"
          style={{
            backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white/30 rounded-sm p-2"
          >
            <button
              type="button"
              className="btn btn-sm btn-error btn-outline bg-gray-900 absolute right-2 top-2"
              onClick={() =>
                document.getElementById("apply_company_modal").close()
              }
            >
              ✕
            </button>

            <p className="py-4">
              Please fill in the company details below to proceed.
            </p>

            {/* Company Details Form */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Company Name</span>
              </label>
              <input
                className="input input-bordered"
                {...register("companyname", { required: true })}
                placeholder="Enter Company Name"
              />
              {errors.companyname && (
                <span className="text-error">This field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Country</span>
              </label>
              <Select
                id="country"
                options={country}
                onChange={(selected) => setValue("country", selected.value)}
                className="text-black"
                placeholder="Select or search country"
              />
              {errors.country && (
                <span className="text-error">This field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                className="input input-bordered"
                {...register("address", { required: true })}
                placeholder="Enter Address"
              />
              {errors.address && (
                <span className="text-error">This field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                {...register("email", { required: true })}
                placeholder="Enter Email"
              />
              {errors.email && (
                <span className="text-error">This field is required</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="tel"
                className="input input-bordered"
                {...register("phonenumber", {
                  required: "Phone number is required",

                  pattern: {
                    value: /^01[3-9]\d{8}$/,
                    message: "Invalid Bangladeshi phone number",
                  },
                })}
                placeholder="Enter Phone Number"
              />
              {errors.phonenumber && (
                <span className="text-error">{errors.phonenumber.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-error btn-outline bg-black mt-4 w-full "
            >
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default AppyCompanyModal;
