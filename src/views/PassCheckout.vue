<template>
    <div class="min-h-screen bg-gray-50 pb-40 font-sans">

        <div class="px-5 pt-6" v-if="passData">

            <h1 class="text-xl font-bold text-kai-blue mb-1">Customize Your Trip</h1>
            <p class="text-xs text-gray-400 mb-4">Lengkapi perjalananmu dengan add-on hemat</p>

            <div class="rounded-2xl p-4 text-white flex items-center gap-4 mb-4 shadow-lg relative overflow-hidden"
                :class="getTierColor(passData.tier_name)">
                <div class="absolute -right-6 -top-6 w-24 h-24 bg-white/20 rounded-full blur-xl"></div>

                <div
                    class="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm shrink-0 border border-white/30">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                </div>
                <div class="flex-1">
                    <h3 class="font-bold text-lg leading-tight">{{ passData.tier_name }} - {{
                        getTierSubtitle(passData.tier_name) }}</h3>
                    <div class="flex justify-between items-end mt-1">
                        <span class="text-xs opacity-90">{{ passData.duration_days }} hari</span>
                        <span class="font-bold text-lg">Rp{{ (passData.price).toLocaleString('id-ID') }}</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
                <h3 class="font-bold text-kai-blue mb-3">Pass Detail</h3>
                <div class="space-y-2">
                    <div v-for="(feat, idx) in passData.features" :key="idx" class="flex items-start gap-2">
                        <div
                            class="mt-0.5 w-4 h-4 rounded-full border border-orange-500 flex items-center justify-center shrink-0">
                            <svg class="w-2.5 h-2.5 text-orange-500" fill="none" stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                                    d="M5 13l4 4L19 7"></path>
                            </svg>
                        </div>
                        <span class="text-xs text-kai-blue font-medium">{{ feat }}</span>
                    </div>
                </div>
            </div>

            <h3 class="font-bold text-kai-blue mb-3 text-lg">Last Mile Add-ons</h3>
            <div class="space-y-3 mb-6">
                <label
                    class="bg-white rounded-2xl p-3 flex items-center gap-3 border-2 cursor-pointer transition-all shadow-sm"
                    :class="selectedGojek === 'basic' ? 'border-kai-blue bg-blue-50' : 'border-transparent'">
                    <input type="radio" v-model="selectedGojek" value="basic" class="hidden">
                    <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <span class="text-xl">🚘</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-kai-blue text-sm">Basic Package</h4>
                        <p class="text-[10px] text-gray-500">3x Gojek Voucher 20K Off</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] text-gray-400 line-through">Rp60.000</p>
                        <p class="font-bold text-kai-orange text-sm">Rp45.000</p>
                    </div>
                </label>

                <label
                    class="bg-white rounded-2xl p-3 flex items-center gap-3 border-2 cursor-pointer transition-all shadow-sm"
                    :class="selectedGojek === 'pro' ? 'border-kai-blue bg-blue-50' : 'border-transparent'">
                    <input type="radio" v-model="selectedGojek" value="pro" class="hidden">
                    <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <span class="text-xl">🚖</span>
                    </div>
                    <div class="flex-1">
                        <h4 class="font-bold text-kai-blue text-sm">Pro Package</h4>
                        <p class="text-[10px] text-gray-500">5x Gojek Voucher 20K Off</p>
                    </div>
                    <div class="text-right">
                        <p class="text-[10px] text-gray-400 line-through">Rp156.000</p>
                        <p class="font-bold text-kai-orange text-sm">Rp120.000</p>
                    </div>
                </label>
            </div>

            <h3 class="font-bold text-kai-blue mb-3 text-lg">Other Add-ons</h3>
            <label
                class="bg-white rounded-2xl p-3 flex items-center gap-3 border-2 cursor-pointer transition-all shadow-sm mb-6"
                :class="isPorterSelected ? 'border-kai-blue bg-blue-50' : 'border-transparent'">
                <input type="checkbox" v-model="isPorterSelected" class="hidden">
                <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                    <span class="text-xl">🧳</span>
                </div>
                <div class="flex-1">
                    <h4 class="font-bold text-kai-blue text-sm">Porter Service</h4>
                    <p class="text-[10px] text-gray-500 w-32 leading-tight">KAI service for carrying your luggage.</p>
                </div>
                <div class="text-right">
                    <p class="font-bold text-kai-orange text-sm">Rp38.000</p>
                </div>
            </label>

            <h3 class="font-bold text-kai-blue mb-3 text-lg">Payment Methods</h3>
            <div class="bg-white rounded-2xl p-4 shadow-sm flex items-center gap-3 border border-gray-100 mb-2">
                <div
                    class="w-10 h-8 bg-gradient-to-r from-orange-500 to-yellow-400 rounded flex items-center justify-center text-white font-bold italic text-xs shadow-sm">
                    KAI
                </div>
                <span class="font-bold text-kai-blue flex-1">KAIPay</span>
                <input type="radio" checked class="accent-kai-blue w-5 h-5">
            </div>

            <button
                class="w-full bg-white border border-gray-200 py-3 rounded-2xl text-xs text-gray-500 flex justify-between items-center px-4 mb-6">
                View all payment methods
                <span>→</span>
            </button>

        </div>

        <div v-if="passData"
            class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-5 px-6 pb-8 z-50 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
            <div>
                <p class="text-xs text-gray-500">Total</p>
                <p class="text-2xl font-bold text-kai-blue">Rp{{ totalPrice.toLocaleString('id-ID') }}</p>
            </div>
            <button @click="processPayment" :disabled="loading"
                class="bg-kai-blue text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition flex items-center gap-2">
                <svg v-if="!loading" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                </svg>
                <span v-else class="animate-spin">⏳</span>
                PAY NOW
            </button>
        </div>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '../services/api';

