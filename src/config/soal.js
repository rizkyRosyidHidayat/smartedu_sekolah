import http from './http'

export function getDataSoal(id) {
	return http.get('soal/show?id_subject='+id)
}

export function postDataSoal(data) {
	return http.post('soal', data)
}