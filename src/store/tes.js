import {
	getDataTes,
	getDataTesByHari,
	postDataTes,
	deleteDataTes,
	putDataTes,
	postMulaiTes,
	postAkhiriTes
} from '@/config/tes'

const dataTes = {
	namespaced: true,

	state: {
		dataTes: [],
		status: null,
		isLoading: false,
		isLoadingToken: false,
		dataToken: []
	},

	mutations: {
		updateDataTes(state, payload) {
			state.dataTes = payload
		},
		updateDataToken(state, payload) {			
			state.dataToken = payload
		},
		updateStatus(state, payload) {
			state.status = payload
		},
		updateIsLoading(state, payload) {
			state.isLoading = payload
		},
		updateIsLoadingToken(state, payload) {
			state.isLoadingToken = payload
		}
	},

	// getters: {
	// 	getDataTes: state => state.dataTes
	// },

	actions: {
		updateIsLoading(context, payload) {
			context.commit('updateIsLoading', payload)
		},

		updateIsLoadingToken(context, payload) {
			context.commit('updateIsLoadingToken', payload)
		},

		getDataTes (context) {
			getDataTes ()
				.then(res => {
					if (res.status === 200) {
						// const dataTes = JSON.parse(window.localStorage.getItem('dataTes'))
						// if (dataTes === undefined) {
						// 	context.commit('updateDataTes', dataTes)							
						// } else {
						// 	context.commit('updateDataTes', res.data.data)
						// }
						context.commit('updateDataTes', res.data.data)
						context.dispatch('updateIsLoading', false)
					}
				})
		},

		getDataTesByHari (context, payload) {
			getDataTesByHari (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataTes', res.data.data)
						context.dispatch('updateIsLoading', false)						
					}
				})
		},

		postDataTes (context, payload) {
			postDataTes (payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataTes')
						context.commit('updateStatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateStatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		putDataTes (context, payload) {
			putDataTes (payload.id, payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataTes')
						context.commit('updateStatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateStatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		deleteDataTes (context, payload) {
			deleteDataTes (payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataTes')
						context.commit('updateStatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateStatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		postMulaiTes (context, payload) {
			postMulaiTes (payload)
				.then(res => {
					if (res.status === 200) {						
						context.dispatch('getDataTes')						
						context.commit('updateStatus', true)						
						context.dispatch('updateIsLoadingToken', false)
					}
				})
				.catch(() => {
					context.commit('updateStatus', false)
					context.dispatch('updateIsLoadingToken', false)
				})
		},

		postAkhiriTes (context, payload) {
			postAkhiriTes (payload)
				.then(res => {
					if (res.status === 200) {						
						context.dispatch('getDataTes')						
						context.commit('updateStatus', true)						
						context.dispatch('updateIsLoadingToken', false)
					}
				})
				.catch(() => {
					context.commit('updateStatus', false)
					context.dispatch('updateIsLoadingToken', false)
				})
		}
	}
}

export default dataTes
