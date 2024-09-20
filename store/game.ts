import { createStore } from "harlem";

// Define the initial state of the chat store
const STATE = {
    messages: [] as Array<{ sender: 'user' | 'bot'; content: string }>,
    score: 0,
    gameOver: false,
    isLoading: false, // To show loading state when waiting for a bot response
  };
export type TgameState = typeof state 

// Create the store with an initial state
export const {
    state,
    getter,
    mutation,
    action,
    ...store
} = createStore('chat', STATE)

export const addMessage = (sender: 'user' | 'bot', content: string) => {
    mutation('ADD_MESSAGE', (state) => {
        state.messages.push({ sender, content });
    });
};

export const setIsLoading = (isLoading: boolean) => {
    mutation('SET_IS_LOADING', (state) => {
        state.isLoading = isLoading;
    });
};

export const sendMessage = async (message: string) => {
    addMessage('user', message);
    setIsLoading(true);

    try {

        const response = await fetch('/api/horacle', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        console.log(response)
        const data = await response.json();
        addMessage('bot', data?.response);
    } catch (error) {
        console.error('Error sending message:', error);
    } finally {
        setIsLoading(false);
    }
};