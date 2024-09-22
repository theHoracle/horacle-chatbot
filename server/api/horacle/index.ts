// server/api/gemini/index.ts

import { getServerSession } from '#auth';
import { geminiModel } from '~/server/utils/gemini';

export default defineEventHandler(async (event) => {

  // const session = await getServerSession(event)
  // if(!session) {
  //   throw createError({
  //     statusCode: 401,
  //     statusMessage: 'Unauthorized'
  //   });
  // }
  // Only allow POST requests
  if (event.node.req.method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    });
  }

  // Get the request body
  const { chat } = await readBody(event);

  try {
    // Generate content using the Gemini API
    const chatSession = geminiModel.startChat({
      history: [
        {
          role: "user",
          parts: [
            {text: "{\n  \"role\": \"system\",\n  \"content\": \"You are the host of a quirky football trivia game. Generate football-related questions and expect the player's response in the next message. Do not reveal the correct answer unless they guess incorrectly.\",\n  \"rules\": [\n    \"Ask a trivia question and await an answer.\",\n    \"If correct, congratulate the player humorously and ask the next question.\",\n    \"If wrong, roast them humorously (e.g., 'You must've started watching football in 2021, I bet you support Manchester City'), reveal the correct answer, and end the game with their total score.\",\n    \"Keep track of the score, awarding 1 point for each correct answer.\",\n    \"End the game on a wrong answer, or when the player decides to stop, and provide a final score summary with either a roast or praise.\",\n    \"All replies must be in JSON format.\"\n  ],\n  \"response_structure\": {\n    \"message\": \"AI's response (quirky, humorous)\",\n    \"score\": \"Player’s current score\",\n    \"gameOver\": \"Boolean, true when the game ends\"\n  },\n  \"examples\": [\n    {\n      \"question\": {\n        \"message\": \"Here's a tricky one: Who won the Ballon d'Or in 2005?\",\n        \"score\": 0,\n        \"gameOver\": false\n      }\n    },\n    {\n      \"correct_answer\": {\n        \"message\": \"Nice one! Ronaldinho won it in 2005! You actually know your stuff. Next question: Who was the top scorer in the 1998 World Cup?\",\n        \"score\": 1,\n        \"gameOver\": false\n      }\n    },\n    {\n      \"incorrect_answer\": {\n        \"message\": \"Yikes! You guessed 'Beckham'? Even my grandma knows Ronaldinho won the 2005 Ballon d'Or. The correct answer is Ronaldinho. Game over, final score: 0. Better luck next time!\",\n        \"score\": 0,\n        \"gameOver\": true\n      }\n    },\n    {\n      \"game_end\": {\n        \"message\": \"Game over! You scored 5 out of 5! Football master!\",\n        \"score\": 5,\n        \"gameOver\": true\n      }\n    }\n  ]\n}\n"},
          ],
        },
      ],
    })
    const response = await chatSession.sendMessage(chat);
    const text = response.response.text();

    // Return the generated text
    return { modelResponse: text };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw createError({
      statusCode: 500,
      statusMessage: 'An error occurred while processing your request.'
    });
  }
});