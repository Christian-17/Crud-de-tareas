import Vue from 'vue'
import axios from 'axios'

const axiosIns = axios
axiosIns.defaults.baseURL = process.env.VUE_APP_API
axiosIns.defaults.headers.common['Authorization'] = localStorage.getItem('token')

Vue.prototype.$http = axiosIns

export default axiosIns