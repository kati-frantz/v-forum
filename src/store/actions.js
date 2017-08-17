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
		axios.post(`${CONFIG.API_URL}/threads/${payload.threadId}/replies`, {
			reply: payload.reply 
		}).then(resp => {
			console.log(resp)
		})

	}
}