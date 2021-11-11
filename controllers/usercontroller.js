
module.exports = {

	get: (params) => {
		return new Promise((resolve, reject) => {
			posts.find(params)
			.then(data => {
				resolve(data)
			})
			.catch(err => {
				reject(err)
			})
		})
	},

	getById: (id) => {
		return new Promise((resolve, reject) => {
			posts.findById(id)
			.then(data => {
				resolve(data)
			})
			.catch(err => {
			})
		})
	},

	post: (params) => {
		return new Promise((resolve, reject) => {
			// hash PW
			posts.create(params)
			.then(data => {
				resolve(data)
			})
			.catch(err => {
				reject(err)
			})
		})
	},

	put: (id, params) => {
		return new Promise((resolve, reject) => {
			posts.findByIdAndUpdate(id, params, {new:true})
			.then(data => {
				resolve(data)
			})
			.catch(err => {
				reject(err)
			})
		})
	},

	delete: (id) => {
		return new Promise((resolve, reject) => {
			posts.findByIdAndRemove(id)
			.then(() => {
				resolve({id: id})
			})
			.catch(err => {
				reject(err)
			})
		})
	}
}










