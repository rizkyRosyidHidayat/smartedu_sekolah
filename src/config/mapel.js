import http from './http'

export function getDataMapel() {
	return http.get('subject')
}

export function postDataMapel(data) {
	return http.post('subject', data)
}