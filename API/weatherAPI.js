const BASE_URL = "https://api.openweathermap.org/data/2.5/weather" 

// get weather data using device lat and lon coords
export const getWeatherByCoords = async (lat, lon) => {

	// Build request URL
	const URL = 
		`${BASE_URL}` + 
    	`?lat=${lat}` +
    	`&lon=${lon}` + 
    	`&appid=${API_KEY}` + 
    	`&units=metric`;

	const response = await fetch(URL); // make HTTP request to OpenWeather

	const data = await response.json(); // convert response to JSON
	
	if (!response.ok) {

		const msg = data?.message || `HTTP ${response.status}`; // use OpenWeathers msg if there else status code

		throw new Error(msg);
	}

	return {
    	temperature: Number(data.main.temp).toFixed(1), // round 1 decimal place e.g. 7.3
    	description: data.weather[0].description || "unknown", // string e.g. mist
  	};
};

