<script setup lang="ts">
import { sendMessage, state} from "@/store/game"

const allMessages = ref([
  { content: "Welcome to Football Trivia! Are you ready to test your knowledge?", isBot: true, score: 0, isAnimating: true },
])
</script>

<template>
    <div class="size-full">
        <div class="">
            <!-- top nav -->
            <Sidebar>
                <div class="">
                    <div class="relative w-4/5 mx-auto h-[calc(100lvh-64px)]">
                        <FootballTriviaChat :gameState="state" @sendMessage="sendMessage" />
                        <div class="absolute bottom-0 inset-x-0 flex flex-col items-center justify-center gap-1">
                            <div class="p-1 text-xs">
                                Horacle AI can make mistakes too. Verify important info.
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    </div>
</template>
