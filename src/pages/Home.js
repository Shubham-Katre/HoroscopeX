import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitUserData } from "../apis/HomeApi";

export default function Home() {
  const [name, setName] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [city, setCity] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
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
      !year ||
      !month ||
      !date ||
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
      year: parseInt(year, 10),
      month: parseInt(month, 10),
      date: parseInt(date, 10),
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

  const getOptions = (start, end) => {
    let options = [];
    for (let i = start; i <= end; i++) {
      options.push(i);
    }
    return options;
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  const years = getOptions(1900, new Date().getFullYear());
  const months = getOptions(1, 12);
  const hoursOptions = getOptions(0, 23);
  const minutesAndSeconds = getOptions(0, 59);
  const days = month && year ? getOptions(1, getDaysInMonth(month, year)) : [];

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

        {/* Latitude Field (Read-Only) */}
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

        {/* Longitude Field (Read-Only) */}
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

        {/* Date and Time Fields */}
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year:
          </label>
          <select
            id="year"
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="month" className="form-label">
            Month:
          </label>
          <select
            id="month"
            className="form-select"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date:
          </label>
          <select
            id="date"
            className="form-select"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          >
            <option value="">Select Date</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="hours" className="form-label">
            Hours:
          </label>
          <select
            id="hours"
            className="form-select"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          >
            <option value="">Select Hours</option>
            {hoursOptions.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="minutes" className="form-label">
            Minutes:
          </label>
          <select
            id="minutes"
            className="form-select"
            value={minutes}
            onChange={(e) => setMinutes(e.target.value)}
          >
            <option value="">Select Minutes</option>
            {minutesAndSeconds.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="seconds" className="form-label">
            Seconds:
          </label>
          <select
            id="seconds"
            className="form-select"
            value={seconds}
            onChange={(e) => setSeconds(e.target.value)}
          >
            <option value="">Select Seconds</option>
            {minutesAndSeconds.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
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
