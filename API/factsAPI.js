
const BASE_URL = "https://api.api-ninjas.com/v1/facts";

export const getRandomFact = async () => {
	const response = await fetch(BASE_URL, {
		headers: {
			"X-Api-Key": API_KEY,
		},
	});

	const data = await response.json();
    if (!response.ok) {
		throw new Error("Failed to fetch fact");
	}

	return data[0].fact;
};
