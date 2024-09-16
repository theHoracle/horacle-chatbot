<script setup>
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/chat/new'
    }
})
</script>
<template>
    <div>
        This is the chat page
    </div>
</template>