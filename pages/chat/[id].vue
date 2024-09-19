<script setup lang="ts">
import { sendMessage, state} from "@/store/chat"

const userMessage = ref('')
const chat = computed(() => state.messages)
const handleText = () => {
    if(userMessage.value.trim()) {
        sendMessage(userMessage.value)
        console.log("Sent")
    }
}
console.log("state: ",state)
</script>

<template>
    <div class="size-full">
        <div class="">
            <!-- top nav -->
            <Sidebar>
                <div class="">
                    <div class="relative w-4/5 mx-auto h-[calc(100lvh-64px)]">
                        <div class="absolute bottom-0 inset-x-0 flex flex-col items-center justify-center gap-1">
                            <MessageInput />
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
