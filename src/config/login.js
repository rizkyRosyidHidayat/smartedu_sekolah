import http from './http'

export function postDataLogin(data) {
	return http.post('login', data)
		.then(res => {			
			if (res.status === 200) {
				window.localStorage.setItem('token_sekolah', res.data.data.access_token)
				return res
			}
		})
}