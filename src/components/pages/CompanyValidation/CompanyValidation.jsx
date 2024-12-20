import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ErrorPage from "../../../shared/ErrorPage/ErrorPage";
import TokenVarified from "../../../utility/auth/TokenVarified";
import Loading from "../../../shared/Loading/Loading";
import {Link} from "react-router-dom"
const CompanyValidation = () => {
  const [verificationState, setVerificationState] = useState({
    id: "",
    token: "",
    isLoading: true,
    error: null,
    verificationSuccess: false,
  });

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get("id");
      const token = urlParams.get("token");

      if (!id || !token) {
        throw new Error("Missing verification parameters");
      }

      setVerificationState((prev) => ({
        ...prev,
        id,
        token,
        isLoading: false,
      }));
    } catch (error) {
      setVerificationState((prev) => ({
        ...prev,
        isLoading: false,
        error: error.message,
      }));
      toast.error(error.message);
    }
  }, []);

  const companyInfo = verificationState.token
    ? TokenVarified(verificationState.token)
    : null;
  useEffect(() => {
    if (companyInfo?.exp) {
      const currentTime = Math.floor(Date.now() / 1000);
      if (currentTime > companyInfo.exp) {
        setVerificationState((prev) => ({
          ...prev,
          error: "Token has expired",
        }));
        toast.error("Token is expired. Please apply again");
      }
    }
  }, [companyInfo?.exp]);

  // API call for company verification
  useEffect(() => {
    const verifyCompany = async () => {
      if (!companyInfo?.id) return;

      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_COMMON_ROOT_API
          }/api/v1/company_apply/companyapply_varified/${companyInfo.id}`,
          {
            method: "GET",
            headers: {
              authorization: localStorage.getItem("token"),
            },
          }
        );

        if (!response.ok) {
          throw new Error("API ERROR");
        }

        const data = await response.json();

        setVerificationState((prev) => ({
          ...prev,
          verificationSuccess: true,
        }));
      } catch (error) {
        setVerificationState((prev) => ({
          ...prev,
          error: error.message,
        }));
      }
    };

    verifyCompany();
  }, [companyInfo?.id]);

  if (verificationState.isLoading) {
    return <Loading />;
  }

  if (verificationState.error) {
    return <ErrorPage message={verificationState.error} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center">
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8 sm:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6 text-center">
            Company Verification
          </h1>
          {verificationState.verificationSuccess ? (
            <div className="text-center space-y-6">
              <div className="text-green-600 text-lg font-semibold">
                Verification successful! Your company has been verified.
              </div>
              <div className="mt-10 flex flex-col items-center">
                <img
                  className="w-24 h-24 animate-bounce"
                  src="https://www.pngall.com/wp-content/uploads/12/Green-Check-No-Background.png"
                  alt="Success"
                />
                <h2 className="text-5xl font-bold text-gray-800 mt-4">Success</h2>
                <p className="text-lg text-gray-600 mt-3">
                  Your information has been saved successfully.
                </p>
                <p>successful! Your company has been verified -- <Link to="" className="underline text-xl font-serif">Buy Your Service</Link></p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-4">
                <p className="text-sm text-gray-500">Verification ID:</p>
                <p className="text-lg font-semibold text-gray-800">
                  {verificationState.id}
                </p>
              </div>
              <div className="border-l-4 border-yellow-500 pl-4">
                <p className="text-sm text-gray-500">Status:</p>
                <p className="text-lg font-semibold text-yellow-600">
                  Verification in progress...
                </p>
              </div>
              <div className="flex justify-center mt-8">
                <svg
                  className="animate-spin h-10 w-10 text-yellow-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gray-50 text-center py-6">
          <p className="text-sm text-gray-500">
            Having trouble? Contact{" "}
            <a
              href="mailto:support@company.com"
              className="text-blue-500 hover:underline"
            >
              support@company.com
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default CompanyValidation;
