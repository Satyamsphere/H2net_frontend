import React, { useState, useEffect } from "react";
import axios from "axios";

const PointToPointQuote = () => {
  const [formData, setFormData] = useState({
    AEnd: {
      CustomerName: "",
      Sitename: "",
      SiteID: "",
      RoomName: "",
      BuildingName: "",
      StreetNumber: "",
      StreetName: "",
      City: "",
      Zipcode: "",
      Country: "United Kingdom of Great Britain and Northern Ireland",
      Galk: ""
    },
    BEnd: {
      CustomerName: "",
      Sitename: "",
      SiteID: "",
      RoomName: "",
      BuildingName: "",
      StreetNumber: "",
      StreetName: "",
      City: "",
      Zipcode: "",
      Country: "United Kingdom of Great Britain and Northern Ireland"
    },
    PortAccessSpeed: "100 Mbps",
    ContractTerm: "12 Months",
    Bandwidth: "10 Mbps",
    AccessProviders: []
  });

  const getBandwidthOptions = (portSpeed) => {
    switch (portSpeed) {
      case "100 Mbps":
        return Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10} Mbps`);
      case "1 Gbps":
        return Array.from({ length: 10 }, (_, i) => `${(i + 1) * 100} Mbps`);
      case "10 Gbps":
        return Array.from({ length: 10 }, (_, i) => `${i + 1} Gbps`);
      case "100 Gbps":
        return Array.from({ length: 10 }, (_, i) => `${(i + 1) * 10} Gbps`);
      default:
        return [];
    }
  };

  useEffect(() => {
    const bandwidthOptions = getBandwidthOptions(formData.PortAccessSpeed);
    setFormData(prev => ({
      ...prev,
      Bandwidth: bandwidthOptions[0]
    }));
  }, [formData.PortAccessSpeed]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Your submit logic here
  };

  const InputField = ({ label, value, onChange, required, placeholder = "Enter value" }) => (
    <div className="flex flex-col flex-1">
      <label className="text-sm text-gray-600 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
          required={required}
        />
        <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
          ✎
        </span>
      </div>
    </div>
  );

  const EndSection = ({ type, data, setData, required = false }) => (
    <div className="mb-8 border-b border-gray-200 pb-6">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-blue-600" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a3 3 0 100 6 3 3 0 000-6zM4 8a3 3 0 100 6 3 3 0 000-6z" />
        </svg>
        <span className="font-semibold text-gray-800">{type}</span>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <InputField
          label="Customer Name"
          value={data.CustomerName}
          onChange={(e) => setData(prev => ({ ...prev, CustomerName: e.target.value }))}
          required={required}
        />
        <InputField
          label="Site Name"
          value={data.Sitename}
          onChange={(e) => setData(prev => ({ ...prev, Sitename: e.target.value }))}
        />
        <InputField
          label="Site ID"
          value={data.SiteID}
          onChange={(e) => setData(prev => ({ ...prev, SiteID: e.target.value }))}
        />
        <InputField
          label="Room Name"
          value={data.RoomName}
          onChange={(e) => setData(prev => ({ ...prev, RoomName: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <InputField
          label="Building Name"
          value={data.BuildingName}
          onChange={(e) => setData(prev => ({ ...prev, BuildingName: e.target.value }))}
        />
        <InputField
          label="Building/Street Number"
          value={data.StreetNumber}
          onChange={(e) => setData(prev => ({ ...prev, StreetNumber: e.target.value }))}
        />
        <InputField
          label="Street Name"
          value={data.StreetName}
          onChange={(e) => setData(prev => ({ ...prev, StreetName: e.target.value }))}
        />
        <InputField
          label="Town/City"
          value={data.City}
          onChange={(e) => setData(prev => ({ ...prev, City: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <InputField
          label="Post Code"
          value={data.Zipcode}
          onChange={(e) => setData(prev => ({ ...prev, Zipcode: e.target.value }))}
          required={required}
        />
        <div className="flex flex-col flex-1">
          <label className="text-sm text-gray-600 mb-1">Country</label>
          <select
            value={data.Country}
            onChange={(e) => setData(prev => ({ ...prev, Country: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 bg-white"
          >
            <option value="United Kingdom of Great Britain and Northern Ireland">
              United Kingdom of Great Britain and Northern Ireland
            </option>
          </select>
        </div>
        {type === "A-End" && (
          <InputField
            label="GALK"
            value={data.Galk}
            onChange={(e) => setData(prev => ({ ...prev, Galk: e.target.value }))}
          />
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1200px] mx-auto p-4 bg-white">
      <form onSubmit={handleSubmit}>
        <EndSection
          type="A-End"
          data={formData.AEnd}
          setData={(updater) => setFormData(prev => ({
            ...prev,
            AEnd: updater(prev.AEnd)
          }))}
          required={true}
        />

        <EndSection
          type="B-End"
          data={formData.BEnd}
          setData={(updater) => setFormData(prev => ({
            ...prev,
            BEnd: updater(prev.BEnd)
          }))}
        />

        <div className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Port or Access Speed</label>
              <div className="flex gap-2">
                {["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"].map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    className={`px-4 py-2 rounded ${
                      formData.PortAccessSpeed === speed
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, PortAccessSpeed: speed }))}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Bandwidth</label>
              <div className="flex gap-2 flex-wrap">
                {getBandwidthOptions(formData.PortAccessSpeed).map((bandwidth) => (
                  <button
                    key={bandwidth}
                    type="button"
                    className={`px-4 py-2 rounded ${
                      formData.Bandwidth === bandwidth
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100"
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, Bandwidth: bandwidth }))}
                  >
                    {bandwidth}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Contract Term</label>
          <div className="flex gap-2">
            {["12 Months", "24 Months", "36 Months", "48 Months", "60 Months"].map((term) => (
              <button
                key={term}
                type="button"
                className={`px-4 py-2 rounded ${
                  formData.ContractTerm === term
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setFormData(prev => ({ ...prev, ContractTerm: term }))}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Access Providers</label>
          <div className="flex flex-wrap gap-4">
            {["BT Openreach", "BT Wholesale", "CityFibre", "Colt", "Sky", "TalkTalk", "Virgin Media"].map((provider) => (
              <label key={provider} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.AccessProviders.includes(provider)}
                  onChange={(e) => {
                    const updatedProviders = e.target.checked
                      ? [...formData.AccessProviders, provider]
                      : formData.AccessProviders.filter(p => p !== provider);
                    setFormData(prev => ({ ...prev, AccessProviders: updatedProviders }));
                  }}
                  className="w-4 h-4 text-blue-600"
                />
                <span>{provider}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Circuit Diversity (Coming Soon)</h3>
          <p className="text-sm text-gray-600">
            This comes with two sets of network terminating equipment, each with a single diversity outlet path which you can install in different locations. If something goes wrong on the primary path, you can manually switch traffic to the secondary path.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
        >
          Get Quote
        </button>
      </form>
    </div>
  );
};

export default PointToPointQuote;