// // To run this code you need to install the following dependencies:
// // npm install @google/genai mime
// // npm install -D @types/node

// import {
//   GoogleGenAI,
// } from '@google/genai';
// import mime from 'mime';
// import { writeFile } from 'fs';

// function saveBinaryFile(fileName, content) {
//   writeFile(fileName, content, 'utf8', (err) => {
//     if (err) {
//       console.error(`Error writing file ${fileName}:`, err);
//       return;
//     }
//     console.log(`File ${fileName} saved to file system.`);
//   });
// }

// async function main() {
//   const ai = new GoogleGenAI({
//     apiKey: AIzaSyA-eN4J2Fr_Flwhh3uf7shnnA-Puum-WNo,
//   });
//   const config = {
//     responseModalities: [
//         'IMAGE',
//         'TEXT',
//     ],
//   };
//   const model = 'gemini-2.5-flash-image-preview';
//   const contents = [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//   ];

//   const response = await ai.models.generateContentStream({
//     model,
//     config,
//     contents,
//   });
//   let fileIndex = 0;
//   for await (const chunk of response) {
//     if (!chunk.candidates || !chunk.candidates[0].content || !chunk.candidates[0].content.parts) {
//       continue;
//     }
//     if (chunk.candidates?.[0]?.content?.parts?.[0]?.inlineData) {
//       const fileName = `ENTER_FILE_NAME_${fileIndex++}`;
//       const inlineData = chunk.candidates[0].content.parts[0].inlineData;
//       const fileExtension = mime.getExtension(inlineData.mimeType || '');
//       const buffer = Buffer.from(inlineData.data || '', 'base64');
//       saveBinaryFile(`${fileName}.${fileExtension}`, buffer);
//     }
//     else {
//       console.log(chunk.text);
//     }
//   }
// }

// main();




import { GoogleGenerativeAI } from "@google/generative-ai";

// 🔑 API key should be stored in env, not hardcoded!
//const apiKey = process.env.GOOGLE_API_KEY; 
const genAI = new GoogleGenerativeAI("AIzaSyA-eN4J2Fr_Flwhh3uf7shnnA-Puum-WNo");

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