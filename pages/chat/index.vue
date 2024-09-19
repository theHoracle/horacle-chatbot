<script setup>
definePageMeta({
    // auth: {
    //     unauthenticatedOnly: true,
    //     navigateAuthenticatedTo: '/chat/new'
    // }
})
</script>
<template>
    <Sidebar>
        <div class="flex h-[calc(100lvh-64px)] items-center justify-center">
            <div class="w-4/5 max-h-fit ">
                <ChatIntro />
            </div>
        </div>
    </Sidebar>
</template>