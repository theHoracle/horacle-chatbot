<script setup lang="ts">
import { createId } from '@paralleldrive/cuid2';
import {computed} from 'vue';
import { useGameStore } from '~/stores/game';

const router = useRouter()
const { data} = useAuth()

const { startNewGame, gameId } = useGameStore()

const startGame = async (message:string) => {
    if(message.toLowerCase() === 'start') {
      await startNewGame({
        role: 'user',
        content: `Lets begin the game, my username is ${data.value?.user.username}`
      })
      if(gameId) router.push(`/game/${gameId}`) 
    }
    
}
</script>
<template>
    <div class="w-full mx-auto">
        <div class="flex items-center flex-col justify-center gap-6">
            <h1
            class="text-3xl font-bold tracking-tight leading-tight">
                Type in start to begin! 
            </h1>
            <MessageInput @send-message="startGame" :handle-message="startGame" />
        </div>
    </div>
</template>
