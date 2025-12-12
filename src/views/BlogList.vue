<template>
    <div class="p-4 pb-24 min-h-screen bg-gray-50">
        <h1 class="text-2xl font-bold text-kai-blue mb-4">Cerita Perjalanan</h1>
        <div class="space-y-4">
            <div v-for="blog in list" :key="blog._id" @click="$router.push(`/blog/${blog._id}`)"
                class="bg-white rounded-xl shadow-md p-3 flex gap-3 cursor-pointer">
                <img :src="blog.image_cover" class="w-24 h-24 object-cover rounded-lg flex-shrink-0">
                <div class="flex flex-col justify-center">
                    <h3 class="font-bold text-gray-800 leading-tight mb-1">{{ blog.title }}</h3>
                    <p class="text-xs text-gray-500 line-clamp-2">{{ blog.content }}</p>
                    <span class="text-xs text-kai-orange mt-2">Baca selengkapnya →</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
const list = ref([]);
onMounted(async () => {
    const res = await api.get('/content/blogs');
    list.value = res.data;
});
</script>