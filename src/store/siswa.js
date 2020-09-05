import {
	getDataSiswa,
	deleteDataSiswa,
	putDataSiswa,
	deleteAllDataSiswa
} from '@/config/siswa'

const dataSiswa = {
	namespaced: true,

	state: {
		dataSiswa: [],
		status: null,
		isLoading: false
	},

	mutations: {
		updateDataSiswa(state, payload) {
			state.dataSiswa = payload
		},
		updateSiswatatus(state, payload) {
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

		getDataSiswa (context) {
			getDataSiswa ()
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataSiswa', res.data.data)
						context.commit('updateSiswatatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateSiswatatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
		deleteDataSiswa (context, payload) {
			deleteDataSiswa (payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSiswa')
						context.commit('updateSiswatatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateSiswatatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
		putDataSiswa (context, payload) {
			putDataSiswa (payload.id, payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSiswa')
						context.commit('updateSiswatatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateSiswatatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
		deleteAllDataSiswa (context, payload) {
			deleteAllDataSiswa (payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSiswa')
						context.commit('updateSiswatatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.commit('updateSiswatatus', false)
					context.dispatch('updateIsLoading', false)
				})
		}
	}
}

export default dataSiswa
