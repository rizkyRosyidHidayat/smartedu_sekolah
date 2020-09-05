import http from './http'

export function getDataTes() {
	return http.get('manage/tes')
}

export function getDataTesByHari(data) {
	return http.get('manage/tes?hari='+data)
}

export function postDataTes(data) {
	return http.post('manage/tes', data)
}

export function deleteDataTes(id) {
	return http.delete('manage/tes/'+id)
}

export function putDataTes(id, data) {
	return http.put('manage/tes/'+id, data)
}

export function postMulaiTes(data) {
	return http.post('manage/tes/mulai', data)
}

export function postAkhiriTes(data) {
	return http.post('manage/tes/akhiri', data)
}
