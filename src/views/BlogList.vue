<template>
    <div class="min-h-screen bg-gray-50 pb-32 font-sans">
        <div class="px-6 pt-6">
            <div class="text-center mb-6">
                <h1 class="text-2xl font-extrabold text-kai-blue mb-1">Blog & Artikel</h1>
                <p class="text-sm text-gray-500">Tips perjalanan dan inspirasi wisata</p>
            </div>

            <div class="relative mb-8">
                <span class="absolute left-4 top-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </span>
                <input v-model="searchQuery" type="text" placeholder="Cari artikel..."
                    class="w-full bg-white border border-gray-300 rounded-full py-2.5 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-kai-blue/50 focus:border-kai-blue transition shadow-sm placeholder-gray-400">
            </div>

            <div class="space-y-6">
                <div v-for="blog in filteredList" :key="blog._id" @click="$router.push(`/blog/${blog._id}`)"
                    class="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 group">

                    <div class="h-48 w-full overflow-hidden relative">
                        <img :src="blog.image_cover"
                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            alt="Cover">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    <div class="p-5">
                        <h3
                            class="font-bold text-kai-blue text-lg leading-tight mb-2 group-hover:text-kai-orange transition-colors">
                            {{ blog.title }}
                        </h3>

                        <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
                            {{ blog.content }}
                        </p>

                        <div class="flex items-center justify-between border-t border-dashed border-gray-100 pt-4">
                            <div class="flex items-center gap-2">
                                <div class="w-6 h-6 rounded-full border border-gray-200 overflow-hidden p-0.5 bg-white">
                                    <img src="../assets/img/maskot-kai.png" class="w-full h-full object-contain"
                                        alt="Loko">
                                </div>
                                <span class="text-[10px] font-bold text-gray-600 uppercase tracking-wide">
                                    {{ blog.author || 'LOKO' }}
                                </span>
                            </div>

                            <div class="flex items-center gap-1.5 text-gray-400 text-[10px] font-medium">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {{ formatDate(blog.release_date) }}
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="filteredList.length === 0" class="text-center py-10 opacity-60">
                    <p class="text-4xl mb-2">🤔</p>
                    <p class="text-sm text-gray-500">Artikel tidak ditemukan.</p>
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
        const res = await api.get('/content/blogs');
        list.value = res.data;
    } catch (error) {
        console.error("Gagal load blog", error);
    }
});

const filteredList = computed(() => {
    if (!searchQuery.value) return list.value;
    const query = searchQuery.value.toLowerCase();
    return list.value.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.content.toLowerCase().includes(query)
    );
});

const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};
</script>