const router = useRouter();
const passData = ref(null);
const loading = ref(false);

// Add-ons State
const selectedGojek = ref(null); // 'basic' | 'pro' | null
const isPorterSelected = ref(false);

// Pricing Constants
const PRICES = {
    gojek_basic: 45000,
    gojek_pro: 120000,
    porter: 38000
};

onMounted(() => {
    // Ambil data pass yang dikirim dari halaman sebelumnya
    if (history.state.selectedPassData) {
        passData.value = JSON.parse(history.state.selectedPassData);
    } else {
        // Jika di-refresh dan data hilang, kembalikan ke list
        router.push('/nusantara-pass');
    }
});

const getTierColor = (name) => {
    if (name.includes('Bronze')) return 'bg-gradient-to-r from-[#D97706] to-[#B45309]';
    if (name.includes('Premium')) return 'bg-gradient-to-r from-[#2D3494] to-[#4F46E5]';
    return 'bg-gray-500';
};

const getTierSubtitle = (name) => {
    return name.includes('Premium') ? 'The Unlimited Overland' : 'The City Hopper';
};

const totalPrice = computed(() => {
    if (!passData.value) return 0;
    let total = passData.value.price;

    if (selectedGojek.value === 'basic') total += PRICES.gojek_basic;
    if (selectedGojek.value === 'pro') total += PRICES.gojek_pro;
    if (isPorterSelected.value) total += PRICES.porter;

    return total;
});

const processPayment = async () => {
    loading.value = true;
    try {
        // Mapping Addons untuk Backend
        // Backend mengharapkan { gojek: boolean, porter: boolean }
        // Kita sesuaikan logic sederhananya: Jika pilih basic/pro, gojek = true
        const addOnsPayload = {
            gojek: !!selectedGojek.value,
            porter: isPorterSelected.value,
            // (Opsional) Jika backend diupdate untuk terima detail paket, kirim detailnya:
            // gojek_package: selectedGojek.value 
        };

        await api.post('/pass/buy', {
            passId: passData.value._id,
            addOns: addOnsPayload
        });

        alert("🎉 Pembelian Berhasil! Terima kasih menggunakan KAIPay.");
        router.push('/profile');
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.msg || "Pembelian Gagal.");
    } finally {
        loading.value = false;
    }
};
</script>