const BASE_URL = "https://opentdb.com/api.php";
const SESSION_TOKEN_URL = "https://opentdb.com/api_token.php?command=request";

// often returns [] if no questions are available, if this happens we can iterate -1 until we get a response

const fetchSessionToken = async () => {
	const response = await fetch(SESSION_TOKEN_URL);	
	const data = await response.json();
	return data.token;
};

// num of questions, category of question type, easy/medium/hard
export const getRandomTrivia = async (amount, category, difficulty) => {
	
	const sessionToken = await fetchSessionToken();

	// Build request URL
	const URL = `${BASE_URL}` +
				`?amount=${amount}` +
				`&token=${sessionToken}` + // using token avoids getting duplicate results 
				`&category=${category}` +
				`&difficulty=${difficulty}` 
	;

	const response = await fetch(URL); // make HTTP request to opentbd

	const data = await response.json(); // convert repsonse to JSON

	if (!response.ok) {
        throw new Error("Failed to fetch Trivia Questions");
	}
	return data;
};

	

