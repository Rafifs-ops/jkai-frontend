<template>
    <div
        class="min-w-[200px] w-[200px] bg-white rounded-xl shadow-md overflow-hidden snap-center mx-2 cursor-pointer hover:shadow-lg transition">
        <img :src="image" alt="Wisata" class="h-32 w-full object-cover">
        <div class="p-3">
            <h3 class="font-bold text-kai-blue text-sm truncate">{{ title }}</h3>
            <p class="text-xs text-gray-500 flex items-center gap-1">
                📍 {{ location }}
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