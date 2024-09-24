import { createId } from "@paralleldrive/cuid2";
import { gameMessages, games } from "~/server/database/schema";
import { useDrizzle } from "~/server/utils/database";

type GameState = {
    messages: ChatMessage[],
    score: number,
    gameOver: boolean,
    isLoading: boolean,
}

type ModelResponse = {
    message: string,
    score: number,
    gameOver: boolean,
}

type ChatMessage = {
    role: 'user' | 'model',
    content: string,
}

export const useGameStore = defineStore('activeGame', () => {
    const game = ref<GameState>({
        messages: [],
        score: 0,
        gameOver: false,
        isLoading: false,
    });
    const gameId = ref<string | undefined>();

    const setGame = (data?: GameState) => (game.value = data || game.value);
    const setGameId = (id?: string) => (gameId.value = id);

    const fetchModelResponse = async (messages: ChatMessage[]) => {
        const response = await $fetch('/api/horacle', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: { chat: JSON.stringify(messages) }
        });
        return JSON.parse(response.modelResponse) as ModelResponse;
    };

    const handleModelResponse = async (modelResponse: ModelResponse) => {
        game.value.messages.push({ role: 'model', content: modelResponse.message });
        game.value.score = modelResponse.score;
        return modelResponse;
    };

    const insertMessageToDb = async (role: 'user' | 'model', content: string) => {
        const db = useDrizzle();
        return await db.insert(gameMessages).values({
            gameId: gameId.value,
            role,
            message: content,
        }).returning();
    };

    const startNewGame = async (data: ChatMessage) => {
        const id = createId();
        const { data: user } = useAuth();
        setGameId(id);
        game.value.messages.push(data);

        try {
            await insertMessageToDb(data.role, data.content);
            const modelResponse = await fetchModelResponse(game.value.messages);
            await handleModelResponse(modelResponse);
            console.log('New game started');
        } catch (error) {
            setGame();
            setGameId();
            console.error('Error starting new game:', error);
        }
    };

    const newGame = async (data: ChatMessage) => {
        game.value.messages.push(data);
        try {
            await insertMessageToDb(data.role, data.content);
            const modelResponse = await fetchModelResponse(game.value.messages);
            await handleModelResponse(modelResponse);
            await insertMessageToDb('model', modelResponse.message);
        } catch (error) {
            console.error('Error during new game message:', error);
        }
    };

    return { game, gameId, startNewGame, newGame };
});
