import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const DeleteAccount = () => {
  const { user, DeleteAccount, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleDeleteAccount = (event) => {
    event.preventDefault();

    Swal.fire({
      title: "Are you sure?",
      text: "This action is irreversible and will permanently delete your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete my account",
    }).then((result) => {
      if (result.isConfirmed) {
        // Call your API and perform account deletion
        console.log("Account deleted.");
      }
    });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{
        backgroundImage: `url('https://wallpapers.com/images/hd/yellow-and-blue-background-bqfg6r5bom6fxrvm.jpg')`,
      }}
    >
      <div className="bg-white/60 p-8 rounded-xl shadow-xl w-full max-w-lg backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Delete Your Account
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Deleting your account will remove all data permanently. This action
          cannot be undone.
        </p>
        <form onSubmit={handleDeleteAccount} className="space-y-5">
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              type="email"
              id="email"
              defaultValue={user?.email}
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              type="text"
              id="username"
              defaultValue={user?.displayName}
              readOnly
            />
          </div>
          <div>
            <label
              className="block text-gray-700 font-medium mb-1"
              htmlFor="date"
            >
              Date
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:outline-none"
              type="text"
              id="date"
              defaultValue={new Date().toString()}
              readOnly
            />
          </div>
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              required
              className="h-5 w-5 text-red-500 border-gray-300 rounded focus:ring-2 focus:ring-red-500"
            />
            <label
              className="text-gray-600 text-sm"
              htmlFor="confirmation"
            >
              I understand that this action is irreversible and will
              permanently delete my account.
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-red-500 hover:bg-red-600 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteAccount;
