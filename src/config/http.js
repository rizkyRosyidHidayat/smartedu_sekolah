import axios from 'axios'
import store from '@/store/index'

const http = axios.create({
	baseURL: `http://smartedu.fanduprassetia.com/api/school/`,
	headers: {
		'Authorization': 'bearer '+window.localStorage.getItem('token_sekolah'),
		// 'Content-Type': 'application/json',
		// 'Accept': 'application/json'
	}
})

http.interceptors.response.use(res => {
	return res
}, err => {
	store.dispatch('updateModalToken', true)
	return Promise.reject(err);
})

export default http
