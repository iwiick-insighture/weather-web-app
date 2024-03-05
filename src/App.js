import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const WeatherInfo = ({ data }) => {
  if (!data) return null;

  const { main, weather, wind, name } = data;
  const temperature = main?.temp;
  const description = weather[0]?.description;
  const windSpeed = wind?.speed;

  return (
    <div className="Weather-info">
      <h3>{name}</h3>
      <p>
        {temperature}°C   |   {description}   |   Wind Speed: {windSpeed} m/s
      </p>
    </div>
  );
};

const App = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (process.env.REACT_APP_FORECAST_API) {
          const response = await axios.get(
            `${process.env.REACT_APP_FORECAST_API}`
          );
          setData(response.data);
        } else {
          console.log(
            `'REACT_APP_FORECAST_API' should be added to the .env file`
          );
        }
      } catch (error) {
        console.log("ERROR :: ", error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div className="Stack">
          <p className="Forecase-sub">{new Date().toDateString()}</p>
          <p className="Forecast-title">
            F <img src={logo} className="App-logo" alt="logo" />
            RECAST
          </p>
        </div>
        <WeatherInfo data={data} />
      </header>
    </div>
  );
};

export default App;
