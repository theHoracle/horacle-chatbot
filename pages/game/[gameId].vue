<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const gameId = route.params.gameId

const { hasActiveGame, initializeGame, game } = useGameStore()
const isActiveGame = ref(hasActiveGame)
onMounted(async () => {
  if (typeof gameId === 'string' && isActiveGame.value) {
    return 
} else if(typeof gameId === 'string' && !isActiveGame.value) {
    try {
        await initializeGame(gameId);
        console.log(game)
        console.log("Game initialized!")
    } catch (error) {
        router.push('/game')
    }
} else {
    // Redirect to the main game page if there's no active game 0r sum
    router.push('/');
}
});

</script>

<template>
    <div class="size-full">
        <div class="">
            <!-- top nav -->
            <Sidebar>
                <div class="">
                    <div class="relative w-4/5 mx-auto h-[calc(100lvh-64px)]">
                        <FootballTriviaChat :gameId="gameId" />
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
