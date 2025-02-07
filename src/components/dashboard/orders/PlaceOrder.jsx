import React, { useState } from "react";

const PlaceOrder = () => {
  const [formDataA, setFormDataA] = useState({
    customerName: "",
    siteName: "",
    siteId: "",
    roomName: "",
    buildingName: "",
    buildingStreetNumber: "",
    streetName: "",
    townCity: "",
    postCode: "",
    country: "United Kingdom",
    galk: "",
  });

  const [formDataB, setFormDataB] = useState({
    customerName: "",
    siteName: "",
    siteId: "",
    roomName: "",
    buildingName: "",
    buildingStreetNumber: "",
    streetName: "",
    townCity: "",
    postCode: "",
    country: "United Kingdom",
    // galk: "",
  });

  const [portSpeed, setPortSpeed] = useState("1 Gbps");
  const [contractTerm, setContractTerm] = useState("36 Months");
  const [bandwidth, setBandwidth] = useState("1000 Mbps");

  const handleChangeA = (e) => {
    const { name, value } = e.target;
    setFormDataA({ ...formDataA, [name]: value });
  };

  const handleChangeB = (e) => {
    const { name, value } = e.target;
    setFormDataB({ ...formDataB, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("A-End Data:", formDataA);
    console.log("B-End Data:", formDataB);
    console.log("Port Speed:", portSpeed);
    console.log("Contract Term:", contractTerm);
    console.log("Bandwidth:", bandwidth);
  };

  return (
    <div className="max-w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-blue-600">A-End</h2>
      <form className="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
        {Object.keys(formDataA).map((key) => (
          <div key={key} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="text"
              name={key}
              value={formDataA[key]}
              onChange={handleChangeA}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </form>
      <h2 className="text-lg font-semibold mb-4 text-blue-600">B-End</h2>
      <form className="grid grid-cols-4 gap-4 border-b pb-4 mb-4">
        {Object.keys(formDataB).map((key) => (
          <div key={key} className="col-span-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
            </label>
            <input
              type="text"
              name={key}
              value={formDataB[key]}
              onChange={handleChangeB}
              className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        ))}
      </form>
      
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Port or Access Speed</h2>
      <div className="flex gap-4 mb-4">
        {["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"].map((speed) => (
          <button
            key={speed}
            type="button"
            className={`px-4 py-2 rounded-md ${portSpeed === speed ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setPortSpeed(speed)}
          >
            {speed}
          </button>
        ))}
      </div>
      
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Bandwidth</h2>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {["100 Mbps", "200 Mbps", "300 Mbps", "400 Mbps", "500 Mbps", "600 Mbps", "700 Mbps", "800 Mbps", "900 Mbps", "1000 Mbps"].map((bw) => (
          <button
            key={bw}
            type="button"
            className={`px-4 py-2 rounded-md ${bandwidth === bw ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setBandwidth(bw)}
          >
            {bw}
          </button>
        ))}
      </div>
      
      <h2 className="text-lg font-semibold mb-4 text-blue-600">Contract Term</h2>
      <div className="flex gap-4 mb-4">
        {["12 Months", "24 Months", "36 Months", "48 Months", "60 Months"].map((term) => (
          <button
            key={term}
            type="button"
            className={`px-4 py-2 rounded-md ${contractTerm === term ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setContractTerm(term)}
          >
            {term}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button type="button" className="text-blue-600">Reset</button>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">Next</button>
      </div>
    </div>
  );
};

export default PlaceOrder;
