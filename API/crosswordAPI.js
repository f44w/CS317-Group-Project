const BASE_URL = "https://api.cxlstxn.com/mini";

export const getRandomCrossword = async () => {

	const response = await fetch(BASE_URL); // make HTTP request to mini crossword API 

	const data = await response.json(); // convert repsonse to JSON

	if (!response.ok) {
        throw new Error("Failed to fetch crossword");
	}

	return data;
};

export const getCrosswordFromID = async (id) => {

	const URL = `${BASE_URL}` +
				`?id=${id}` ;

	const response = await fetch(URL); // make HTTP request to mini crossword API 

	const data = await response.json(); // convert repsonse to JSON

	if (!response.ok) {
        throw new Error("Failed to fetch crossword");
	}

	return data;
};
