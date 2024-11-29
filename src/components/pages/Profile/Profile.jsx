import React, { useContext, useEffect, useState } from "react";
import {
  MdOutlineSettingsSystemDaydream,
  MdOutlineSignalWifiStatusbar4Bar,
  MdOutlineSignalWifiStatusbarNull
} from "react-icons/md";
import DeviceDetector from "device-detector-js";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { GrDevice } from "react-icons/gr";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [deviceInfo, setDeviceInfo] = useState(null);

  useEffect(() => {
    const deviceDetector = new DeviceDetector();
    const info = deviceDetector.parse(navigator.userAgent);
    setDeviceInfo(info);
  }, []);

  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const districtName = userTimeZone.split("/")[1];

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const address = form.address.value;
    const contactNumber = form.contactNumber.value;
    const name = form.name.value;
    const image = form.photo.files[0];

    console.log({ address, contactNumber, name, image });
  };

  return (
    <div className="mt-16">
        <div
      className="bg-cover bg-center min-h-screen py-10"
      style={{
        backgroundImage: "url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')"
      }}
    >
      <div className=" min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          {/* User Profile */}
          <div className="bg-white/50  rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-6">
              <div className="flex-shrink-0">
                <div className="avatar w-36 h-36 rounded-full overflow-hidden border-4 border-primary">
                  <img
                    src={
                      user?.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzF32lbq4BoRPJ3bZ4FrQiFe9uhw5tRZBqxzt7G00uhbmqTW3f-PeYpIMOUzFCsYpuOMI&usqp=CAU"
                    }
                    alt={`${user?.displayName || "User"}`}
                  />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.displayName || "Guest User"}
                </h1>
                <p className="text-gray-600">Email: {user?.email}</p>
                <p className="text-gray-600">Location: {userTimeZone} </p>
                <p className="text-gray-600">
                  Device: {deviceInfo?.device?.type}
                </p>
              </div>
            </div>
          </div>

          {/* Device Info */}
          {deviceInfo && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Device Details */}
              <div className="bg-white/50 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Device Information</h2>
                <ul className="divide-y divide-gray-200">
                  <li className="py-3 flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <GrDevice className="text-green-500" />
                      <strong>Device:</strong>
                    </span>
                    <span>
                      {deviceInfo?.device?.type || "Unknown"}
                      {deviceInfo.device.model || ""}
                    </span>
                  </li>
                  <li className="py-3 flex justify-between items-center">
                    <span className="flex items-center space-x-2">
                      <MdOutlineSettingsSystemDaydream className="text-blue-500" />
                      <strong>OS:</strong>
                    </span>
                    <span>
                      {deviceInfo.os.name || "Unknown"}{" "}
                      {deviceInfo.os.version || ""}
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

              {/* Update Profile Form */}
              <div className="bg-white/50 shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Update Profile</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="name"
                      className="text-gray-700 font-semibold"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      defaultValue={user?.displayName}
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="email"
                      className="text-gray-700 font-semibold"
                    > Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      defaultValue={user?.email}
                      readOnly
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <label
                      htmlFor="date"
                      className="text-gray-700 font-semibold"
                    >
                      Date
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="text"
                      defaultValue={new Date().toString()}
                      readOnly
                      className="border border-gray-300 rounded-lg p-2"
                    />
                  </div>
                  <div className="relative">
                    <div className="flex justify-center">
                      <label className="block">
                        <span className="sr-only">Choose profile photo</span>
                        <input
                          type="file"
                          name="photo"
                          className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100"
                        />
                      </label>
                    </div>
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
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
