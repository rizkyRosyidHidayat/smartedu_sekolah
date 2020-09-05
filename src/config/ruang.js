import http from './http'

export function getDataRuang() {
	return http.get('room')
}