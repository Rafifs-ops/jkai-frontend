<template>
    <div class="pb-24">
        <header class="bg-gradient-to-b from-kai-blue to-blue-800 text-white p-6 rounded-b-3xl shadow-lg">
            <div class="mb-6">
                <h1 class="text-2xl font-bold">{{ langStore.t('greeting') }}</h1>
                <p class="text-sm opacity-90">{{ langStore.t('subtitle') }}</p>
            </div>

            <div class="bg-white p-1 rounded-full shadow-xl flex items-center">
                <input v-model="aiQuery" @keyup.enter="getAiRecommendation" type="text"
                    :placeholder="langStore.t('searchPlaceholder')"
                    class="flex-grow px-4 py-2 text-gray-700 rounded-l-full focus:outline-none">
            </div>
        </header>

        <section class="mt-6 px-4">
            <h2 class="text-lg font-bold text-kai-blue mb-3">{{ langStore.t('popular') }}</h2>
            <div class="flex overflow-x-auto hide-scroll snap-x py-2 -mx-2 px-2 gap-3">
                <TourismCard v-for="item in tourismList" :key="item._id" :title="item.name"
                    :location="item.location.city" :image="item.images[0]"
                    @click="$router.push(`/pariwisata/${item._id}`)" />
            </div>
        </section>

        <section class="mt-8 px-4">
            <h2 class="text-lg font-bold text-kai-blue mb-3">{{ langStore.t('stories') }}</h2>
            <div class="flex overflow-x-auto hide-scroll snap-x gap-4 pb-4">
                <div v-for="blog in blogList" :key="blog._id"
                    class="min-w-[250px] w-[250px] bg-white rounded-lg shadow border border-gray-100 p-3 snap-center cursor-pointer"
                    @click="$router.push(`/blog/${blog._id}`)">
                    <img :src="blog.image_cover" class="w-full h-32 object-cover rounded mb-2">
                    <h3 class="font-bold text-gray-800 leading-tight">{{ blog.title }}</h3>
                    <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ blog.content }}</p>
                </div>
            </div>
        </section>

        <router-link to="/trip-planner"
            class="fixed bottom-6 right-6 bg-kai-orange text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2 font-bold z-40 hover:scale-105 transition">
            🗺️ Buat Rencana Trip
        </router-link>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TourismCard from '../components/TourismCard.vue';
import api from '../services/api';
import { useLangStore } from '../stores/lang';

const langStore = useLangStore();
const tourismList = ref([]);
const blogList = ref([]);
const aiQuery = ref('');
const aiResult = ref(null);
const loading = ref(false);

// Dummy Data (Nanti diganti fetch API dari database)
onMounted(async () => {
    try {
        const resWisata = await api.get('/content/pariwisata');
        tourismList.value = resWisata.data;

        const resBlog = await api.get('/content/blogs');
        blogList.value = resBlog.data;
    } catch (error) {
        console.error("Gagal load data", error);
    }
});

// Fungsi Panggil AI
const getAiRecommendation = async () => {
    if (!aiQuery.value) return;
    loading.value = true;
    aiResult.value = null;

    try {
        const res = await api.post('/ai/recommendation', { query: aiQuery.value });
        aiResult.value = res.data.result;
    } catch (error) {
        console.error(error);
        aiResult.value = "Maaf, AI sedang sibuk. Coba lagi nanti.";
    } finally {
        loading.value = false;
    }
};
</script>

<style>
/* Animasi Fade In */
.animate-fade-in {
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>