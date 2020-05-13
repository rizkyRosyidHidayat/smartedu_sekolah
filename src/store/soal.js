import {
	getDataSoal,
	postDataSoal,
	putDataSoal,
	deleteDataSoal
} from '@/config/soal'

const dataSoal = {
	namespaced: true,

	state: {
		dataSoal: [],
		detailSoal: {},
		status: null,
		isLoading: false
	},

	mutations: {
		updateDataSoal(state, payload) {
			state.dataSoal = payload
		},
		updateDetailSoal(state, payload) {
			state.detailSoal = payload
		},
		updaSoaltatus(state, payload) {
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

		getDataSoal (context, payload) {
			getDataSoal (payload)
				.then(res => {
					if (res.status === 200) {
						context.commit('updateDataSoal', res.data)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updaSoaltatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		getDetailSoal (context, payload) {
			getDataSoal (payload.id_mapel)
				.then(res => {
					if (res.status === 200) {
						var hasil = res.data.filter(soal => soal.id === payload.id_soal)
						var soal = {...hasil[0]}
						var detail = {}
		    		detail.id = soal.id
		        detail.pertanyaan = soal.pertanyaan
		        detail.kunci = soal.jawaban[0].kunci
		        detail.id_subject = payload.id_mapel
		        detail.jawabanA = soal.pilihanjawaban[0].teks
		        detail.jawabanB = soal.pilihanjawaban[1].teks
		        detail.jawabanC = soal.pilihanjawaban[2].teks
		        detail.jawabanD = soal.pilihanjawaban[3].teks
		        detail.jawabanE = soal.pilihanjawaban[4].teks
		        detail.pembahasan = soal.pembahasan
						context.commit('updateDetailSoal', detail)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updaSoaltatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		postDataSoal (context, payload) {
			postDataSoal (payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSoal', res.data.data)
						context.commit('updaSoaltatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updaSoaltatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},

		deleteDataSoal (context, payload) {
			deleteDataSoal (payload.id_soal)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSoal', payload.id_mapel)
						context.dispatch('updateIsLoading', false)
        		window.location.reload()						
					}
				})
		},

		putDataSoal (context, payload) {
			putDataSoal (payload.id, payload)
				.then(res => {
					if (res.status === 200) {
						context.dispatch('getDataSoal', payload.id_subject)
						context.commit('updaSoaltatus', true)
						context.dispatch('updateIsLoading', false)
					}
				})
				.catch(err => {
					context.commit('updaSoaltatus', false)
					context.dispatch('updateIsLoading', false)
				})
		},
	}
}

export default dataSoal
