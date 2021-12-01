export default {
	/**
	 * Set a cookie in brwoser
	 * @param {String} name - Cookie name 
	 * @param {Sring} value - Cookie value 
	 * @param {Number} expirationMinutes 
	 */
	set: (name, value, expirationMinutes) => {
		var expireTime = expirationMinutes * 60;
		document.cookie = `${name}=${value};max-age=${expireTime}';path=/;secure`;
	},

	/**
	 * Get cookie value by name
	 * @param {String} name - Cookie name 
	 * @returns {String} Cookie value 
	 */
	get: name => {
		let cookie = {};
		document.cookie.split(';').forEach(function(el) {
			let [key,value] = el.split('=');
			cookie[key.trim()] = value;
		})
		return cookie[name];
	},

	/**
	 * Removes the cookie from the browser
	 * @param {String} name - Cookie name 
	 */
	remove: name => {
		document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}