import React, { useEffect, useState } from "react";
import './App.css';
import Weather from './components/weather';

export default function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Get the user's location
    navigator.geolocation.getCurrentPosition(position => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    // Fetch data only when lat and long have values
    const fetchData = async () => {
      if (lat && long) {
        await fetch(`${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setData(result);
            console.log(result);
          })
          .catch(error => console.error('Error fetching data:', error));
      }
    };

    fetchData();
  }, [lat, long]);

  return (
    <div className="App">
      {(data && data.main) ? (
        <Weather weatherData={data} />
      ) : (
        <div>Loading weather data...</div>
      )}
    </div>
  );
}
