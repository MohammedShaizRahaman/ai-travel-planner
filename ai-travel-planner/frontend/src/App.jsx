import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import TripEditor from './components/TripEditor';
import TripList from './components/TripList';
import MapView from './components/MapView';
import './App.css';
// import { getAuth, clearAuth } from './auth'
// import { fetchTrips } from './api'

function App() {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleLogout = () => {
    setUser(null);
    setTrips([]);
    setSelected(null);
    // clearAuth();
  };

  // Example: Load trips on login
  useEffect(() => {
    if (user) {
      // fetchTrips().then(setTrips);
    }
  }, [user]);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: 16 }}>
      <h1>AI Travel Planner</h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{user ? `Signed in as ${user.name}` : 'Not signed in'}</div>
        <div>
          {user ? <button onClick={handleLogout}>Logout</button> : null}
        </div>
      </div>

      {!user ? (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
          <div>
            <h2>Login</h2>
            <Login onAuth={(u) => setUser(u)} />
          </div>
          <div>
            <h2>Register</h2>
            <Register onAuth={(u) => setUser(u)} />
          </div>
        </section>
      ) : (
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginTop: 16 }}>
          <div>
            <h2>Create a trip</h2>
            <TripEditor
              onCreated={(t) => {
                setTrips(prev => [t, ...prev]);
                setSelected(t);
              }}
            />

            <h2 style={{ marginTop: 24 }}>Your Trips</h2>
            <TripList trips={trips} onSelect={setSelected} />
          </div>

          <aside>
            <h3>Map</h3>
            <MapView
              markers={
                selected && selected.itinerary
                  ? selected.itinerary
                      .filter(a => a.lat && a.lng)
                      .map(act => ({
                        lat: act.lat,
                        lng: act.lng,
                        title: act.title,
                        description: act.description,
                      }))
                  : []
              }
              center={[20, 0]}
              zoom={2}
            />
          </aside>
        </section>
      )}

      <section style={{ marginTop: 24 }}>
        <h2>Selected Trip</h2>
        {selected ? (
          <div>
            <h3>{selected.title}</h3>
            <div>
              {selected.itinerary &&
                selected.itinerary.map((d, i) => (
                  <div key={i} style={{ borderBottom: '1px solid #eee', padding: 8 }}>
                    <strong>
                      Day {d.day}: {d.title}
                    </strong>
                    <p>{d.description}</p>
                  </div>
                ))}
            </div>
          </div>
        ) : (
          <p>No trip selected</p>
        )}
      </section>
    </div>
  );
}

export default App; // ✅ default export required
