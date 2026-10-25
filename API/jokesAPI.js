
export const getRandomJoke = async () => {

	// Build request URL
	const URL = "https://official-joke-api.appspot.com/random_joke";

	const response = await fetch(URL); // make HTTP request to joke API 

	const data = await response.json(); // convert repsonse to JSON
	
	if (!response.ok) {
        throw new Error("Failed to fetch joke");
	}

	return data;
};
