import axios from 'axios';

export default axios.create({
	baseURL: `${process.env.REACT_APP_PROXY}api/v2/`,
	headers: {
		'x-api-key': process.env.REACT_APP_API_KEY_DEV,
		'Content-type': 'application/json'
	}
});
