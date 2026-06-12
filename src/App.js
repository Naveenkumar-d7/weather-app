import { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = '409c2174ec1cf9178455cb598bbbf4e9';

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError('City not found!');
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch {
      setError('Something went wrong!');
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🌤️ Weather App</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading && <p className="msg">Loading...</p>}
      {error && <p className="msg error">{error}</p>}

      {weather && (
        <div className="card">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="date">{new Date().toDateString()}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="icon"
          />
          <h3>{Math.round(weather.main.temp)}°C</h3>
          <p className="desc">{weather.weather[0].description}</p>
          <div className="details">
            <div className="detail-item">
              <div className="label">Humidity</div>
              <div className="value">💧 {weather.main.humidity}%</div>
            </div>
            <div className="detail-item">
              <div className="label">Wind</div>
              <div className="value">🌬️ {weather.wind.speed} m/s</div>
            </div>
            <div className="detail-item">
              <div className="label">Feels Like</div>
              <div className="value">🌡️ {Math.round(weather.main.feels_like)}°C</div>
            </div>
            <div className="detail-item">
              <div className="label">Pressure</div>
              <div className="value">🔵 {weather.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;