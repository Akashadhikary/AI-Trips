import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY

const genAI = new GoogleGenerativeAI(apiKey);

// Use Gemini model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// JSON config
const generationConfig = {
  temperature: 0.7,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start chat session
export const chatSession = model.startChat({
  generationConfig,
});

export const AI_PROMPT = `
Generate a {days}-day travel plan for:
- Location: {location}
- Group: {groupType}
- Budget tier: {budgetTier}

Return ONLY JSON with this structure:
{
  "meta": { "location": string, "days": number, "groupType": string, "budgetTier": string },
  "hotels": [
    { "hotelName": string, "address": string, "price": number, "currency": "USD", "imageUrl": string, "geo": { "lat": number, "lng": number }, "rating": number, "description": string }
  ],
  "itinerary": [
    { "day": number, "plan": [ { "placeName": string, "placeDetails": string, "placeImageUrl": string, "geo": { "lat": number, "lng": number }, "ticketPricing": { "amount": number, "currency": "USD" }, "rating": number, "travelTimeMinutes": number, "bestTimeToVisit": string } ] }
  ]
}

Requirements:
- The "hotels" array must always contain EXACTLY 10 hotels.
`;