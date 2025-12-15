<template>
    <div
        class="min-w-[200px] w-[200px] h-32 rounded-2xl overflow-hidden relative snap-center mx-2 cursor-pointer group">
        <img :src="image" alt="Wisata"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110">

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

        <div
            class="absolute top-2 right-2 bg-gray-800/80 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            <span class="text-yellow-400 text-[10px]">★</span>
            <span class="text-white text-[10px] font-bold">4.8</span>
        </div>

        <div class="absolute bottom-3 left-3 right-3">
            <h3 class="font-bold text-white text-sm leading-tight mb-0.5 truncate">{{ title }}</h3>
            <p class="text-[10px] text-gray-300 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
                {{ location }}
            </p>
        </div>
    </div>
</template>

<script setup>
defineProps({
    title: String,
    location: String,
    image: String
});
</script>