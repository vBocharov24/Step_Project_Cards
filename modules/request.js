import Cookies from './Cookies.js';

const BASE_URL ="https://ajax.test-danit.com/api/v2";
// const token = "3635d84e-1128-4a99-9651-3bd5bb74f626"; // '3635d84e-1128-4a99-9651-3bd5bb74f626'; // a3a8260f-7ba5-4cb2-9c25-c4e532982d51

/**
 * Request class for creating an object API for using REST requests
 */
export default {
	// Creates a new visit in database
	creatPost: post => {
		let token = Cookies.get('token');
		return fetch( BASE_URL + "/cards", {
				method: 'POST',
				headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify(post)
			}).then(response => response.json()).then((data) => {
				return data;
			});
	},

	// Gets all visits from database
	getPosts: () => {
		let token = Cookies.get('token');
		return axios({
			method: "get",
			url: BASE_URL + "/cards",
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			}
		}).then(({data}) => {
			return data
		});
	},

	// Gets visit by ID from the database
	getPost: id => {
		let token = Cookies.get('token');
		return axios({
			method: "GET",
			url: BASE_URL + '/cards/' + id,
			headers: {
				"Content-Type": "application/json",
				'Authorization': `Bearer ${token}`
			}
		}).then(({data}) => {
			return data
		});
	},

	// Removes visit by ID in database
	deletePost: id => {
		let token = Cookies.get('token');
		return axios(BASE_URL + '/cards/' + id, {
			method: 'DELETE',
			headers: {
					'Authorization': `Bearer ${token}`
			},
		}).catch(e=>{});
	},

	// Updates visit by ID in database
	editCard: (id, data) => {
		let token =  Cookies.get('token');
		return axios(BASE_URL + '/cards/' + id, {
			method: 'PUT',
			headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
			},
			data: JSON.stringify(data)
		}).then(({data}) => {
			return data;
		});
	},

	// Get token authentication
	login: (email, password) => {
		return axios(BASE_URL + "/cards/login", {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			data: { email: email, password: password }
		}).then((response) => {
				let responseObj = {
					status: response.status,
					data: response.data
				}

				return responseObj;
		}).catch((error) => {
			let responseObj = {
				error: true,
				status: error.response.status,
				data: error.response.data
			}

			return responseObj;
		});
	}
}