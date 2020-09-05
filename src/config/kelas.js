import http from './http'

export function getDataKelas() {
	return http.get('group')
}