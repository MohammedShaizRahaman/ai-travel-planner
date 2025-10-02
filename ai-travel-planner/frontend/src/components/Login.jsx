import React, { useState } from 'react'
import { login } from '../api'
import { saveAuth } from '../auth'
import "./Login.css"

export default function Login({ onAuth }){
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);


async function handleSubmit(e){
e.preventDefault();
setLoading(true);
try{
const data = await login({ email, password });
saveAuth(data.token, data.user);
onAuth && onAuth(data.user);
}catch(err){
console.error(err);
alert(err.response?.data?.error || 'Login failed');
}finally{ setLoading(false) }
}


return (
<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
<button type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
</form>
)
}