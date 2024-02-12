import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const saveLocation = async (location) => {
	await axios.post(`${BASE_URL}/locations`, location);
};

export const calculateRoute = async () => {
	const response = await axios.get(`${BASE_URL}/routes/calculate`);
	return response.data;
};
