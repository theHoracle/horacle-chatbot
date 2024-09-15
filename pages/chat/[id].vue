
<template>
    <div class="size-full">
        <div class="">
            <!-- top nav -->
            <Sidebar>
                <div class="w-full h-full px-20">
                    <div>
                        <h1>Where should we start?</h1>
                        <input type="text" placeholder="Message HoracleAi" value="" />
                    </div>
                </div>
            </Sidebar>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                userInput: '',
                allMessages: []
            }
        },
        methods () {
            async sendMessage() {
                if (!this.userInput.trim()) return
            }
        },
    }
</script>