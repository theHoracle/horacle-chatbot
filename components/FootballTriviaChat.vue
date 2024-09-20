<template>
  <div class="h-[600px] flex flex-col">
    <!-- Messages Section -->
    <div class="flex-1 overflow-y-auto p-4 space-y-4 transition-all" ref="chatContainer">
      <template v-for="(message, index) in gameState.messages" :key="index">
        <div :class="[
          'max-w-[80%] p-3 rounded-lg',
          message.sender === 'bot' ? 'bg-gray-200 self-start' : 'bg-primary w-fit text-white self-end ml-auto'
        ]">
          <div v-if="message.sender === 'bot'">
            <!-- Typing Animation only for the last message -->
            <div v-if="index === gameState.messages.length - 1 && gameState.isLoading" class="typing-animation">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div v-else>
              <!-- Display bot message content -->
              <div v-html="formatBotMessage(message.content)" :class="{ 'animate-typing': gameState.isLoading && index === gameState.messages.length - 1 }"></div>
            </div>
          </div>
          <div v-else>
            <!-- Display user message -->
            {{ message.content }}
          </div>
        </div>
      </template>
    </div>

    <!-- Score Display -->
    <div v-if="!gameState.gameOver" class="text-right font-bold mt-4">
      Score: {{ gameState.score }}
    </div>

    <!-- Game Over Message -->
    <div v-else class="text-center text-red-500 font-bold mt-4">
      Game Over! Final Score: {{ gameState.score }}
    </div>

    <!-- Input Section -->
    <div class="pb-2">
      <MessageInput @sendMessage="sendMessage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import MessageInput from './MessageInput.vue';
import type { TgameState } from '@/store/game';

const { gameState } = defineProps<{
  gameState: TgameState;
}>();

const emit = defineEmits(['sendMessage']);
const chatContainer = ref(null);

const formatBotMessage = (message: string) => {
  return message.replace(/Next question:/g, '<strong>Next question:</strong>');
};

const sendMessage = (message: string) => {
  if (message.trim()) {
    emit('sendMessage', message);
  }
};

const scrollToBottom = () => {
  if (chatContainer.value) {
    // @ts-ignore
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};

// Scroll to the bottom when new messages are added
watch(() => gameState.messages, () => {
  nextTick(() => {
    scrollToBottom();
  });
}, { deep: true });
</script>

<style scoped>
.typing-animation {
  display: flex;
  align-items: center;
  column-gap: 6px;
}

.typing-animation span {
  height: 10px;
  width: 10px;
  background: #333;
  border-radius: 50%;
  animation: bounce 0.5s alternate infinite;
}

.typing-animation span:nth-child(2) {
  animation-delay: 0.16s;
}

.typing-animation span:nth-child(3) {
  animation-delay: 0.32s;
}

@keyframes bounce {
  from {
    opacity: 0.4;
    transform: translateY(0);
  }
  to {
    opacity: 1;
    transform: translateY(-5px);
  }
}
</style>
