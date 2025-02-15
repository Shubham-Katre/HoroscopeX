import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { submitUserData } from "../apis/HomeApi";

export default function Home() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null); // Use Date object
  const [hours, setHours] = useState("0");
  const [minutes, setMinutes] = useState("0");
  const [seconds, setSeconds] = useState("0");
  const [timezone, setTimezone] = useState("");
  const [observation_point, setObservation_point] = useState("topocentric");
  const [ayanamsha, setAyanamsha] = useState("lahiri");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const cityData = {
    Mumbai: { latitude: "19.0760", longitude: "72.8777" },
    Delhi: { latitude: "28.7041", longitude: "77.1025" },
    Kolkata: { latitude: "22.5726", longitude: "88.3639" },
    Chennai: { latitude: "13.0827", longitude: "80.2707" },
    NewYork: { latitude: "40.7128", longitude: "-74.0060" },
    London: { latitude: "51.5074", longitude: "-0.1278" },
  };

  const handleCityChange = (selectedCity) => {
    setCity(selectedCity);
    if (cityData[selectedCity]) {
      setLatitude(cityData[selectedCity].latitude);
      setLongitude(cityData[selectedCity].longitude);
    } else {
      setLatitude("");
      setLongitude("");
    }
  };

  const handleSubmit = async () => {
    if (
      !name ||
      !latitude ||
      !longitude ||
      !city ||
      !selectedDate ||
      !hours ||
      !minutes ||
      !seconds ||
      !timezone ||
      !observation_point ||
      !ayanamsha
    ) {
      alert("Please fill in all fields!");
      return;
    }

    const payload = {
      year: selectedDate.getFullYear(),
      month: selectedDate.getMonth() + 1, // Months are 0-indexed
      date: selectedDate.getDate(),
      hours: parseInt(hours, 10),
      minutes: parseInt(minutes, 10),
      seconds: parseInt(seconds, 10),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      timezone: parseFloat(timezone),
      settings: {
        observation_point,
        ayanamsha,
      },
    };

    setLoading(true);
    setError("");

    try {
      const responseData = await submitUserData(payload);
      console.log(responseData);
      navigate("/about", { state: { response: responseData } });
    } catch (err) {
      console.error("API error:", err);
      setError("Error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  // Helper function to generate options for a given range
  const generateOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(i < 10 ? `0${i}` : i.toString());
    }
    return options;
  };

  return (
    <div className="container my-5 p-4 w-50 shadow rounded bg-light">
      <h2 className="text-center text-secondary mb-4">Details Form</h2>
      <form>
        {/* Name Field */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name:
          </label>
          <input
            id="name"
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* City Selector */}
        <div className="mb-3">
          <label htmlFor="city" className="form-label">
            City:
          </label>
          <select
            id="city"
            className="form-select"
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="">Select City</option>
            {Object.keys(cityData).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Latitude (Read-Only) */}
        <div className="mb-3">
          <label htmlFor="latitude" className="form-label">
            Latitude:
          </label>
          <input
            id="latitude"
            type="text"
            className="form-control"
            value={latitude}
            readOnly
          />
        </div>

        {/* Longitude (Read-Only) */}
        <div className="mb-3">
          <label htmlFor="longitude" className="form-label">
            Longitude:
          </label>
          <input
            id="longitude"
            type="text"
            className="form-control"
            value={longitude}
            readOnly
          />
        </div>

        {/* Timezone Field */}
        <div className="mb-3">
          <label htmlFor="timezone" className="form-label">
            Timezone:
          </label>
          <input
            id="timezone"
            type="text"
            className="form-control"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
          />
        </div>

        {/* Date Picker */}
        <div className="mb-3">
          <label htmlFor="date-picker" className="form-label">
            Select Date:
          </label>
          <DatePicker
            id="date-picker"
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            placeholderText="Select a date"
          />
        </div>

        {/* Time Selectors */}
        <div className="mb-3 d-flex justify-content-between">
          <div className="w-30">
            <label htmlFor="hours" className="form-label">
              Hours:
            </label>
            <select
              id="hours"
              className="form-select"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            >
              {generateOptions(0, 23).map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </select>
          </div>

          <div className="w-30">
            <label htmlFor="minutes" className="form-label">
              Minutes:
            </label>
            <select
              id="minutes"
              className="form-select"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
            >
              {generateOptions(0, 59).map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </select>
          </div>

          <div className="w-30">
            <label htmlFor="seconds" className="form-label">
              Seconds:
            </label>
            <select
              id="seconds"
              className="form-select"
              value={seconds}
              onChange={(e) => setSeconds(e.target.value)}
            >
              {generateOptions(0, 59).map((second) => (
                <option key={second} value={second}>
                  {second}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-success w-100"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
