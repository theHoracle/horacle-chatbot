import { getServerSession } from "#auth";
import { asc } from "drizzle-orm";
import { gameMessages, games } from "~/server/database/schema";

export default defineEventHandler(async (event) => {
    const gameId = getRouterParam(event, 'gameId')
    if(!gameId) {
        return createError({
            statusCode: 400,
            statusMessage: 'BAD REQUEST'
        })
    }
    // const session = await getServerSession(event)
    // if(!session) {
    //     return createError({
    //         statusCode: 401,
    //         statusMessage: 'UNAUTHORIZED'
    //       });
    // }

    if(event.node.req.method !== 'GET') {
        return createError({
            statusCode: 405,
            statusMessage: 'METHOD NOT ALLOWED'
        })
    }
    
    try {
        const db = useDrizzle()
        if(!db) {
            throw new Error("DB Bindnigs not here")
        }

        const result = await db.select({
            game: {
              id: games.id,
              userId: games.userId,
              score: games.score,
              gameOver: games.gameOver,
            },
            messages: {
              id: gameMessages.id,
              role: gameMessages.role,
              message: gameMessages.message,
              createdAt: gameMessages.createdAt,
            },
          })
          .from(games)
          .leftJoin(gameMessages, eq(games.id, gameMessages.gameId))
          .where(eq(games.id, gameId));
        
        const gameWithMessages = result.reduce((acc, row) => {
            if (!acc.game) {
              acc.game = row.game;
              acc.game.messages = [];
            }
            if (row?.messages?.id) {
              acc.game.messages.push(row.messages);
            }
            return acc;
          }, 
          { game: null as any });
        console.log(gameWithMessages)
        return { gameWithMessages }
    } catch (error) {
        console.error('Error getting content from server (game-chat):', error);
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        });
    }
})