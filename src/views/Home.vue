<template>
    <div class="bg-gray-50 min-h-screen pb-24">

        <div class="relative w-full h-72 bg-gray-800 overflow-hidden">
            <img src="../assets/img/jumbotron-img.png"
                class="w-full h-full object-cover opacity-60" alt="Train Background">

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

            <button @click="goToGame"
                class="absolute top-4 right-4 z-20 bg-yellow-400 text-blue-900 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg hover:bg-yellow-300 transition flex items-center gap-1 animate-pulse border-2 border-white/20">
                🎮 Main Game
            </button>

            <div class="absolute bottom-20 left-4 right-4 text-white">
                <div class="flex items-center gap-2 mb-2">
                    <div class="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <rect x="2" y="6" width="20" height="12" rx="2" />
                            <path d="M12 12h.01" />
                            <path d="M17 12h.01" />
                            <path d="M7 12h.01" />
                        </svg>
                    </div>
                    <span class="ml-auto bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full">Hero
                        Product</span>
                </div>

                <h1 class="text-2xl font-bold leading-tight mb-1">
                    Jelajahi Indonesia <br> dengan <span class="text-orange-500">KAI</span> <br> <span
                        class="text-orange-500">Nusantara Pass</span>
                </h1>
                <p class="text-xs text-gray-200 mb-4 opacity-90 leading-relaxed max-w-[80%]">
                    Tiket unlimited dengan hop-on hop-off. Jelajahi seluruh Indonesia dengan satu pass!
                </p>

                <router-link to="/nusantara-pass"
                    class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-2.5 rounded-full inline-flex items-center gap-2 transition shadow-lg">
                    Lihat Pass
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </router-link>
            </div>
        </div>

        <div class="px-4 -mt-12 relative z-10 mb-8">
            <div class="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-2xl p-4 shadow-xl text-white">
                <div class="flex items-center gap-3 mb-4">
                    <div class="relative">
                        <div
                            class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white overflow-hidden">
                            <img src="../assets/img/maskot-kai.png" alt="Loko" class="w-full h-full object-cover">
                        </div>
                        <div
                            class="absolute -bottom-1 -right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-white">
                        </div>
                    </div>
                    <div>
                        <h2 class="font-bold text-lg">Talk with LOKO</h2>
                        <p class="text-xs text-blue-200">Your AI travel assistant</p>
                    </div>
                </div>

                <div
                    class="bg-white/20 backdrop-blur-md rounded-full p-1 pl-4 flex items-center border border-white/20">
                    <input v-model="aiQuery" @keyup.enter="getAiRecommendation" type="text"
                        :placeholder="langStore.t('searchPlaceholder')"
                        class="bg-transparent flex-grow text-sm text-white placeholder-blue-200 focus:outline-none w-full">
                    <button @click="getAiRecommendation"
                        class="bg-orange-500 w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round">
                            <line x1="22" x2="11" y1="2" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                    </button>
                </div>

                <div v-if="aiResult"
                    class="mt-3 bg-white/10 p-3 rounded-lg text-xs leading-relaxed border border-white/10">
                    <div class="flex justify-between mb-1">
                        <span class="font-bold text-orange-300">Loko menyarankan:</span>
                        <button @click="aiResult = null">x</button>
                    </div>
                    <div v-html="aiResult"></div>
                </div>
            </div>
        </div>

        <section class="px-4 mb-8">
            <div class="flex justify-between items-end mb-4">
                <h2 class="text-lg font-bold text-kai-blue leading-none">Destinasi Populer</h2>
                <router-link to="/tourism" class="text-xs text-orange-500 font-bold hover:underline">Lihat
                    Semua</router-link>
            </div>

            <div class="flex overflow-x-auto hide-scroll pb-2 -mx-4 px-4 snap-x">
                <TourismCard v-for="item in tourismList" :key="item._id" :title="item.name"
                    :location="item.location.city" :image="item.images[0]"
                    @click="$router.push(`/pariwisata/${item._id}`)" />
            </div>
        </section>

        <section class="px-4 mb-8">
            <div class="flex justify-between items-end mb-4">
                <h2 class="text-lg font-bold text-kai-blue leading-none">Cerita Perjalanan</h2>
                <router-link to="/blogs" class="text-xs text-orange-500 font-bold hover:underline">Lihat
                    Semua</router-link>
            </div>

            <div class="flex overflow-x-auto hide-scroll pb-2 -mx-4 px-4 snap-x">
                <TourismCard v-for="blog in blogList" :key="blog._id" :title="blog.title" :location="blog.author"
                    :image="blog.image_cover" @click="$router.push(`/blog/${blog._id}`)" />
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import TourismCard from '../components/TourismCard.vue';
import api from '../services/api';
import { useLangStore } from '../stores/lang';
import { useAuthStore } from '../stores/auth';

const langStore = useLangStore();
const authStore = useAuthStore();
const router = useRouter();

const tourismList = ref([]);
const blogList = ref([]);
const aiQuery = ref('');
const aiResult = ref(null);
const loading = ref(false);

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

// LOGIKA GAME (Dikembalikan)
const goToGame = () => {
    if (authStore.isAuthenticated) {
        router.push('/game');
    } else {
        alert("Silakan Login terlebih dahulu untuk bermain game dan mendapatkan poin!");
        router.push('/login');
    }
};

const getAiRecommendation = async () => {
    if (!aiQuery.value) return;
    loading.value = true;
    aiResult.value = "Sedang mengetik...";

    try {
        const res = await api.post('/ai/recommendation', { query: aiQuery.value });
        aiResult.value = res.data.result;
    } catch (error) {
        console.error(error);
        aiResult.value = "Maaf, Loko sedang sibuk.";
    } finally {
        loading.value = false;
    }
};
</script>