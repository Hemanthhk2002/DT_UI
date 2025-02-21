import React, { useState, useCallback } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import apiClient from "../apiClient";

const containerStyle = { width: "100%", height: "100%" };

type Coordinates = {
  lat: number;
  lng: number;
};

type PlaceOption = {
  label: string;
  value: string;
};

type LocationState = {
  address: PlaceOption | null;
  coordinates: Coordinates | null;
};

interface MapPlotProps {
  mapsApi: string;
}
// const tripCreateUrl = import.meta.env.VITE_TRIP_CREATE_API_URL;
const MapPlot: React.FC<MapPlotProps> = ({ mapsApi }) => {
  const [origin, setOrigin] = useState<LocationState>({
    address: null,
    coordinates: null,
  });
  const [destination, setDestination] = useState<LocationState>({
    address: null,
    coordinates: null,
  });
  // const [directions, setDirections] =
  //   useState<google.maps.DirectionsResult | null>(null);
  const [showMap, setShowMap] = useState(false); // State to control map visibility
  const [directions, setDirections] = useState<
    google.maps.DirectionsResult | undefined
  >(undefined);

  const [tripId, setTripId] = useState("");
  const [lrNumber, setLrNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [trackingMode, setTrackingMode] = useState("");
  const [teleOperator, setTeleOperator] = useState("");
  const [driverNumber, setDriverNumber] = useState("");
  const [driverName, setDriverName] = useState("");
  const [createdAt, setCreatedAt] = useState<Date | null>(new Date());
  const [eta, setEta] = useState<Date | null>(new Date());
  const [tatDays, setTatDays] = useState("");
  const [status, setStatus] = useState("");
  const [branch, setBranch] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: mapsApi,
    libraries: ["places"],
  });

  const handleSelect = async (
    place: PlaceOption | null,
    setter: React.Dispatch<React.SetStateAction<LocationState>>
  ) => {
    if (!place) return;
    try {
      const results = await geocodeByAddress(place.label);
      const latLng = await getLatLng(results[0]);
      setter({
        address: place,
        coordinates: { lat: latLng.lat, lng: latLng.lng },
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  const handleSubmit = async () => {
    const tripData = {
      name: tripId,
      lr_number: lrNumber || null,
      vehicle_number: vehicleNumber || null,
      tracking_mode: trackingMode || null,
      tel_operator: teleOperator || null,
      driver_number: driverNumber || null,
      driver_name: driverName || null,
      created_at: createdAt || null,
      eta: eta || null,
      tat_days: tatDays || null,
      status: status || null,
      branch: branch || null,
      vehicle_type: vehicleType || null,
      origin: origin.address ? origin.address.label : "",
      destination_name: destination.address ? destination.address.label : "",
      extra_status: "",
      origin_name: origin.address ? origin.address.label : "",
      last_update: "",
    };

    try {
    const response = await apiClient.post('/trip/create', tripData);
    console.log("API Response:", response); 
    alert("Trip saved successfully! 🚀");
  } catch (error) {
    console.error("Error submitting trip:", error);
    alert("Error submitting trip. Check console for details.");
  }
};

  const fetchDirections = useCallback(() => {
    if (origin.coordinates && destination.coordinates) {
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: new google.maps.LatLng(
            origin.coordinates.lat,
            origin.coordinates.lng
          ),
          destination: new google.maps.LatLng(
            destination.coordinates.lat,
            destination.coordinates.lng
          ),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result); // Set directions only if the result is valid
            setShowMap(true); // Show the map after directions are fetched
          } else {
            console.error(`Error fetching directions: ${status}`);
            setDirections(undefined); // Reset directions in case of error
          }
        }
      );
    }
  }, [origin, destination]);

  return (
    <div className="h-screen bg-gray-100">
      <div className="p-6 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Trip Details
        </h2>

        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Trip ID"
            value={tripId}
            onChange={(e) => setTripId(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          />
          <input
            type="text"
            placeholder="LR Number"
            value={lrNumber}
            onChange={(e) => setLrNumber(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          />
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          />

          {/* Vehicle Type Dropdown */}
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Container Truck">Container Truck</option>
            <option value="Flatbed Truck">Flatbed Truck</option>
            <option value="Refrigerated Truck">Refrigerated Truck</option>
            <option value="Tanker Truck">Tanker Truck</option>
            <option value="Curtain Side Truck">Curtain Side Truck</option>
          </select>

          <input
            type="text"
            placeholder="Tracking Mode"
            value={trackingMode}
            onChange={(e) => setTrackingMode(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          />
          <input
            type="text"
            placeholder="TeleOperator"
            value={teleOperator}
            onChange={(e) => setTeleOperator(e.target.value)}
            className="p-3 border rounded-lg shadow-sm"
          />
        </div>
      </div>

      {/* Second Section - Left Fields & Map View */}
      <div className="flex h-auto">
        {/* Left Panel - Form (2/3 width) */}
        <div className="w-2/3 p-6 bg-white shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Trip Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <PlacesAutocomplete
              selectProps={{
                value: origin.address,
                onChange: (place) =>
                  handleSelect(place as PlaceOption, setOrigin),
                placeholder: "Origin",
                className: "w-full p-3 border rounded-lg shadow-sm",
              }}
            />
            <PlacesAutocomplete
              selectProps={{
                value: destination.address,
                onChange: (place) =>
                  handleSelect(place as PlaceOption, setDestination),
                placeholder: "Destination",
                className: "w-full p-3 border rounded-lg shadow-sm",
              }}
            />
            <input
              type="text"
              placeholder="Driver Number"
              value={driverNumber}
              onChange={(e) => setDriverNumber(e.target.value)}
              className="p-3 border rounded-lg shadow-sm"
            />
            <input
              type="text"
              placeholder="Driver Name (Optional)"
              value={driverName}
              onChange={(e) => setDriverName(e.target.value)}
              className="p-3 border rounded-lg shadow-sm"
            />

            {/* Created At & ETA with Date & Time Picker */}
            <DateTimePicker
              onChange={setCreatedAt}
              value={createdAt}
              className="p-3 border rounded-lg shadow-sm"
            />

            <DateTimePicker
              onChange={setEta}
              value={eta}
              className="p-3 border rounded-lg shadow-sm"
            />

            <input
              type="text"
              placeholder="TAT Days"
              value={tatDays}
              onChange={(e) => setTatDays(e.target.value)}
              className="p-3 border rounded-lg shadow-sm"
            />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-3 border rounded-lg shadow-sm"
            >
              <option value="">Select Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Enroute to Destination">Enroute to Destination</option>
              <option value="Driver Consent Pending">Driver Consent Pending</option>
            </select>

            <input
              type="text"
              placeholder="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="p-3 border rounded-lg shadow-sm col-span-2"
            />
          </div>

          <button
            onClick={fetchDirections}
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          >
            Get Directions
          </button>

          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
          >
            Submit Trip
          </button>
        </div>

        {/* Right Panel - Map View (1/3 width) */}
        <div className="w-1/3 h-auto">
          {!showMap ? (
            <div className="h-full flex items-center justify-center text-gray-600 text-lg font-semibold animate-fadeIn">
              <p>
                Select locations and click "Get Directions" to view the map.
              </p>
            </div>
          ) : (
            isLoaded &&
            origin.coordinates &&
            destination.coordinates && (
              <GoogleMap
                mapContainerStyle={containerStyle}
                zoom={6}
                center={origin.coordinates}
              >
                {showMap && directions && (
                  <>
                    <Marker position={origin.coordinates} />
                    <Marker position={destination.coordinates} />
                    <DirectionsRenderer directions={directions} />
                  </>
                )}
              </GoogleMap>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MapPlot;
