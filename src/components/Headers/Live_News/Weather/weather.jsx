import "./weather.css";

function WeatherData({ data }) {
    if (!data) return null;

    return (
        <div className="weather-container">
            <span id="city">{data.city}</span>
            <span id="temp">{data.temperature_C}°C</span>
            <span id="desc">{data.weatherType}</span>
            <img src={data.weatherIcon} alt={data.weatherType} className="weatherImg" />
        </div>
    );
}

export default WeatherData;
