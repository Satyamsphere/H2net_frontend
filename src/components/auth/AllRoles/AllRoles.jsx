import { useNavigate } from "react-router-dom";

const AllRoles = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Select Your Role
        </h2>

        <p className="text-center text-gray-600 text-sm mb-6">
          Please select the appropriate role to proceed with registration.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/userregister")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition shadow-sm"
          >
            User Registration
          </button>

          <button
            onClick={() => navigate("/adminregister")}
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md transition shadow-sm"
          >
            Admin Registration
          </button>

          <button
            onClick={() => navigate("/productmanagerregister")}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition shadow-sm"
          >
            Product Manager Registration
          </button>

          <button
            onClick={() => navigate("/provisioningcoordinatorregister")}
            className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-2 px-4 rounded-md transition shadow-sm"
          >
            Provisioning Coordinator Registration
          </button>
        </div>

        <div className="border-t border-gray-300 mt-6 pt-4 text-center">
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-800 font-medium transition"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllRoles;
