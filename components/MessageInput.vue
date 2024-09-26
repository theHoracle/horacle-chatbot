<script setup lang="ts">
import { ArrowUpFromDot } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useGameStore } from '@/stores/game'


// Define props to receive message and handle message send
const props = defineProps({
  initialMessage: {
    type: String,
    default: ''
  },
  handleMessage: {
    type: Function
  }
});
const emit = defineEmits(['messageHandler']);

// Define message as a reactive reference, initialized with the prop value
const message = ref(props.initialMessage);

// Watch for changes in message and log it to the console
watch(message, (newMessage) => {
  console.log('message is: ', newMessage);
});

// Method to emit the message when the button is clicked
const messageHandler = async () => {
// TODO: Clean message better
  const cleanMessage = message.value.trim()
  if (cleanMessage) {
    emit('messageHandler', message.value);
    message.value = ''; // Clear the message after sending
  }
};
</script>

<template>
    <div class="w-full relative bg-gray-500 rounded-full flex items-center justify-end px-4 h-14">
        <input 
            type="text"
            v-model="message"
            @keydown.enter="messageHandler"
            class="absolute inset-y-4 inset-x-10 bg-transparent outline-none text-white placeholder:text-gray-300 border-0 focus:outline-none focus:ring-0" 
            placeholder="Reply theHoracle..." 
        />
        <button
            @click="messageHandler"
            :class="`${message ? 'bg-red-500' : 'bg-gray-400'} transition rounded-full h-9 my-auto flex items-center justify-center aspect-square`"
        >
            <ArrowUpFromDot  class="text-background" />
        </button>
    </div>
</template>
