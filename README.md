
# 🧳 AI Travel Planner

An AI-powered travel planning web application built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js) and **OpenAI API**.
Users can create accounts, plan trips, and generate smart itineraries with AI suggestions for **destinations, hotels, restaurants, and activities**.

---

## 🚀 Features

* 🔐 **User Authentication** (JWT-based) – secure login & signup.
* 🌍 **Interactive Travel Planner** – add destinations, dates, and preferences.
* 🤖 **AI-Powered Itinerary Generator** – personalized trip plans with hotels, restaurants, and activities.
* 📍 **Map Integration** (future) – visualize destinations on an interactive map.
* 🗂️ **User-Specific Trips** – each user manages their own trips.
* 📱 **Responsive UI** – modern React + Tailwind design.

---

## 🛠️ Tech Stack

### Frontend

* ⚛️ React.js (Vite)
* Tailwind CSS
* Axios (API requests)

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT (Authentication)

### AI Integration

* OpenAI API (for itinerary generation)

---

## 📂 Project Structure

```
ai-travel-planner/
│── backend/          # Express.js + MongoDB + JWT Auth
│   ├── models/       # Mongoose models (User, Trip)
│   ├── routes/       # Express routes (auth, trips, AI)
│   ├── services/     # AI services (OpenAI integration)
│   ├── server.js     # Backend entry point
│
│── frontend/         # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/ # UI Components
│   │   ├── pages/      # App Pages (Login, Dashboard, Trip Planner)
│   │   ├── App.jsx     # Main React Component
│   │   ├── main.jsx    # React entry point
│
│── .gitignore        # Ignore node_modules, .env, etc.
│── README.md         # Project documentation
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-travel-planner.git
cd ai-travel-planner
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

* Create a `.env` file inside `backend/` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

* Run the backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

* App runs at: [http://localhost:5173](http://localhost:5173)
* Backend runs at: [http://localhost:5000](http://localhost:5000)

---

## 📌 API Endpoints

### 🔑 Auth

* `POST /api/auth/register` – Register user
* `POST /api/auth/login` – Login user

### ✈️ Trips

* `POST /api/trips` – Create a trip
* `GET /api/trips` – Get user trips
* `DELETE /api/trips/:id` – Delete a trip

### 🤖 AI Itinerary

* `POST /api/ai/itinerary` – Generate AI-powered itinerary

---

## 📝 Future Improvements

* Google Maps API integration
* Multi-user collaboration (friends & family trips)
* Flight & hotel booking APIs
* Offline support with PWA

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.

---
