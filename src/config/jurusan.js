import http from './http'

export function getDataJurusan() {
	return http.get('major')
}