import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  day: Number,
  title: String,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
});
const ItinerarySchema = new mongoose.Schema({
  day: String,     // e.g. "Day 1"
  date: Date,
  activities: [
    {
      timeOfDay: String, // "Morning", "Afternoon", etc.
      description: String
    }
  ]
});
const TripSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  destinations: [String],
  startDate: Date,
  endDate: Date,
  preferences: String,
  itinerary: [ActivitySchema], // ✅ fixed: now this is an array of activity objects
  createdAt: { type: Date, default: Date.now }
});

const Trip = mongoose.model('Trip', TripSchema);
export default Trip;
