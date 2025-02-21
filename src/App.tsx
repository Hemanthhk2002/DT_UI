import { useState } from "react";
import { TableFromAPIMultiple } from "@hemanthhk/eshipz-table-library";
import MapPlot from "./components/mapPlot"; // Update the path as necessary

function App() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const apiUrl = import.meta.env.VITE_TRIP_LIST_API_URL;
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
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setActiveComponent("tripsList")}
              className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 
              ${
                activeComponent === "tripsList"
                  ? "bg-gray-100 text-indigo-600"
                  : "bg-white text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Trips List
            </button>
            <button
              onClick={() => setActiveComponent("createTrip")}
              className={`px-6 py-2 rounded-lg font-semibold shadow-lg transition-all duration-300 
              ${
                activeComponent === "createTrip"
                  ? "bg-gray-100 text-indigo-600"
                  : "bg-white text-indigo-600 hover:bg-gray-100"
              }`}
            >
              Create Trip
            </button>
          </div>
        </div>

        {/* Show the selected component */}
        <div className="flex-1 transition-all duration-500">
          {activeComponent === "tripsList" && (
            <div className="h-full w-full bg-gray-50 rounded-lg shadow-xl p-4">
              <TableFromAPIMultiple apiUrl={apiUrl} />
            </div>
          )}

          {activeComponent === "createTrip" && (
            <div className="h-full w-full bg-gray-50 rounded-lg shadow-xl p-4">
              <MapPlot mapsApi={GOOGLE_MAPS_API_KEY} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
