<template>
    <div class="pb-24 min-h-screen bg-gray-900 text-white">
        <div class="px-6 pt-6">
            <div class="flex justify-center mb-4">
                <div
                    class="bg-orange-100 text-kai-orange px-4 py-1 rounded-full text-xs font-bold flex items-center gap-2 border border-orange-200 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    Hero Product
                </div>
            </div>

            <div class="text-center mb-8">
                <h1 class="text-2xl font-extrabold text-kai-blue mb-2">KAI Nusantara Pass</h1>
                <p class="text-sm text-gray-500 leading-relaxed px-4">
                    Tiket terusan unlimited dengan konsep hop-on hop-off. Satu pass untuk menjelajahi seluruh Indonesia!
                </p>
            </div>

            <div class="bg-gray-100 p-4 rounded-xl text-center mb-8">
                <p class="text-xs text-gray-500 italic">"Melayani Lebih Jauh, Menghubungkan Lebih Dekat."</p>
            </div>

            <h2 class="text-lg font-bold text-kai-blue mb-4">Pilih Tier Pass</h2>

            <div class="space-y-6">
                <div v-for="pass in passes" :key="pass._id" @click="selectPass(pass)"
                    class="bg-white rounded-3xl shadow-xl overflow-hidden border-2 transition-all duration-300 transform relative cursor-pointer"
                    :class="selectedPass?._id === pass._id ? 'border-kai-orange scale-[1.02]' : 'border-transparent hover:scale-[1.01]'">

                    <div class="p-5 text-white flex justify-between items-center relative overflow-hidden"
                        :class="getTierColor(pass.tier_name)">

                        <div
                            class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm z-10">
                            <span class="text-2xl">{{ pass.tier_name === 'Premium' ? '👑' : '⚡' }}</span>
                        </div>

                        <div class="z-10 flex-1 ml-4">
                            <h3 class="font-bold text-xl">{{ pass.tier_name }}</h3>
                            <p class="text-xs opacity-90">{{ pass.tier_name === 'Premium' ? 'The Unlimited Overland' :
                                'The City Hopper' }}</p>
                        </div>

                        <div class="z-10 bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
                            <span class="text-xs font-bold">🕒 {{ pass.duration_days }} Hari</span>
                        </div>

                        <div class="absolute -right-4 -top-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    </div>

                    <div class="p-6">
                        <h2 class="text-3xl font-bold text-kai-blue mb-1">
                            Rp{{ (pass.price).toLocaleString('id-ID') }}
                        </h2>
                        <p class="text-xs text-gray-400 font-bold uppercase tracking-wider mb-2">
                            {{ pass.tier_name === 'Premium' ? 'Backpacker & Road Tripper' : 'Business Traveler' }}
                        </p>

                        <p class="text-sm text-gray-600 mb-6 border-b border-dashed border-gray-200 pb-4">
                            {{ pass.description }}
                        </p>

                        <div class="space-y-3">
                            <div v-for="(feat, idx) in pass.features" :key="idx" class="flex items-start gap-3">
                                <div class="mt-0.5 rounded-full p-0.5"
                                    :class="pass.tier_name === 'Premium' ? 'bg-orange-100 text-orange-600' : 'bg-orange-50 text-orange-500'">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"
                                        stroke-linejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span class="text-sm font-medium text-gray-700">{{ feat }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-8 bg-white p-5 rounded-3xl shadow-lg border border-gray-50">
                <div class="flex items-center gap-2 mb-4 text-kai-blue">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
                    </svg>
                    <h3 class="font-bold text-sm">Terintegrasi dengan Moda Lain</h3>
                </div>
                <div class="flex flex-wrap gap-2">
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">KAI</span>
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">KRL</span>
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">LRT</span>
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">KA
                        Bandara</span>
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">Transjakarta</span>
                    <span
                        class="px-4 py-2 rounded-full border border-gray-200 text-xs font-bold text-kai-blue bg-gray-50">MRT</span>
                </div>
            </div>
        </div>

        <div class="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md p-6 border-t border-gray-200 z-50">
            <button @click="confirmPurchase"
                class="w-full text-white font-bold py-4 rounded-2xl shadow-xl transition transform active:scale-95 text-lg flex justify-center items-center gap-2"
                :class="selectedPass ? 'bg-kai-blue hover:bg-blue-800' : 'bg-gray-300 cursor-not-allowed'">
                {{ selectedPass ? `Beli ${selectedPass.tier_name} Pass` : 'Pilih Tier Pass' }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useRouter } from 'vue-router';

const router = useRouter();
const passes = ref([]);
const selectedPass = ref(null);
const addOns = ref({ gojek: false, porter: false });

onMounted(async () => {
    try {
        const res = await api.get('/pass');
        // Urutkan biar Bronze diatas/kiri
        passes.value = res.data.sort((a, b) => a.price - b.price);
    } catch (error) {
        console.error("Failed fetch passes", error);
    }
});

const getTierColor = (name) => {
    if (name.includes('Bronze')) return 'bg-gradient-to-r from-[#D97706] to-[#B45309]'; // Orange-Brownish
    if (name.includes('Premium')) return 'bg-gradient-to-r from-[#2D3494] to-[#4F46E5]'; // KAI Blue to Indigo
    return 'bg-gray-500';
};

const selectPass = (pass) => {
    selectedPass.value = pass;
};

const confirmPurchase = () => {
    if (!selectedPass.value) return;
    
    // Navigasi ke halaman Checkout dan bawa data pass via state
    router.push({ 
        name: 'PassCheckout', 
        state: { selectedPassData: JSON.stringify(selectedPass.value) } 
    });
};
</script>