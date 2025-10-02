import React, { useState } from 'react'
import { createTrip } from '../api'

export default function TripEditor({ onCreated }){
  const [title, setTitle] = useState('');
  const [destinations, setDestinations] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [preferences, setPreferences] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e){
    e.preventDefault();
    setLoading(true);
    const payload = {
      title,
      destinations: destinations.split(',').map(s => s.trim()).filter(Boolean),
      startDate: startDate || null,
      endDate: endDate || null,
      preferences,
      generate: true
    }
    try{
      const trip = await createTrip(payload)
      onCreated && onCreated(trip)
      setTitle('')
      setDestinations('')
      setPreferences('')
    }catch(err){
      console.error(err)
      alert('Failed to create trip')
    }finally{
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Trip title" required />
      <input value={destinations} onChange={e=>setDestinations(e.target.value)} placeholder="Destinations (comma separated) e.g. Paris, Lyon" required />
      <div style={{ display: 'flex', gap: 8 }}>
        <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} />
        <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} />
      </div>
      <input value={preferences} onChange={e=>setPreferences(e.target.value)} placeholder="Preferences (e.g. budget, family, adventure)" />
      <button type="submit" disabled={loading}>{loading ? 'Generating...' : 'Create & Generate Itinerary'}</button>
    </form>
  )
}