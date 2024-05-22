import React, { useState } from 'react';
import './index.css' // Import your CSS module

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [unit, setUnit] = useState('metric');
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${unit}&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const handleSearch = () => {
    if (city) {
      fetchWeather(city);
    }
  };

  return (
    <div className="container">
      <div className="searchBar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="searchInput"
        />
        <select
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="searchSelect"
        >
          <option value="metric">Celsius</option>
          <option value="imperial">Fahrenheit</option>
        </select>
        <button onClick={handleSearch} className="searchButton">
          Search
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weatherInfo">
          <h1 className="weatherTitle">Weather in {weather.name}</h1>
          <p className="weatherDescription">{weather.weather?.[0]?.description}</p>
          <p className="weatherDescription">Temperature: {weather.main?.temp}°{unit === 'metric' ? 'C' : 'F'}</p>
          <p className="weatherDescription">Humidity: {weather.main?.humidity}%</p>
          <p className="weatherDescription">Wind Speed: {weather.wind?.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
