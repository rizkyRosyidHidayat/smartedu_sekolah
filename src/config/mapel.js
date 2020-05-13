import http from './http'

export function getDataMapel() {
	return http.get('subject')
}

export function postDataMapel(data) {
	return http.post('subject', data)
}

export function putDataMapel(id, data) {
	return http.put('subject/edit/'+id, data)
}

export function deleteDataMapel(id) {
	return http.delete('subject/'+id)
}
