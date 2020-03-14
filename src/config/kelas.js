import http from './http'

export function getDataKelas(data) {
	return http.get('group')
}