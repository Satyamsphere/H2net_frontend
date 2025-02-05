import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CreateOrganization = () => {
  const [organizationName, setOrganizationName] = useState("");
  const [domain, setDomain] = useState("");
  const [targetDomain, setTargetDomain] = useState("");
  const [domains, setDomains] = useState([]); // Stores fetched domains
  const [isDomainMatching, setIsDomainMatching] = useState("");
  const [subDomainPartnership, setSubDomainPartnership] = useState("");
  const [organizationId, setOrganizationId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch domains from API on component mount using Axios
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/organizations/domains")
      .then((response) => {
        setDomains(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching domains!");
        setLoading(false);
      });
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    let requestBody = {};
    let apiUrl = "http://localhost:5000/api/organizations/create"

    if (isDomainMatching === "specific") {
      requestBody = {
        name: organizationName,
        domain: domain,
        isDomainMatching: "specific",
        OrganizationId: organizationId,
      };
    } else if (isDomainMatching === "subdomain") {
      requestBody = {
        name: organizationName,
        OrganizationId: organizationId,
        targetDomain: targetDomain,
        isDomainMatching: "subdomains",
        subdomainpartnership: subDomainPartnership === "true",
      };

      //change the API URL for subdomain
      apiUrl="http://localhost:5000/api/organizations/send-partnership-request";
    }

    try {
        const response = await axios.post(apiUrl, requestBody);
        console.log(response.data)
    //   await axios.post(
    //     "http://localhost:5000/api/organizations/create",
    //     requestBody
      

      alert("✅ Organization Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      // Clear form fields after successful submission
      setOrganizationName("");
      setDomain("");
      setTargetDomain("");
      setIsDomainMatching("");
      setSubDomainPartnership("");
      setOrganizationId("");
    } catch (error) {
      alert("❌ Error creating organization!"+ error, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Organization
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Organization Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => setOrganizationName(e.target.value)}
              placeholder="Enter organization name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Domain Name (Input) */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Custom Domain Name
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Enter Domain name"
             
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Domain Matching Type */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Domain Matching Type
            </label>
            <select
              value={isDomainMatching}
              onChange={(e) => {
                setIsDomainMatching(e.target.value);
                if (e.target.value !== "subdomain") {
                  setSubDomainPartnership("");
                }
              }}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an option</option>
              <option value="specific">Specific</option>
              <option value="subdomain">Subdomain</option>
            </select>
          </div>

          {/* Subdomain Partnership & Target Domain (Conditional) */}
          {isDomainMatching === "subdomain" && (
            <div className="space-y-4">
              {/* Subdomain Partnership */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Subdomain Partnership
                </label>
                <select
                  value={subDomainPartnership}
                  onChange={(e) => setSubDomainPartnership(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select an option</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              {/* Target Domain (Fetched from API) */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Target Domain
                </label>
                <select
                  value={targetDomain}
                  onChange={(e) => setTargetDomain(e.target.value)}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a domain</option>
                  {loading ? (
                    <option disabled>Loading...</option>
                  ) : (
                    domains.map((item) => (
                      <option key={item._id} value={item.domain}>
                        {item.domain}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
          )}

          {/* Organization ID */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Organization ID
            </label>
            <input
              type="text"
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              placeholder="Enter organization ID"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateOrganization;
