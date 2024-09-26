<script setup lang="ts">
import { useGameStore } from '~/stores/game';

const { data } = useAuth()

const { startNewGame } = useGameStore()

const startGame = async (message:string) => {
    if(message.toLowerCase() === 'start') {
      await startNewGame(`Lets begin the game, my username is ${data.value?.user.username}`)
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
            <MessageInput @message-handler="startGame"/>
        </div>
    </div>
</template>
