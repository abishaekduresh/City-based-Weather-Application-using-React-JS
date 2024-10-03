import { useEffect, useState } from 'react';
import './css/App.css';

// Components
import WeatherDetails from './component/WeatherDetails';

// Images
import searchIcon from './assets/search.png';
import sunIcon from './assets/sun.png';
import moonIcon from './assets/moon.png'
import cloudyIcon from './assets/cloudy.png';
import nightSkyIcon from './assets/nightClearSky.png';
import scatteredCloudsIcon from './assets/scatteredClouds.png';
import brokenCloudsIcon from './assets/brokenClouds.png'
import showerRainIcon from './assets/showerRain.png';
import rainyIcon from './assets/rainy.png';
import thunderstormIcon from './assets/thunderstorm.png';
import snowIcon from './assets/snow.png';
import mistIcon from './assets/mist.png';
import humidityIconImg from './assets/humidity.png';
import windIconImg from './assets/windy.png';

function App() {
  const [icon, setIcon] = useState(cloudyIcon);
  const [humidityIcon, setHumidityIcon] = useState(humidityIconImg);
  const [windIcon, setWindIcon] = useState(windIconImg);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("Chennai");
  const [country, setCountry] = useState("IN");
  const [lat, setLat] = useState("0");
  const [lon, setlon] = useState("0");
  const [humidity, setHumidity] = useState("0");
  const [wind, setWind] = useState("0");
  const [text, setText] = useState("Chennai");
  const [cityNotFound, setCityNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const wetherIconMap = {
    "01d": sunIcon,
    "01n": moonIcon,
    "02d": cloudyIcon,
    "02n": nightSkyIcon,
    "03d": scatteredCloudsIcon,
    "03n": scatteredCloudsIcon,
    "04d": brokenCloudsIcon,
    "04n": brokenCloudsIcon,
    "09d": showerRainIcon,
    "09n": showerRainIcon,
    "10d": rainyIcon,
    "10n": rainyIcon,
    "11d": thunderstormIcon,
    "11n": thunderstormIcon,
    "13d": snowIcon,
    "13n": snowIcon,
    "50d": mistIcon,
    "50n": mistIcon
  };

  const Search = async () => {

    setLoading(true);
    let api_key = "8df66a48b41d1f0c84772a770c36f784";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=metric`;

    try {
      let res = await fetch(url);
      let data = await res.json();

      if (data.cod === "404") {
        console.error("City not Found!");
        setCityNotFound(true);
        setLoading(false);
        return;
      }

      setHumidity(data.main.humidity);
      setWind(data.wind.speed);
      setTemp(Math.floor(data.main.temp));
      setCity(data.name);
      setCountry(data.sys.country);
      setLat(data.coord.lat);
      setlon(data.coord.lon);
      const weatherIconCode = data.weather[0].icon; // Fixed typo: 'wether' -> 'weather'
      setIcon(wetherIconMap[weatherIconCode] || cloudyIcon); // Use cloudyIcon as a default
      setCityNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error.message);
      setError("An error occurred while fetching weather data.");
    } finally {
      setLoading(false);
    }
  };

  const handleCity = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      Search();
    }
  };

  useEffect(() => {
    Search();
  }, []);

  return (
    <div className="container">
      <div className="input-container">
        <input
          type="text"
          className="cityInput"
          placeholder="Search city"
          onChange={handleCity}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <div className="search-icon">
          <img src={searchIcon} alt="Search Icon" />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        humidityIcon={humidityIcon}
        windIcon={windIcon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        lon={lon}
        humidity={humidity}
        wind={wind}
        error={error}
        loading={loading}
        cityNotFound={cityNotFound}
        text={text}
      />
    </div>
  );
}

export default App;
