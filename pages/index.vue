<script setup>
import { MoveRight } from 'lucide-vue-next';
</script>

<template>
    <header>
        <Navbar />
    </header>
    <div>
        <div class="w-screen h-[calc(100lvh-80px)] px-10 flex justify-start items-center">
            <div class="flex flex-col mb-10">
                <p>Presenting our new LLM</p>
                <h1 class="text-6xl font-bold tracking-tighter max-w-lg leading-tight uppercase">
                    Play Horacle Football Trivia
                </h1>
                <div>
                <NuxtLink to="/game"
                class="button-gradient block w-36 h-14"
                >
                   <div class="fancy-button flex items-center justify-center group">
                        <p class="relative z-10 text-lg text-white flex items-center gap-1.5  ">
                            Try it
                            <MoveRight class="group-hover:scale-110 group-hover:translate-x-1 transition-all"  />
                        </p>    
                    </div>
                </NuxtLink>
                </div>
            </div>
        </div>
    </div>
</template>
