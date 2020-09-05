import { getDataKelas } from '@/config/kelas'
import { getDataJurusan } from '@/config/jurusan'
import { getDataRuang } from '@/config/ruang'
import { getDataMapel, postDataMapel, putDataMapel, deleteDataMapel } from '@/config/mapel'

var dataMaster = {
	namespaced: true,

	state: {
		dataKelas: [],
		dataJurusan: [],
		dataRuang: [],
		dataMapel: [],
		isLoading: false,
		isLoadingJurusan: false,
		isLoadingRuang: false,
		status: null
	},

	mutations: {
		updateDataKelas (state, payload) {
			state.dataKelas = payload
		},
		updateDataJurusan(state, payload) {
			state.dataJurusan= payload
		},
		updateDataRuang (state, payload) {
			state.dataRuang = payload
		},
		updateDataMapel (state, payload) {
			state.dataMapel = payload
		},
		updateIsLoading (state, payload) {
			state.isLoading = payload
		},
		updateStatus (state, payload) {
			state.status = payload
		}
	},

	actions: {
		updateIsLoading (context, payload) {
			context.commit('updateIsLoading', payload)
		},
		getDataKelas (context) {
			getDataKelas () 
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataKelas', res.data.data)						
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
				})
		},
		getDataJurusan (context) {
			getDataJurusan () 
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataJurusan', res.data.data)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
				})
		},
		getDataRuang (context) {
			getDataRuang () 
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataRuang', res.data.data)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
				})
		},
		// Mapel
		getDataMapel (context) {
			getDataMapel () 
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataMapel', res.data.data)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
				})
		},
		postDataMapel (context, payload) {
			postDataMapel (payload) 
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataMapel')
						context.dispatch('updateIsLoading', false)
						context.commit('updateStatus', true)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
					context.commit('updateStatus', false)
				})
		},
		putDataMapel (context, payload) {
			putDataMapel (payload.id, payload) 
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataMapel')
						context.dispatch('updateIsLoading', false)
						context.commit('updateStatus', true)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
					context.commit('updateStatus', false)
				})
		},
		deleteDataMapel (context, payload) {
			deleteDataMapel (payload) 
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataMapel')
						context.dispatch('updateIsLoading', false)
						context.commit('updateStatus', true)
					}
				})
				.catch(() => {
					context.dispatch('updateIsLoading', false)					
					context.commit('updateStatus', false)
				})
		}
	}
}

export default dataMaster