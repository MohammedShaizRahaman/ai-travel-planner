import React from 'react'

export default function TripList({ trips = [], onSelect }){
  return (
    <div>
      {trips.map(t => (
        <div key={t._id} style={{ border: '1px solid #ddd', padding: 8, marginBottom: 8 }}>
          <h3 style={{ margin: 0 }}>{t.title}</h3>
          <small>{t.destinations.join(', ')}</small>
          <div style={{ marginTop: 8 }}>
            <button onClick={()=>onSelect(t)}>View</button>
          </div>
        </div>
      ))}
    </div>
  )
}