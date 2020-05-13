import http from './http'

export function getDataSoal(id) {
	return http.get('soal/show?id_subject='+id)
}

export function postDataSoal(data) {
	return http.post('soal', data)
}

export function deleteDataSoal(data) {
	return http.delete('soal/'+data)
}

export function putDataSoal(id, data) {
	return http.put('soal/'+id, data)
}
