<template>
  <div>
    <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <button>
        <div v-if="data?.user" class="bg-primary rounded-full relative overflow-hidden w-10 aspect-square">
        <NuxtImg 
        v-if="data.user.image" 
        :src="data?.user.image" 
        class="object-cover object-center"
        />
        <span class="sr-only">Profile</span>
        </div>
      </button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="signOut">
        <div class="flex items-center justify-end gap-2">
          <LogOut class="size-5" />
         <p>
          Logout
         </p>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import { LogOut } from 'lucide-vue-next';

const { data, signOut } = useAuth()
</script>

<style>

</style>