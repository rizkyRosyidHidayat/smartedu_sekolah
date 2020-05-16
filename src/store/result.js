import {
	getDataResult,
	getDataResultFilter
} from '@/config/result'

const dataResult = {
	namespaced: true,

	state: {
		dataResult: [],
		status: null,
		isLoading: false
	},

	mutations: {
		updateDataResult(state, payload) {
			state.dataResult = payload
		},
		updateResultStatus(state, payload) {
			state.status = payload
		},
		updateIsLoading(state, payload) {
			state.isLoading = payload
		}
	},

	actions: {
		updateIsLoading(context, payload) {
			context.commit('updateIsLoading', payload)
		},

		getDataResult (context, payload) {
			getDataResult ()
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataResult', res.data.data)
						context.commit('updateResultStatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updateResultStatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
		getDataResultFilter (context, payload) {
			getDataResultFilter (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataResult', res.data.data)
						context.commit('updateResultStatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updateResultStatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
	}
}

export default dataResult
