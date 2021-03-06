import axios from 'axios'
import CONFIG from '@/config'

export default {
	getThreads(context, payload) {
		axios.get(`${CONFIG.API_URL}/threads?page=${payload.pageNumber}`)
				.then(resp => {
				 	context.commit('threads', { threads: resp.data.data.data })
				 	context.commit('threadsMetaData', { threadsMetaData: resp.data.data })
				})
	},
	getThreadReplies(context, payload) {
		axios.get(`${CONFIG.API_URL}/threads/${payload.thread_id}/replies?page=${payload.pageNumber}`)
				.then(resp => {
				 	context.commit('threadReplies', { replies: resp.data.data.data })
				 	context.commit('repliesMetaData', { repliesMetaData: resp.data.data })
				})
	},
	addReply(context, payload) {
		return new Promise((res, rej) => {
			axios.post(`${CONFIG.API_URL}/threads/${payload.threadId}/replies`, {
				body : payload.reply 
			}).then(resp => {
				return res(resp.data)
			})
		})
	},

	/* Authentication actions */
	register(context, payload) {
		return new Promise((resolve, reject) => {
			axios.post(`${CONFIG.API_URL}/register`, {
				name: payload.name,
				email: payload.email,
				password: payload.password 
			}).then(resp => {
				return resolve(resp.data)
			}).catch(error => {
				return reject(error.response.data)
			})
		})
	}
}