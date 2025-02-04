import { useState } from "react";
import { toast } from "react-toastify";
import Papa from "papaparse";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BulkuploadData = () => {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setFileName(file.name);
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target.result;
        const parsed = Papa.parse(text, { header: true });
        setCsvData(parsed.data);
      };
      reader.readAsText(file);
    } else {
      setFileName("No file chosen");
      setSelectedFile(null);
      setCsvData([]);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("🚨 Please select a file before submitting!", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/api/officedata/upload/csv", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("✅ File uploaded successfully!", {
          position: "top-right",
          autoClose: 3000,
        });

        setFileName("No file chosen");
        setSelectedFile(null);
        setCsvData([]);
      } else {
        throw new Error(result.message || "File upload failed");
      }
    } catch (error) {
      toast.error(`❌ Error: ${error.message || "Submission failed!"}`, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white max-w-4xl mx-auto mt-10 p-8 rounded-xl shadow-lg border border-gray-200"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Upload CSV File - Bulk Upload Dashboard
        </h2>

        <div className="flex flex-col gap-4">
          <label htmlFor="csv-file" className="text-gray-600 text-sm font-medium flex items-center">
            Upload CSV File
          </label>

          <input
            type="file"
            id="csv-file"
            accept=".csv"
            required
            onChange={handleFileChange}
            className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          <p className="text-sm text-gray-600">{fileName}</p>
        </div>

        {csvData.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">CSV Preview:</h3>
            <div className="w-full overflow-auto border rounded-lg shadow">
              <table className="min-w-full bg-white border border-gray-300 text-sm rounded-lg">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    {Object.keys(csvData[0]).map((key) => (
                      <th key={key} className="border px-4 py-2">{key}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.slice(0, 10).map((row, index) => (
                    <tr key={index} className="border-t">
                      {Object.values(row).map((value, i) => (
                        <td key={i} className="border px-4 py-2">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-500 mt-2">Showing first 10 rows...</p>
          </div>
        )}

        <div className="mt-6 flex gap-4">
          <Link to="/office-form" className="font-medium text-h2net-blue hover:text-blue-500">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-3 px-6 bg-green-600 text-white rounded-lg transition-all duration-300 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Manual Upload
            </motion.button>
          </Link>
        </div>

        {/* Submit Button with Click Handler */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={handleFileUpload}
          className="w-full mt-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Submit
        </motion.button>
      </motion.div>
    </div>
  );
};

export default BulkuploadData;
