import { createError, defineEventHandler, readBody } from '#imports';
import { geminiModel } from '~/server/utils/gemini';
import { useDrizzle } from '~/server/utils/database';
import { gameMessages, games } from '~/server/database/schema';
import { getServerSession } from '#auth';
import { asc, desc, getOrderByOperators } from 'drizzle-orm';


export default defineEventHandler(async (event) => {
    const session = await getServerSession(event);
    if (!session) {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' });
    }

    if (event.node.req.method !== 'POST') {
        throw createError({ statusCode: 405, statusMessage: 'Method Not Allowed' });
    }

    const { userResponse, gameId } = await readBody(event);
    if (!userResponse || !gameId) {
        throw createError({ statusCode: 400, statusMessage: 'Bad Request' });
    }

    const db = useDrizzle();
    if (!db) {
        throw createError({ statusCode: 500, statusMessage: 'Database connection not available' });
    }

    try {
      // Atomic operations without explicit transaction management
      const [gameExist] = await db.select().from(games).where(eq(games.id, gameId));

      if (gameExist?.gameOver) {
          return { gameOver: true, score: gameExist.score };
      }
      if (!gameExist) {
          await db.insert(games).values({ id: gameId, score: 0, userId: session.user.id });
      }
      await db.insert(gameMessages).values({
          gameId: gameId,
          role: 'user',
          message: userResponse,
      });

      const chatHistory = (await db.select().from(gameMessages)
          .where(eq(gameMessages.gameId, gameId))
          .orderBy(desc(gameMessages.createdAt))
          .limit(5)).toReversed()
            // Limit context to last 5 messages
          

      const chatHistoryArray = [{
            role: 'user',
            parts: [{text: "{\n  \"content\": \"You are the host of a quirky football trivia game. Generate football-related questions and expect the player's response in the next message. Do not reveal the correct answer unless they guess incorrectly.\",\n  \"rules\": [\n    \"Ask a trivia question and await an answer.\",\n    \"If correct, congratulate the player humorously and ask the next question.\",\n    \"If wrong, roast them humorously (e.g., 'You must've started watching football in 2021, I bet you support Manchester City'), reveal the correct answer, and end the game with their total score.\",\n    \"Keep track of the score, awarding 1 point for each correct answer.\",\n    \"End the game on a wrong answer, or when the player decides to stop, and provide a final score summary with either a roast or praise.\",\n    \"All replies must be in JSON format.\"\n  ],\n  \"response_structure\": {\n    \"message\": \"AI's response (quirky, humorous)\",\n    \"score\": \"Player’s current score\",\n    \"gameOver\": \"Boolean, true when the game ends\"\n  },\n  \"examples\": [\n    {\n      \"question\": {\n        \"message\": \"Here's a tricky one: Who won the Ballon d'Or in 2005?\",\n        \"score\": 0,\n        \"gameOver\": false\n      }\n    },\n    {\n      \"correct_answer\": {\n        \"message\": \"Nice one! Ronaldinho won it in 2005! You actually know your stuff. Next question: Who was the top scorer in the 1998 World Cup?\",\n        \"score\": 1,\n        \"gameOver\": false\n      }\n    },\n    {\n      \"incorrect_answer\": {\n        \"message\": \"Yikes! You guessed 'Beckham'? Even my grandma knows Ronaldinho won the 2005 Ballon d'Or. The correct answer is Ronaldinho. Game over, final score: 0. Better luck next time!\",\n        \"score\": 0,\n        \"gameOver\": true\n      }\n    },\n    {\n      \"game_end\": {\n        \"message\": \"Game over! You scored 5 out of 5! Football master!\",\n        \"score\": 5,\n        \"gameOver\": true\n      }\n    }\n  ]\n}\n"},]        
      } ,...chatHistory.map(msg => ({
                  role: msg.role === 'system' ? 'model' : 'user',
                  parts: [{ text: msg.message! }],
          }))]

      const chatSession = geminiModel.startChat({
                history: chatHistoryArray
            });

            const response = await chatSession.sendMessage(userResponse);
            const cleanText = response.response.text().replace(/```json\n|```/g, '').trim();
            const gameDetail = await JSON.parse(cleanText)

            // update game details
            await db.update(games).set({ 
              score: gameDetail.score,
              gameOver: gameDetail.gameOver ? 1 : 0
            }).where(eq(games.id, gameId));

            await db.insert(gameMessages).values({
                gameId: gameId,
                role: 'model',
                message: cleanText,
            })


        return { modelResponse: gameDetail };
    } catch (error) {
        console.error('Error processing request:', error);
        throw createError({ statusCode: 500, statusMessage: 'Internal Server Error' });
    }
});
