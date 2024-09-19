<script setup lang="ts">
import { ArrowUpFromDot } from 'lucide-vue-next';
import { ref, watch } from 'vue';

// Define message as a reactive reference
const message = ref('');

// Watch for changes in message and log it to the console
watch(message, (newMessage) => {
    console.log('message is: ', newMessage);
});
</script>

<template>
    <div class="w-full relative bg-gray-500 rounded-full flex items-center justify-end px-4 h-14">
        <input 
            type="text"
            v-model="message"
            class="absolute inset-y-4 inset-x-10 bg-transparent outline-none text-white" 
            placeholder="Send a message to HoracleAi, get your dream interview..." 
        />
        <button
            :class="`${message ? 'bg-red-500' : 'bg-gray-400'} transition rounded-full h-9 my-auto flex items-center justify-center aspect-square`"
        >
            <ArrowUpFromDot class="text-background" />
        </button>
    </div>
</template>
