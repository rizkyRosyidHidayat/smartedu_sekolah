import http from './http'

export function getDataRuang(data) {
	return http.get('room')
}