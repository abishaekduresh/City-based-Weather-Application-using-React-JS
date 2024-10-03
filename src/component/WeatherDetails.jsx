import {} from 'react'
import './../css/WeatherDetails.css'

const WetherDetails = ({icon, humidityIcon, windIcon, temp, city, country, lat, lon, humidity, wind, error, loading, cityNotFound, text}) => {
    return (
        <>
            {!loading && !cityNotFound && text.trim() !== '' && (
                <div className="weather-info">
                    <div className="image">
                        <img src={icon} alt="Weather Icon" />
                    </div>
                    <div className="temp">{temp}°C</div>
                    <div className="location">{city}</div>
                    <div className="country">{country}</div>
                    <div className="coordinates">
                        <div>
                            <span className="lat">Latitude: </span>
                            <span>{lat}</span>
                        </div>
                        <div>
                            <span className="lon">Longitude: </span>
                            <span>{lon}</span>
                        </div>
                    </div>
                    <div className="data-container">
                        <div className="element">
                            <img src={humidityIcon} alt="Humidity" className="icon" />
                            <div className="data">
                                <div className="humidity-percent">{humidity} %</div>
                                <div className="text">Humidity</div>
                            </div>
                        </div>
                        <div className="element">
                            <img src={windIcon} alt="Wind" className="icon" />
                            <div className="data">
                                <div className="wind-percent">{wind} km/h</div>
                                <div className="text">Windy</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {loading && <div className="loading-message">Loading...</div>}
            {error && <div className="error-message">{error}</div>}
            {cityNotFound && <div className="city-not-found">City Not Found!</div>}
            {text.trim() === '' && <div className="empty-text">Please enter city</div>} {/* Corrected condition */}
            <div className="copyright">
                Developed by <span>Abishaek Duresh</span>
            </div>
        </>
    );
};

export default WetherDetails;
