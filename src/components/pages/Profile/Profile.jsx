import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineSettingsSystemDaydream,
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarNull,
} from "react-icons/md";
import DeviceDetector from "device-detector-js";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { GrDevice } from "react-icons/gr";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { TypeOfImage } from "../../../utility/TypesOfImages";
import GenerateImage from "../../CommonAction/GenerateImage";
import { BsBrowserChrome } from "react-icons/bs";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [deviceInfo, setDeviceInfo] = useState(null);

  // Fetch Device Information
  useEffect(() => {
    try {
      const deviceDetector = new DeviceDetector();
      const info = deviceDetector.parse(navigator.userAgent);
      setDeviceInfo(info);
    } catch (error) {
      console.error("Error parsing device info:", error);
    }
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName = userTimeZone.split("/")[1] || "Unknown";

  const {
    data: profile = {},
    refetch,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `https://selectify-server.vercel.app/api/v1/user/myprofile`,
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

        return await res.json();
      } catch (err) {
        toast.error(err.message);
        throw err; // Let React Query handle the error
      }
    },
  });

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    let photo = form.photo.files[0];
    if (TypeOfImage.includes(photo?.name?.split(".")?.pop()?.toLowerCase())) {
      photo = await GenerateImage(photo);
    } else {
      photo = profile?.data?.photo;
    }

    const updateInfo = {
      displayName: name,
      photoURL: photo,
    };
    if (updateInfo) {
      updateUserProfile(updateInfo)
        .then(() => {
          fetch(
            `https://selectify-server.vercel.app/api/v1/auth/update_profile`,
            {
              method: "PATCH",
              headers: {
                "content-type": "application/json",
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
              toast.success(data?.message);
              refetch();
            })
            .catch((error) => {
              toast.error(error?.message);
            });
        })
        .catch((error) => {
          toast.error(error?.message);
        });
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">Error: {error.message}</div>
    );
  }



  return (
    <div
      className="bg-cover bg-center min-h-screen py-10 mt-16"
      style={{
        backgroundImage:
          "url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          {/* Profile Header */}
          <div className="bg-white/70 shadow-md rounded-lg p-4 flex flex-wrap md:flex-nowrap items-center gap-6">
            <div className="avatar w-32 h-32 rounded-full overflow-hidden border-4 border-primary mx-auto">
              <img
                src={user?.photoURL || "https://via.placeholder.com/150"}
                alt={`${user?.displayName || "User"}`}
              />
            </div>
            <div className="flex-grow text-center md:text-left">
              <h1 className="text-2xl font-bold">
                {user?.displayName || "Guest User"}
              </h1>
              <p className="text-gray-700">Email: {user?.email || "N/A"}</p>
              <p className="text-gray-700">Time Zone: {userTimeZone}</p>
              <p className="text-gray-700">
                Device: {deviceInfo?.device?.type || "Unknown"}
              </p>
            </div>
          </div>

          {/* Device Information */}
         
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mt-2">
          <div className="bg-white/50 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-serif mb-4">
              Recently Use Device Information
            </h2>
            <ul className="divide-y divide-gray-200">
              <li className="py-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <GrDevice className="text-green-500" />
                  <strong>Device:</strong>
                </span>
                <span>{deviceInfo?.device?.type || "Unknown"}</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <MdOutlineSettingsSystemDaydream className="text-blue-500" />
                  <strong>OS:</strong>
                </span>
                <span>
                  {deviceInfo?.os?.name || "Unknown"}{" "}
                  {deviceInfo?.os?.version || ""}
                </span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <MdOutlineSignalWifiStatusbar4Bar className="text-green-500" />
                  <strong>Connectivity:</strong>
                </span>
                <span>{navigator.onLine ? "Online" : "Offline"}</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <MdOutlineSignalWifiStatusbar4Bar className="text-gray-500" />
                  <strong>TimeZone:</strong>
                </span>
                <span>{userTimeZone}</span>
              </li>
              <li className="py-3 flex justify-between items-center">
                <span className="flex items-center space-x-2">
                  <MdOutlineSignalWifiStatusbarNull className="text-yellow-500" />
                  <strong>District:</strong>
                </span>
                <span>{districtName}</span>
              </li>
            </ul>
          </div>

          <div className="bg-white/50 shadow-lg rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="text-gray-700 font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user?.displayName || ""}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="text-gray-700 font-semibold">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  defaultValue={user?.email || ""}
                  readOnly
                  className="border border-gray-300 rounded-lg p-2 w-full"
                />
              </div>
              <div>
                <label htmlFor="photo" className="text-gray-700 font-semibold">
                  Profile Photo
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="block w-full text-sm text-slate-500 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        <div className="bg-white/70 shadow-md rounded-lg p-6 grid gap-4 sm:grid-cols-1 md:grid-cols-2 mt-2">
            {/* Left Section */}
            <div>
              <h2 className="text-lg font-serif font-semibold mb-2">
                Account Sign-In Information
              </h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <GrDevice className="text-green-500" />
                    <strong>Device:</strong>
                  </span>
                  <span>{profile?.data?.device || "Unknown"}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSettingsSystemDaydream className="text-blue-500" />
                    <strong>OS:</strong>
                  </span>
                  <span>{profile?.data?.os || "Unknown"}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <BsBrowserChrome className="text-blue-500" />
                    <strong>Browser:</strong>
                  </span>
                  <span>{profile?.data?.browser || "Unknown"}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSignalWifiStatusbarNull className="text-yellow-500" />
                    <strong>Account Creation Time:</strong>
                  </span>
                  <span>{profile?.data?.creationTime}</span>
                </li>
              </ul>
            </div>

            {/* Right Section */}
            <div>
              <h2 className="font-serif text-lg font-semibold mb-2">
                Additional Information
              </h2>
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSignalWifiStatusbar4Bar className="text-green-500" />
                    <strong>Connectivity:</strong>
                  </span>
                  <span>{navigator.onLine ? "Online" : "Offline"}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSignalWifiStatusbar4Bar className="text-gray-500" />
                    <strong>TimeZone:</strong>
                  </span>
                  <span>{userTimeZone}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSignalWifiStatusbarNull className="text-yellow-500" />
                    <strong>District:</strong>
                  </span>
                  <span>{profile?.data?.districtName}</span>
                </li>
                <li className="py-3 flex justify-between items-center">
                  <span className="flex items-center space-x-2">
                    <MdOutlineSignalWifiStatusbarNull className="text-yellow-500" />
                    <strong>User Role:</strong>
                  </span>
                  <span>{profile?.data?.role}</span>
                </li>
                
              </ul>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Profile;
