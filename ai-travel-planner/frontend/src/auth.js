export function saveAuth(token, user){
localStorage.setItem('ai_travel_token', token);
localStorage.setItem('ai_travel_user', JSON.stringify(user));
}
export function clearAuth(){
localStorage.removeItem('ai_travel_token');
localStorage.removeItem('ai_travel_user');
}
export function getToken(){
return localStorage.getItem('ai_travel_token');
}
export function getUser(){
const s = localStorage.getItem('ai_travel_user');
return s ? JSON.parse(s) : null;
}