// server/utils/gemini.ts

import { GoogleGenerativeAI } from '@google/generative-ai';
const { geminiApiKey } = useRuntimeConfig();
// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(geminiApiKey);

// Create and export the model
export const geminiModel = genAI.getGenerativeModel({ model: "gemini-pro" });