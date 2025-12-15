<template>
    <div class="bg-gray-50 min-h-screen pb-24">

        <div class="relative w-full h-[500px] md:h-[600px] bg-gray-900 overflow-hidden">
            <img src="../assets/img/jumbotron-img.png"
                class="w-full h-full object-cover opacity-60" alt="Train Background">

            <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-black/30"></div>

            <button @click="goToGame"
                class="absolute top-4 right-4 z-20 bg-yellow-400 text-blue-900 px-4 py-2 rounded-full text-xs font-bold shadow-lg hover:bg-yellow-300 transition flex items-center gap-2 animate-pulse border-2 border-white/20">
                <span>🎮</span> Main Game
            </button>

            <div class="absolute bottom-0 left-0 w-full p-6 pb-28 md:pb-32 md:p-12 text-white max-w-7xl mx-auto">
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
                    <span class="bg-orange-500 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg">
                        Hero Product
                    </span>
                </div>

                <h1 class="text-3xl md:text-5xl font-extrabold leading-tight mb-2 drop-shadow-md">
                    Jelajahi Indonesia <br> dengan <span class="text-orange-500">KAI</span> <span class="text-orange-500">Nusantara Pass</span>
                </h1>
                
                <p class="text-sm md:text-lg text-gray-200 mb-6 opacity-90 leading-relaxed max-w-xl">
                    Tiket unlimited dengan fitur hop-on hop-off. Satu tiket untuk keliling seluruh Indonesia!
                </p>

                <router-link to="/nusantara-pass"
                    class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold px-6 py-3 rounded-full inline-flex items-center gap-2 transition shadow-lg transform active:scale-95">
                    Lihat Pass
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                    </svg>
                </router-link>
            </div>
        </div>

        <div class="px-4 md:px-8 -mt-16 relative z-30 mb-10 max-w-7xl mx-auto">
            <div class="bg-white rounded-2xl p-1 shadow-2xl border border-gray-100 flex flex-col md:flex-row overflow-hidden">
                
                <div class="bg-gradient-to-r from-blue-700 to-indigo-600 p-4 md:p-6 rounded-xl md:w-1/3 md:rounded-r-none text-white relative overflow-hidden flex items-center gap-4">
                    <div class="relative z-10 shrink-0">
                        <div class="w-14 h-14 bg-orange-500 rounded-full flex items-center justify-center border-2 border-white overflow-hidden shadow-md">
                            <img src="../assets/img/maskot-kai.png" alt="Loko" class="w-full h-full object-cover">
                        </div>
                    </div>
                    <div class="relative z-10">
                        <h2 class="font-bold text-lg leading-tight">Tanya LOKO</h2>
                        <p class="text-xs text-blue-200">Asisten Travel AI Kamu</p>
                    </div>
                    <div class="absolute -right-2 -bottom-4 text-8xl opacity-10 rotate-12">🤖</div>
                </div>

                <div class="p-4 md:p-6 md:w-2/3 bg-white flex flex-col justify-center">
                    <div class="bg-gray-100 rounded-full p-1.5 pl-4 flex items-center border border-gray-200 focus-within:ring-2 focus-within:ring-kai-blue focus-within:border-transparent transition">
                        <input v-model="aiQuery" @keyup.enter="getAiRecommendation" type="text"
                            :placeholder="langStore.t('searchPlaceholder')"
                            class="bg-transparent flex-grow text-sm text-gray-800 placeholder-gray-400 focus:outline-none w-full py-1">
                        
                        <button @click="getAiRecommendation"
                            class="bg-kai-orange w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-orange-600 transition text-white shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <line x1="22" x2="11" y1="2" y2="13" />
                                <polygon points="22 2 15 22 11 13 2 9 22 2" />
                            </svg>
                        </button>
                    </div>

                    <div v-if="aiResult" class="mt-3 bg-blue-50 p-3 rounded-lg text-xs md:text-sm leading-relaxed border border-blue-100 animate-fade-in">
                        <div class="flex justify-between mb-1">
                            <span class="font-bold text-kai-blue">💡 Saran Loko:</span>
                            <button @click="aiResult = null" class="text-gray-400 hover:text-red-500 font-bold">×</button>
                        </div>
                        <div v-html="aiResult" class="text-gray-700"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="max-w-7xl mx-auto px-4 md:px-8 space-y-10">

            <section>
                <div class="flex justify-between items-end mb-4 border-b pb-2 border-gray-200">
                    <div>
                        <h2 class="text-xl md:text-2xl font-bold text-kai-blue leading-none">Destinasi Populer</h2>
                        <p class="hidden md:block text-sm text-gray-500 mt-1">Pilihan wisata terbaik dekat stasiun</p>
                    </div>
                    <router-link to="/tourism" class="text-sm text-orange-500 font-bold hover:underline flex items-center gap-1">
                        Lihat Semua <span>→</span>
                    </router-link>
                </div>

                <div class="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scroll snap-x">
                    <TourismCard v-for="item in tourismList" :key="item._id" 
                        :title="item.name"
                        :location="item.location.city" 
                        :image="item.images[0]"
                        class="min-w-[200px] w-[200px] md:w-auto md:min-w-0 snap-center" 
                        @click="$router.push(`/pariwisata/${item._id}`)" />
                </div>
            </section>

            <section>
                <div class="flex justify-between items-end mb-4 border-b pb-2 border-gray-200">
                    <div>
                        <h2 class="text-xl md:text-2xl font-bold text-kai-blue leading-none">Cerita Perjalanan</h2>
                        <p class="hidden md:block text-sm text-gray-500 mt-1">Inspirasi liburan dari sobat KAI</p>
                    </div>
                    <router-link to="/blogs" class="text-sm text-orange-500 font-bold hover:underline flex items-center gap-1">
                        Lihat Semua <span>→</span>
                    </router-link>
                </div>

                <div class="flex overflow-x-auto md:grid md:grid-cols-4 gap-4 pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:overflow-visible hide-scroll snap-x">
                    <TourismCard v-for="blog in blogList" :key="blog._id" 
                        :title="blog.title" 
                        :location="blog.author"
                        :image="blog.image_cover" 
                        class="min-w-[200px] w-[200px] md:w-auto md:min-w-0 snap-center" 
                        @click="$router.push(`/blog/${blog._id}`)" />
                </div>
            </section>

        </div>
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

const goToGame = () => {
    if (authStore.isAuthenticated) {
        router.push('/game');
    } else {
        alert("Silakan Login terlebih dahulu untuk bermain game!");
        router.push('/login');
    }
};

const getAiRecommendation = async () => {
    if (!aiQuery.value) return;
    loading.value = true;
    aiResult.value = "Loko sedang mengetik...";

    try {
        const res = await api.post('/ai/recommendation', { query: aiQuery.value });
        aiResult.value = res.data.result;
    } catch (error) {
        console.error(error);
        aiResult.value = "Maaf, Loko sedang gangguan.";
    } finally {
        loading.value = false;
    }
};
</script>