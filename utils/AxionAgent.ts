import https from "https";

export const axiosAgent = new https.Agent({
	rejectUnauthorized: false
});