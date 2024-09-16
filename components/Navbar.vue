<script setup lang="ts">
import { buttonVariants } from '../components/ui/button';
</script>

<template>
  <nav class="w-screen h-20 flex items-center justify-between gap-10 shadow px-10">
    <div class="flex-1">Horacle Logo</div>
    <div class="flex-[2] flex items-center justify-center">
      <ul class="flex space-x-8 items-center">
        <li>Home</li>
        <li>About</li>
        <li>More</li>
        <li>Try Horacle Ai</li>
      </ul>
    </div>
    <div class="flex-1 flex items-center gap-4 justify-end">
      <NuxtLink 
      to="/login" 
      :class="buttonVariants({variant: 'ghost'})">Sign in</NuxtLink>
      <NuxtLink 
      to="/login"
      :class="buttonVariants({})"
      >
         Sign in
       
      </NuxtLink>
    </div>
  </nav>
</template>
