<template>
    <div class="p-4 pb-24 min-h-screen bg-gray-50">
        <h1 class="text-2xl font-bold text-kai-blue mb-4">Destinasi Wisata</h1>
        <div class="grid grid-cols-2 gap-4">
            <div v-for="item in list" :key="item._id" @click="$router.push(`/pariwisata/${item._id}`)"
                class="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer">
                <img :src="item.images[0]" class="h-32 w-full object-cover">
                <div class="p-3">
                    <h3 class="font-bold text-sm truncate">{{ item.name }}</h3>
                    <p class="text-xs text-gray-500 mt-1">📍 {{ item.location.city }}</p>
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
    const res = await api.get('/content/pariwisata');
    list.value = res.data;
});
</script>