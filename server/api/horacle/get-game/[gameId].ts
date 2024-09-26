import { getServerSession } from "#auth";
import { asc } from "drizzle-orm";
import { gameMessages } from "~/server/database/schema";

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
        const [currentGame] = await db.select().from(gameMessages)
        .where(eq(gameMessages.gameId, gameId))
        .orderBy(asc(gameMessages.createdAt))
        if(!currentGame) {
            return createError({
                statusCode: 404,
                statusMessage: "GAME NOT FOUND!"
            })
        }
        return { currentGame }
    } catch (error) {
        console.error('Error getting content from server (game-chat):', error);
        throw createError({
          statusCode: 500,
          statusMessage: 'Internal Server Error',
        });
    }
})