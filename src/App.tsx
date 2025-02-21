import { useState } from "react";
import { TableFromAPIMultiple } from "@hemanthhk/eshipz-table-library";
import MapPlot from "./components/mapPlot"; // Update the path as necessary

function App() {
  const [showTable, setShowTable] = useState(false);
  const [showMapPlot, setShowMapPlot] = useState(false);
  const apiUrl = "https://dt-api-226g.onrender.com/api/v1/table-data";
  const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 to-purple-700 p-3">
      <div className="min-h-screen w-full px-4 flex flex-col">
        {/* Hero Section */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
          <p className="text-4xl text-gray-200 mb-6">
            Data visualization with our interactive table component
          </p>
          <button
            onClick={() => setShowTable(!showTable)}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold 
                     shadow-lg hover:shadow-xl transition-all duration-300 
                     hover:bg-gray-100 mb-8"
          >
            {showTable ? "Hide Table" : "Show Table"}
          </button>
          <button
            onClick={() => {
              console.log("Create Trip button clicked");
              console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
              setShowMapPlot(true);
            }}
            className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold 
           shadow-lg hover:shadow-xl transition-all duration-300 
           hover:bg-gray-100 mb-8"
          >
            Create Trip
          </button>
        </div>

        {/* Table Section */}
        <div
          className={`flex-1 transition-all duration-500 ${
            showTable ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-full w-full bg-gray-50 rounded-lg shadow-xl">
            {showTable && <TableFromAPIMultiple apiUrl={apiUrl} />}
          </div>
        </div>

        {/* Map Plot Section */}
        {showMapPlot && <MapPlot mapsApi={GOOGLE_MAPS_API_KEY} />}
      </div>
    </div>
  );
}

export default App;
