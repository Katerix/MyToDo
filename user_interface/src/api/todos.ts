import axios from "axios";

export default axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "true",
		"Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Methods": "PUT, POST, GET, DELETE, PATCH, OPTIONS"
    },
    baseURL: 'https://localhost:44361'
});
    
