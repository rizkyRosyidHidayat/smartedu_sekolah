import http from './http'

export function postDataSiswa(data) {
	return http.post('master', data)
}

export function getDataSiswa() {
	return http.get('participant')
}