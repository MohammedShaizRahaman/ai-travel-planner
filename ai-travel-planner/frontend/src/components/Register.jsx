import React, { useState } from 'react'
import { register } from '../api'
import { saveAuth } from '../auth'


export default function Register({ onAuth }){
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [loading, setLoading] = useState(false);


async function handleSubmit(e){
e.preventDefault();
setLoading(true);
try{
const data = await register({ name, email, password });
saveAuth(data.token, data.user);
onAuth && onAuth(data.user);
}catch(err){
console.error(err);
alert(err.response?.data?.error || 'Register failed');
}finally{ setLoading(false) }
}


return (
<form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
<input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" required />
<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" required />
<button type="submit" disabled={loading}>{loading ? 'Signing up...' : 'Register'}</button>
</form>
)
}