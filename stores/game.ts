import { createId } from "@paralleldrive/cuid2"

type GameState = {
    messages: Array<ChatMessage>,
    score: number,
    gameOver: boolean,
    isLoading: boolean,
}

type ChatMessage = {
    role: 'user' | 'model',
    content: string
}

export const useGameStore = defineStore('activeGame', () => {
    const game = ref({
                messages: [] as Array<{ role: 'user' | 'model', content: string }>,
                score: 0,
                gameOver: false,
                isLoading: false, // To show loading state when waiting for a model response
            })
    const gameId = ref()
    const setGame = (data?: any) => (game.value = data)
    const setGameId  = (id?: string) => (gameId.value = id)

    const startNewGame = async (data: ChatMessage ) => {
        const id = createId()
        setGameId(id)
        console.log(gameId.value)
        game.value.messages.push(data)
        console.log('gamechat: ', game)
        try {
            const res = await $fetch('/api/horacle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { chat:  JSON.stringify(game.value.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                }))) }
            })
            
            game.value.messages.push({
                role: 'model',
                content: res.modelResponse
            })
            console.log('New game started')
        } catch (error) {
            setGame();
            setGameId();
            console.log(error)
        }
    }
    const newGame = async (data: ChatMessage) => {
        game.value.messages.push(data)
        try {
            const res = await $fetch('/api/horacle', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: { chat:  JSON.stringify(game.value.messages.map(msg => ({
                    role: msg.role,
                    content: msg.content,
                }))) }
            })
            game.value.messages.push({
                role: 'model',
                content: res.modelResponse
            })
        } catch (error) {
            console.log(error)
            
        }

    }
    return { game, gameId, startNewGame, newGame }    
})