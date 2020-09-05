import http from './http'

export function postDataSiswa(data) {
	return http.post('master', data)
}

export function getDataSiswa() {
	return http.get('participant')
}

export function deleteDataSiswa(id) {
	return http.delete('participant/'+id)
}

export function putDataSiswa(id, data) {
	return http.put('participant/'+id, data)
}

export function deleteAllDataSiswa(id) {
	return http.delete('participant/'+id+'/deleteAll')
}
