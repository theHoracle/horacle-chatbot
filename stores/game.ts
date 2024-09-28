import { createId } from "@paralleldrive/cuid2";

type GameState = {
    messages: ChatMessage[],
    score: number,
    gameOver: boolean,
    isLoading: boolean,
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

    const setGame = (data?: Partial<GameState>) => {
        if (data) {
            game.value = { ...game.value, ...data };
        }
    };
    const setGameId = (id?: string) => (gameId.value = id);

    const fetchModelResponse = async (message: string) => {
        game.value.isLoading = true;
        try {
            const response = await $fetch('/api/horacle', {
                method: 'POST',
                body: { 
                    gameId: gameId.value,
                    userResponse: message,
                }
            });
            if(response.gameOver) {
                setGame({ gameOver: true });
                return null
            }
            return response.modelResponse;
        } catch (error) {
            console.error('Error fetching model response:', error);
            throw error;
        } finally {
            game.value.isLoading = false;
        }
    };

    const handleModelResponse = (modelResponse: any) => {
        game.value.messages.push({ role: 'model', content: modelResponse.message });
        game.value.score = modelResponse.score;
        game.value.gameOver = modelResponse.gameOver;
    };

    const sendMessage = async (message: string) => {
        if(game.value.gameOver) {
            // await startNewGame(message);
            return;
        }
        game.value.messages.push({ role: 'user', content: message });
        try {
            const modelResponse = await fetchModelResponse(message);
            if(!modelResponse) return;
            handleModelResponse(modelResponse);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const startNewGame = async (message: string) => {
        const id = createId();
        setGameId(id);
        setGame({
            messages: [],
            score: 0,
            gameOver: false,
        });
        await sendMessage(message);
    };

    const fetchGameState = async (id: string) => {
        game.value.isLoading = true;
        try {
            const response = await $fetch(`/api/horacle/get-game/${id}`, { method: 'GET' });
            if(response) {
                setGameId(id);
                const gameState = ((response as unknown as any).gameWithMessages?.game)
                setGame({
                    gameOver: gameState?.gameOver,
                    messages: gameState?.messages.map((message: ChatMessage) => ({
                        role: message.role,
                        content: message.content,
                    })),
                    score: gameState?.score,
                });
                return;
            }
            throw new Error("GAME NOT FOUND");
        } catch (error) {
            console.error('Error fetching game state:', error);
            throw error;
        } finally {
            game.value.isLoading = false;
        }
    };

    const initializeGame = async (id?: string) => {
        if (id) {
            await fetchGameState(id);
        }
    }
    
    const hasActiveGame = computed(() => {
        return !!gameId.value && game.value.messages.length > 0;
    });


    return { game, gameId,
        startNewGame, sendMessage,
        initializeGame, hasActiveGame };
});