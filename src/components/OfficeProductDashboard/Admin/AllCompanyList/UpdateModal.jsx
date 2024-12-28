import React, { useEffect, useState } from "react";
import ErrorPage from "../../../../shared/ErrorPage/ErrorPage";
import { Mail, Phone, MapPin } from 'lucide-react';
import PatchAction from "../../../CommonAction/PatchAction";
import toast from "react-hot-toast";
import { showSuccessMessage } from "../../../../utility/TypesOfImages";

const UpdateModal = ({ specific_companyId,refetch }) => {
  const [specificCompany, setSpecificCompany] = useState({});
  
  useEffect(() => {
    if (specific_companyId) {
      fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/company_apply/find_specific_companylist/${specific_companyId}`,
        {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("API ERROR");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.success) {
            setSpecificCompany(data?.data);
          }
        })
        .catch((error) => {
          if (error) {
            return <ErrorPage message={error?.message} />;
          }
        });
    }
  }, [specific_companyId]);

  const handelSubmit=async( event)=>{
    event.preventDefault();

    const senddata={
        companyname:specificCompany?.companyname,
        country:specificCompany?.country,
        address:specificCompany?.address,
        email:specificCompany?.email,
        phonenumber:specificCompany?.phonenumber

    }

    const response=await  PatchAction(`${
        import.meta.env.VITE_COMMON_ROOT_API
      }/api/v1/company_apply/update_apply_company/${specific_companyId}`,senddata,refetch);

     
    

      if (response?.errorSources?.length >= 1) {
        toast.error(response.message);
        return;
      }
      else{
        document.getElementById("update_specific_company").close();
        showSuccessMessage(response?.message);
      }

  }
  return (
    <>
      <dialog id="update_specific_company" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-outline btn-error bg-black absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="max-w-2xl mx-auto p-6 w-full bg-gradient-to-br from-white/30 to-green-600/30  shadow-lg rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-4">
              Company Information
            </h2>
            <form onSubmit={handelSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="companyname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mt-1">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    id="companyname"
                    readOnly
                    value={specificCompany.companyname || ""}
                    onChange={(e) =>
                      setSpecificCompany({
                        ...specificCompany,
                        companyname: e.target.value,
                      })
                    }
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mt-1">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    id="country"
                    value={specificCompany.country || ""}
                    onChange={(e) =>
                      setSpecificCompany({
                        ...specificCompany,
                        country: e.target.value,
                      })
                    }
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mt-1">
                  <MapPin className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="text"
                    id="address"
                    value={specificCompany.address || ""}
                    onChange={(e) =>
                      setSpecificCompany({
                        ...specificCompany,
                        address: e.target.value,
                      })
                    }
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mt-1">
                  <Mail className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="email"
                    id="email"
                    readOnly
                    value={specificCompany.email || ""}
                    onChange={(e) =>
                      setSpecificCompany({
                        ...specificCompany,
                        email: e.target.value,
                      })
                    }
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="flex items-center border border-gray-300 rounded-lg p-3 mt-1">
                  <Phone className="text-gray-400 w-5 h-5 mr-2" />
                  <input
                    type="tel"
                    id="phonenumber"
                    value={specificCompany.phonenumber || ""}
                    onChange={(e) =>
                      setSpecificCompany({
                        ...specificCompany,
                        phonenumber: e.target.value,
                      })
                    }
                    className="w-full bg-transparent focus:outline-none text-gray-800"
                  />
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors duration-300"
                  disabled={!specificCompany.companyname || !specificCompany.country || !specificCompany.address || !specificCompany.email || !specificCompany.phonenumber}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default UpdateModal;
