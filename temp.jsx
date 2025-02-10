
 const [formData, setFormData] = useState({
    CustomerName: "",
    Sitename: "",
    SiteID: "",
    RoomName: "",
    BuildingName: "",
    StreetNumber: "",
    StreetName: "",
    City: "",
    Zipcode: "",
    Country: "",
    Galk: "",
    PortAccessSpeed: "",
    ContractTerm: "",
    Bandwidth: "",
    AccessProviders: "",
    Ipv4Subnet: "",
   
  });

  const [errors, setErrors] = useState({});

  const getBandwidthOptions = (portSpeed) => {
    let min, max, unit;
  
    switch (portSpeed) {
      case "100 Mbps":
        min = 10;
        max = 100;
        unit = "Mbps";
        break;
      case "1 Gbps":
        min = 100;
        max = 1000;
        unit = "Mbps";
        break;
      case "10 Gbps":
        min = 1;
        max = 10;
        unit = "Gbps";
        break;
      case "100 Gbps":
        min = 10;
        max = 100;
        unit = "Gbps";
        break;
      default:
        return [];
    }
  
    return Array.from({ length: 10 }, (_, i) => {
      const value = min + (i * (max - min)) / 9; // Distribute values evenly
      return `${value} ${unit}`;
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
console.log("form", formData)



    // Validate required fields
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer Name is required";
    }
    if (!formData.postCode.trim()) {
      newErrors.postCode = "Post Code is required";
    }
  
    // Validate at least one access provider is selected
    const hasSelectedProvider = Object.values(formData.accessProviders).some(
      (value) => value
    );
    if (!hasSelectedProvider) {
      newErrors.accessProviders = "Please select at least 1 item.";
    }
  
    setErrors(newErrors);
  
    // If validation fails, stop form submission
    if (Object.keys(newErrors).length > 0) {
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:5000/api/quotes/diaquotes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
  
      const result = await response.json();
      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
  
        // Reset form data
        setFormData({
          CustomerName: "",
          Sitename: "",
          SiteID: "",
          RoomName: "",
          BuildingName: "",
          StreetNumber: "",
          StreetName: "",
          City: "",
          Zipcode: "",
          Country: "",
          Galk: "",
          PortAccessSpeed: "",
          ContractTerm: "",
          Bandwidth: "",
          AccessProviders: {},
          Ipv4Subnet: "",
          //accessProviders: {}, // Reset access providers properly
        });
  
        console.log("Form submitted:", result);
      } else {
        toast.error(`❌ Error: ${result.message || "Submission failed!"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  




  


  const portSpeedOptions = ["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"];
  const contractTermOptions = [
    "12 Months",
    "24 Months",
    "36 Months",
    "48 Months",
    "60 Months",
  ];
  const bandwidthOptions = getBandwidthOptions(formData.portSpeed);
  const ipv4SubnetSizes = ["WAN IP Only","/30", "/29", "/28", "/27", "/26"];

  const handlePortSpeedChange = (speed) => {
    setFormData((prevData) => {
      const newBandwidthOptions = getBandwidthOptions(speed);
      const newBandwidth = newBandwidthOptions[0] || ""; // Select first available bandwidth
  
      return {
        ...prevData,
        PortAccessSpeed: speed,
        Bandwidth: newBandwidth, // Auto-select first option
      };
    });
  };

  const isRipePolicyRequired = ["/28", "/27", "/26"].includes(
    formData.ipv4SubnetSize
  );




  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
  
    console.log("Form Data:", formData);
  
    // Ensure all required fields exist before calling .trim()
    if (!formData.CustomerName || !formData.CustomerName.trim()) {
      newErrors.CustomerName = "Customer Name is required";
    }
    if (!formData.Zipcode || formData.Zipcode.toString().trim() === "") {
      newErrors.Zipcode = "Post Code is required";
    }
  
    // Validate at least one access provider is selected
    if (!formData.AccessProviders || formData.AccessProviders.length === 0) {
      newErrors.AccessProviders = "Please select at least 1 provider.";
    }
  
    setErrors(newErrors);
  
    // If validation fails, stop form submission
    if (Object.keys(newErrors).length > 0) {
      console.error("Validation Errors:", newErrors);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/quotes/diaquotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
      if (response.ok) {
        toast.success("✅ Data submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
  
        // Reset form data
        setFormData({
          CustomerName: "",
          Sitename: "",
          SiteID: "",
          RoomName: "",
          BuildingName: "",
          StreetNumber: "",
          StreetName: "",
          City: "",
          Zipcode: "",
          Country: "",
          Galk: "",
          PortAccessSpeed: "",
          ContractTerm: "",
          Bandwidth: "",
          AccessProviders: [], // Ensure it's reset properly as an array
          Ipv4Subnet: "",
        });
  
        console.log("Form submitted successfully:", result);
      } else {
        toast.error(`❌ Error: ${result.message || "Submission failed!"}`, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error("⚠️ Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  




































































const portSpeedOptions = ["100 Mbps", "1 Gbps", "10 Gbps", "100 Gbps"];

const getBandwidthOptions = (portSpeed) => {
  let min, max, unit;

  switch (portSpeed) {
    case "100 Mbps":
      min = 10;
      max = 100;
      unit = "Mbps";
      break;
    case "1 Gbps":
      min = 100;
      max = 1000;
      unit = "Mbps";
      break;
    case "10 Gbps":
      min = 1;
      max = 10;
      unit = "Gbps";
      break;
    case "100 Gbps":
      min = 10;
      max = 100;
      unit = "Gbps";
      break;
    default:
      return [];
  }

  return Array.from({ length: 10 }, (_, i) => {
    const value = min + (i * (max - min)) / 9; // Distribute values evenly
    return `${value} ${unit}`;
  });
};

const handlePortSpeedChange = (speed) => {
  setFormData((prevData) => {
    const newBandwidthOptions = getBandwidthOptions(speed);
    const newBandwidth = newBandwidthOptions[0] || ""; // Select first available bandwidth

    return {
      ...prevData,
      PortAccessSpeed: speed,
      Bandwidth: newBandwidth, // Auto-select first option
    };
  });
};

return (
  <div className="space-y-4">
    {/* Port or Access Speed Selection */}
    <div className="border rounded-lg p-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Port or Access Speed
      </label>
      <div className="flex space-x-1">
        {portSpeedOptions.map((speed) => (
          <button
            key={speed}
            type="button"
            className={`px-4 py-2 text-sm rounded-md border ${
              formData.PortAccessSpeed === speed
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => handlePortSpeedChange(speed)}
          >
            {speed}
          </button>
        ))}
      </div>
    </div>

    {/* Bandwidth Selection */}
    {formData.PortAccessSpeed && (
      <div className="border rounded-lg p-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Bandwidth
        </label>
        <div className="grid grid-cols-5 gap-1">
          {getBandwidthOptions(formData.PortAccessSpeed).map((bandwidth) => (
            <button
              key={bandwidth}
              type="button"
              className={`px-4 py-2 text-sm rounded-md border ${
                formData.Bandwidth === bandwidth
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() =>
                setFormData((prevData) => ({ ...prevData, Bandwidth: bandwidth }))
              }
            >
              {bandwidth}
            </button>
          ))}
        </div>
      </div>
    )}
  </div>
);
