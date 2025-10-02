import express from 'express';
const router = express.Router();
import Trip from '../models/Trip.js';
import auth from '../middleware/auth.js';
import { createOpenAIClient, generateItinerary } from '../services/ai.js';

// Create a trip and optionally generate itinerary via AI (authenticated)
router.post('/', auth, async (req, res) => {
  const { title, destinations, startDate, endDate, preferences, generate } = req.body;

  try {
    const trip = new Trip({
      userId: req.user.id,
      title,
      destinations,
      startDate,
      endDate,
      preferences,
    });

    if (generate) {
      try {
        const openai = createOpenAIClient(process.env.OPENAI_API_KEY);
        const itinerary = await generateItinerary(openai, destinations, startDate, endDate, preferences);
        trip.itinerary = itinerary;
      } catch (aiError) {
        console.error('OpenAI API error:', aiError.response?.data || aiError.message);

        // Handle quota/rate-limit errors
        if (
          aiError.response?.status === 429 ||
          aiError.response?.data?.code === 'insufficient_quota'
        ) {
          return res.status(429).json({
            error: 'OpenAI quota exceeded. Trip saved without AI itinerary.',
          });
        }

        // Other AI errors
        return res.status(500).json({
          error: 'Error generating itinerary with AI. Trip saved without itinerary.',
        });
      }
    }

    await trip.save();
    res.json(trip);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all trips for the authenticated user
router.get('/', auth, async (req, res) => {
  const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json(trips);
});

// Get by id (must belong to user)
router.get('/:id', auth, async (req, res) => {
  const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
  if (!trip) return res.status(404).json({ error: 'Not found' });
  res.json(trip);
});

export default router;
