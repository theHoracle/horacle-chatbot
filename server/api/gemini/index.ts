// server/api/gemini/index.ts

import { geminiModel } from '~/server/utils/gemini';

export default defineEventHandler(async (event) => {
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  // Get the request body
  const {message} = await readBody(event);

  try {
    // Generate content using the Gemini API
    const result = await geminiModel.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Return the generated text
    return { message: text };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request.'
    });
  }
});