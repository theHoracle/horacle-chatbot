<script setup lang="ts">
const {} = defineProps(['firstMessage'])
const firstMessage = ref('')
</script>
<template>
    <div class="w-full mx-auto">
        <div class="flex items-center flex-col justify-center gap-6">
            <h1
            class="text-3xl font-bold tracking-tight leading-tight"
            >Create your resume in one click!</h1>
            <MessageInput />
        </div>
    </div>
</template>
