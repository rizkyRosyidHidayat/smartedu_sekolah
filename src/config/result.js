import http from './http'

export function getDataResult() {
	return http.get('recap')
}

export function getDataResultFilter(data) {
	return http.get(`recap?group_id=${data.group_id}&major_id=${data.major_id}&room_id=${data.room_id}&subject_id=${data.subject_id}`)
}