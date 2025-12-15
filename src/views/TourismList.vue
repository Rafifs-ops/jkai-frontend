<template>
    <div class="min-h-screen bg-white pb-24">
        <div class="px-5 pt-6 pb-2">
            <h1 class="text-2xl font-bold text-kai-blue">Destinasi Pariwisata</h1>
            <p class="text-kai-blue text-sm opacity-80 mt-1">Temukan tempat wisata terbaik di Indonesia</p>
        </div>

        <div class="px-5 mb-6">
            <div class="relative">
                <input v-model="searchQuery" type="text" placeholder="Cari destinasi wisata..."
                    class="w-full bg-kai-orange text-white placeholder-white/80 px-12 py-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-300 transition">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white absolute left-4 top-3.5" fill="none"
                    viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>
        </div>

        <div class="px-5 space-y-4">
            <div v-for="item in filteredList" :key="item._id" @click="$router.push(`/pariwisata/${item._id}`)"
                class="bg-white rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100 p-3 flex gap-4 cursor-pointer hover:bg-gray-50 transition relative overflow-hidden">

                <div class="w-24 h-24 flex-shrink-0">
                    <img :src="item.images[0]" class="w-full h-full object-cover rounded-xl" alt="Wisata">
                </div>

                <div class="flex-1 flex flex-col justify-center relative z-10">
                    <div class="flex justify-between items-start">
                        <h3 class="font-bold text-kai-blue text-lg leading-tight">{{ item.name }}</h3>
                        <div class="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded text-xs">
                            <span class="text-orange-400">★</span>
                            <span class="font-bold text-gray-600">4.8</span>
                        </div>
                    </div>

                    <p class="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                            </path>
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        </svg>
                        {{ item.location.city }}
                    </p>

                    <div class="mt-3 pt-2 border-t border-dashed border-gray-100 flex items-center justify-between">
                        <p class="text-xs text-kai-blue font-medium flex items-center gap-1.5">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                            </svg>
                            Stasiun {{ item.nearest_station?.name || 'Terdekat' }}
                        </p>

                        <svg class="w-5 h-5 text-kai-blue opacity-50" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import api from '../services/api';

const list = ref([]);
const searchQuery = ref('');

onMounted(async () => {
    try {
        const res = await api.get('/content/pariwisata');
        list.value = res.data;
    } catch (error) {
        console.error("Gagal load data", error);
    }
});

const filteredList = computed(() => {
    if (!searchQuery.value) return list.value;
    return list.value.filter(item =>
        item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        item.location.city.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});
</script>