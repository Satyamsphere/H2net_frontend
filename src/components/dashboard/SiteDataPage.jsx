import React, { useEffect, useState } from "react";
import axios from "axios";

const SiteDataPage = () => {
  const [siteData, setSiteData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/officedata/sitedata");
        setSiteData(response.data.data); // Extracting `data` array from response
        setLoading(false);
      } catch (error) {
        console.error("Error fetching site data:", error);
        setError("Failed to fetch site data");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Site Data</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Site Name</th>
            <th className="border p-2">Site ID</th>
            <th className="border p-2">Room Name</th>
            <th className="border p-2">Building</th>
            <th className="border p-2">Street</th>
            <th className="border p-2">City</th>
            <th className="border p-2">Zipcode</th>
            <th className="border p-2">Country</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
  {siteData.map((site, index) => (
    <tr key={site._id || index} className="text-center border-b">
      <td className="border p-2">{site.OfficeName}</td>
      <td className="border p-2">{site.Sitename}</td>
      <td className="border p-2">{site.SiteID}</td>
      <td className="border p-2">{site.RoomName}</td>
      <td className="border p-2">{site.BuildingName}</td>
      <td className="border p-2">{site.Street}</td>
      <td className="border p-2">{site.City}</td>
      <td className="border p-2">{site.Zipcode}</td>
      <td className="border p-2">{site.Country}</td>
      <td className="border p-2 font-bold text-white">
        <span className={site.SiteStatus ? "" : ""}>
          {site.SiteStatus ? "✅" : "❌"}
        </span>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default SiteDataPage;
