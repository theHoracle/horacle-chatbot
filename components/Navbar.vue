<script setup lang="ts">
import { buttonVariants } from '../components/ui/button';

const { status, data, signOut, signIn } = useAuth()

</script>

<template>
  <nav class="w-screen h-20 flex items-center justify-between gap-10 shadow px-10">
    <div class="flex-1">Horacle Logo</div>
    <div class="flex-[2] flex items-center justify-center">
      <ul class="flex space-x-8 items-center">
        <li>Home</li>
        <li>About</li>
        <li>More</li>
        <li>theHoracle</li>
      </ul>
    </div>
    <div v-if="status === 'unauthenticated'" class="flex-1 flex items-center gap-4 justify-end">
      <Button
      @click="signIn"
      >
         Login  
      </Button>
      <ThemeToggle />
    </div>
    <div v-if="status === 'authenticated'"
    class="flex-1 justify-end flex items-center gap-4"
    >
    <ThemeToggle />
    <UserMenu />
    </div>
  </nav>
</template>
