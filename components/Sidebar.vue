<script setup>
import {PanelRight, CirclePlus, Share} from "lucide-vue-next"</script>
<template>
    <div class="flex">
      <!-- Sidebar toggle button -->
      
  
      <!-- Sidebar -->
      <div :class="['fixed inset-y-0 left-0 w-64 bg-gray-900 text-white transform transition-transform duration-300', isOpen ? 'translate-x-0' : '-translate-x-full']">
        <nav class="p-4 flex flex-col">
            <div>
            <button @click="toggleSidebar"
            class="text-primary-foreground"
            >
                <PanelRight />
            </button>
        </div>
          <ul class="flex flex-col">
            <li class="m">
              <a href="#" class="block text-gray-100 bg-white/20 px-3 py-2 text-sm rounded w-full truncate">
                How does horacle work under the hood
              </a>
            </li>
           </ul>
        </nav>
      </div>

      <div class="flex flex-col w-full">
        <div class="h-16 py-2 px-4 flex items-center justify-between">
            <div class="flex items-center">
            <button @click="toggleSidebar" class="text-muted-foreground rounded-md mr-4">
         <PanelRight />
            </button>
            <CirclePlus v-if="!isOpen" />
            <span 
            class="transition-all duration-300"
            :class="isOpen ? 'translate-x-56' : 'translate-x-0 ml-4'"
            >Horacle</span>
            
            </div>
            <div class="flex items-center gap-4">
              <ThemeToggle />
              <UserMenu />
            </div>
        </div>
        <div class="h-full transition-all duration-300" :class="isOpen ? 'ml-64' : 'ml-0'">
        <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isOpen: false, // Sidebar visibility toggle state
      };
    },
    methods: {
      toggleSidebar() {
        this.isOpen = !this.isOpen; // Toggle sidebar state
      },
    },
  };
  </script>
  
  <style scoped>
  /* No additional styles needed since we are using Tailwind CSS */

  </style>
  