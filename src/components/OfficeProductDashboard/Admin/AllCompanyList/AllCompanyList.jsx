import React, { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Globe,
  CreditCard,
  Clock,
  Info,
  Edit,
  Trash,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../shared/Loading/Loading";
import ErrorPage from "../../../../shared/ErrorPage/ErrorPage";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";

const AllCompanyList = () => {
 const [specific_companyId,setSpecificCompanyId]=useState('')
  const {
    data: all_company_list = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["all_company_list"],
    queryFn: async () => {
      const res = await fetch(
        `${
          import.meta.env.VITE_COMMON_ROOT_API
        }/api/v1/company_apply/find_all_applycompanyList`,
        {
          method: "GET",
          headers: {
            authorization: `${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorPage message={error?.message} />;
  }

  const handelSpecificCompanyModal=(id)=>{
    document.getElementById("update_specific_company").showModal();
    setSpecificCompanyId(id);
  }

  const handelDeleteSpecificCompany=(companyId)=>{

    
  }

  return (
    <>
    <div className="min-h-screen">
      <div className=" ">
        <h1 className="animate-pulse text-4xl font-serif text-center mb-8 text-gray-800 tracking-tight animate-fade-in">
          Company <span className="text-blue-900 animate-pulse">List</span>
        </h1>
      </div>
      <div className="max-w-7xl mx-auto grid gap-8 lg:grid-cols-2">
        {!isLoading &&
          all_company_list?.data?.result?.map((company) => (
            <div
              key={company._id}
              className="bg-gradient-to-br from-white to-green-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              {/* Header Section with Image */}
              <div className="relative">
                <img
                  src={company.subscriptionmodelId.photo}
                  alt="Subscription"
                  className="w-full h-52 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {company.companyname}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">
                      {company.country}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 text-gray-600">
                    <Mail className="w-5 h-5 text-blue-500" />
                    <a
                      href={`mailto:${company.email}`}
                      className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      {company.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <Phone className="w-5 h-5 text-blue-500" />
                    <span>{company.phonenumber}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-blue-500" />
                    <span>{company.address}</span>
                  </div>
                </div>

                {/* Subscription Details */}
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-800">
                      {company.subscriptionmodelId.subscriptionname}
                    </h3>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-blue-500" />
                      <span className="text-blue-800 font-bold">
                        ${company.subscriptionmodelId.price}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {company.subscriptionmodelId.subscriptiondetails}
                  </p>
                  <div className="space-y-2">
                    {company.subscriptionmodelId.subscriptionbenefit.map(
                      (benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-gray-600"
                        >
                          <CheckCircle className="w-4 h-4 text-blue-500" />
                          <span>{benefit}</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Status Section */}
                <div className="flex flex-wrap gap-4 items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`px-4 py-2 rounded-full ${
                        company.payment
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      } flex items-center gap-2`}
                    >
                      {company.payment ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span>
                        {company.payment
                          ? "Payment Completed"
                          : "Payment Pending"}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-full ${
                        company.isVerified
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      } flex items-center gap-2`}
                    >
                      {company.isVerified ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      <span>
                        {company.isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="pt-4 border-t border-gray-100 text-sm text-gray-500 space-y-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Created: {new Date(company.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>
                      Updated: {new Date(company.updatedAt).toLocaleString()}
                    </span>
                  </div>
                </div>
                {/* button   */}
                <div className="flex flex-wrap justify-end space-x-2 mt-4">
                  <Link to={`/all_services/specific_company_list/${company?._id}`} className="btn btn-sm btn-outline flex items-center space-x-1">
                    <Info className="w-4 h-4" />
                    <span>Details</span>
                  </Link>
                  <button onClick={()=>handelSpecificCompanyModal(company?._id)} className="btn btn-sm btn-outline flex items-center space-x-1">
                    <Edit className="w-4 h-4" />
                    <span>Update</span>
                  </button>
                  <button onClick={()=>handelDeleteSpecificCompany(company?._id)} className="btn btn-sm btn-outline flex items-center space-x-1 text-red-600">
                    <Trash className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>

    <UpdateModal specific_companyId={specific_companyId}  refetch={refetch}/>
    
    </>
  );
};

export default AllCompanyList;
