import { OpenAI } from "openai";

// Create OpenAI client
function createOpenAIClient(apiKey) {
  return new OpenAI({ apiKey });
}

// Generate itinerary from AI
export async function generateItinerary(openai, destinations, startDate, endDate, preferences) {
  const days = getTripDays(startDate, endDate); // Helper below
  const destinationList = destinations.join(", ");

  const systemPrompt = `You are a travel assistant that builds trip itineraries as JSON.
The output must be a JSON object with a single key "itinerary", whose value is an array.
Each itinerary includes an array of day-by-day activities.
Each activity must have: 
- day (number)
- title (string)
- description (string)
- location (string)
- lat (number)
- lng (number).
Output must be valid JSON only, with no extra text.`;

  const userPrompt = `
Build a trip itinerary for a trip to ${destinationList} from ${startDate} to ${endDate}.
Traveler preferences: ${preferences || "none"}.
Output one activity per time block (morning, afternoon, evening), each day.

Example output:
{
  "itinerary": [
    {
      "day": 1,
      "title": "Visit the Eiffel Tower",
      "description": "Explore the Eiffel Tower and enjoy panoramic views.",
      "location": "Paris",
      "lat": 48.8584,
      "lng": 2.2945
    }
  ]
}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" } // ensures valid JSON
  });

  const raw = response.choices[0].message.content;

  try {
    const parsed = JSON.parse(raw);
    if (!parsed.itinerary || !Array.isArray(parsed.itinerary)) {
      throw new Error("Expected an itinerary array inside an object");
    }
    return parsed.itinerary;
  } catch (err) {
    console.error("Failed to parse AI response:", err.message);
    throw new Error("AI returned invalid JSON");
  }
}

// Helper to calculate trip length
function getTripDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff;
}

export { createOpenAIClient };
