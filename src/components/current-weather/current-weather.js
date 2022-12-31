import React from "react";
import "./current-weather.css";

const CurrentWeather = ({ data }) => {
  const hm = (timestamp) => {
    var h = new Date(timestamp).getHours();
    var m = new Date(timestamp).getMinutes();
    var output = pad(h) + ':' + pad(m);
    return output;
  }
  const pad = (val) => {
    return (val<10) ? '0' + val : val;
  }
  const [city, country] = data.city.split(", ");
  return (
    <div className="weather">
      <div className="top">
        <div className="location">
          <div className="citybg">
            <p className="city">{city}</p>
          </div>
          <p className="country">{country}</p>
        </div>
        <div className="condition">
          <img
            alt="weather"
            className="weather-icon"
            src={`icons/${data.weather[0].icon}.png`}
          />
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
      </div>
      <div className="bottom">
        <p className="temperature">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="parameter-row">
            <img
              src={`icons/sunrise.png`}
              alt="sunrise"
              className="weather-details-icon-big"
            />
            <span className="parameter-value">
              {hm(data.sys.sunrise * 1000)} hr
            </span>
          </div>
          <div className="parameter-row">
            <img
              src={`icons/sunset.png`}
              alt="sunset"
              className="weather-details-icon-big"
            />
            <span className="parameter-value">
              {hm(data.sys.sunset * 1000)} hr
            </span>
          </div>
          <div className="parameter-row">
            <img
              src={`icons/wind.png`}
              alt="wind"
              className="weather-details-icon"
            />
            <span className="parameter-value">{data.wind.speed} m/s</span>
          </div>
          <div className="parameter-row">
            {/* <span className="parameter-label">Humidity</span> */}
            <img
              src={`icons/humidity.png`}
              alt="humidity"
              className="weather-details-icon"
            />
            <span className="parameter-value">{data.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
