<script setup>
import { storeToRefs } from 'pinia';
import { useGameStore } from '@/stores/game';
import { useRouter } from 'vue-router';

definePageMeta({
  // Add any page meta if needed
});

const router = useRouter();
const gameStore = useGameStore();

// Use storeToRefs to make store properties reactive
const { hasActiveGame, gameId } = storeToRefs(gameStore);

// Watch the gameId from the store
watch(gameId, (newGameId) => {
  if (hasActiveGame.value && newGameId) {
    router.push(`/game/${newGameId}`);
  }
});

// Optional: Log for debugging
watchEffect(() => {
  console.log("gameId:", gameId.value);
  console.log("hasActiveGame:", hasActiveGame.value);
});
</script>

<template>
  <Sidebar>
    <div class="flex h-[calc(100lvh-64px)] items-center justify-center">
      <div class="w-4/5 max-h-fit">
        <GameIntro />
      </div>
    </div>
  </Sidebar>
</template>