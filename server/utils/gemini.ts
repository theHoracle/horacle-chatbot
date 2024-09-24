// server/utils/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
const { geminiApiKey } = useRuntimeConfig();
// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Create and export the model
export const geminiModel = genAI.getGenerativeModel({ 
    model: "gemini-1.5-flash",
 });

export const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
      type: "object",
      properties: {
        response: {
          type: "object",
          properties: {
            message: {
              type: "string"
            },
            score: {
              type: "number"
            },
            gameOver: {
              type: "boolean"
            }
          }
        }
      }
    },
  };