import axios from 'axios'
import { getToken } from './auth'


const API = axios.create({ baseURL: 'http://localhost:4000/api' })


// request interceptor to attach token
API.interceptors.request.use(cfg => {
const token = getToken();
if (token) cfg.headers.Authorization = `Bearer ${token}`;
return cfg;
})


export async function createTrip(payload){
const resp = await API.post('/trips', payload)
return resp.data
}
export async function fetchTrips(){
const resp = await API.get('/trips')
return resp.data
}
export async function fetchTrip(id){
const resp = await API.get(`/trips/${id}`)
return resp.data
}


export async function register(payload){
const resp = await API.post('/auth/register', payload)
return resp.data
}
export async function login(payload){
const resp = await API.post('/auth/login', payload)
return resp.data
}