<template>
    <div class="pb-24 min-h-screen bg-gray-900 text-white">
        <div class="relative overflow-hidden bg-kai-blue py-10 px-6 rounded-b-3xl shadow-2xl">
            <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <h1 class="text-3xl font-bold mb-2">🎫 KAI Nusantara Pass</h1>
            <p class="text-blue-200 text-sm">Monthly Ticket War! Limited Quota.</p>
            <div class="mt-4 flex items-center gap-2 bg-red-600/80 w-fit px-3 py-1 rounded-full animate-pulse">
                <span class="text-xs font-bold">🔥 LIVE NOW</span>
            </div>
        </div>

        <div class="p-6 space-y-6 -mt-6">
            <div v-for="pass in passes" :key="pass._id"
                class="bg-white text-gray-800 rounded-xl overflow-hidden shadow-lg border-2"
                :class="pass.stock_sold >= pass.monthly_stock ? 'border-gray-300 opacity-75' : 'border-kai-orange'">

                <div class="p-5">
                    <div class="flex justify-between items-start">
                        <div>
                            <h3 class="font-bold text-xl text-kai-blue">{{ pass.tier_name }}</h3>
                            <p class="text-xs text-gray-500">{{ pass.duration_days }} Days Validity</p>
                        </div>
                        <div class="text-right">
                            <p class="text-lg font-bold text-kai-orange">Rp {{ (pass.price / 1000).toLocaleString() }}k
                            </p>
                        </div>
                    </div>

                    <p class="mt-3 text-sm text-gray-600 italic">"{{ pass.description }}"</p>

                    <div class="mt-4 space-y-2">
                        <div v-for="feat in pass.features" :key="feat" class="flex items-center gap-2 text-sm">
                            <span class="text-green-500">✔</span> {{ feat }}
                        </div>
                    </div>

                    <div class="mt-5">
                        <div class="flex justify-between text-xs font-bold mb-1">
                            <span>Sold: {{ pass.stock_sold }}/{{ pass.monthly_stock }}</span>
                            <span class="text-red-500" v-if="pass.monthly_stock - pass.stock_sold < 10">Hurry up!</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-2.5">
                            <div class="bg-kai-blue h-2.5 rounded-full transition-all duration-1000"
                                :style="{ width: (pass.stock_sold / pass.monthly_stock * 100) + '%' }"></div>
                        </div>
                    </div>
                </div>

                <div class="bg-gray-50 p-4 border-t border-gray-100">
                    <button @click="openPurchaseModal(pass)" :disabled="pass.stock_sold >= pass.monthly_stock"
                        class="w-full py-3 rounded-lg font-bold shadow-lg transition transform active:scale-95"
                        :class="pass.stock_sold >= pass.monthly_stock ? 'bg-gray-400 cursor-not-allowed text-white' : 'bg-kai-orange text-white hover:bg-orange-600'">
                        {{ pass.stock_sold >= pass.monthly_stock ? 'SOLD OUT' : 'Buy Pass' }}
                    </button>
                </div>
            </div>
        </div>

        <div v-if="selectedPass"
            class="fixed inset-0 bg-black/80 z-50 flex items-end sm:items-center justify-center p-4">
            <div class="bg-white w-full max-w-md rounded-xl p-6 animate-slide-up text-gray-800">
                <h3 class="text-xl font-bold mb-4 text-kai-blue">Customize Your Pass</h3>
                <p class="text-sm font-bold">{{ selectedPass.tier_name }}</p>
                <p class="text-xs text-gray-500 mb-4">Base Price: Rp {{ selectedPass.price.toLocaleString() }}</p>

                <div class="space-y-3 mb-6">
                    <p class="text-sm font-bold">Add-ons (Optional):</p>

                    <label class="flex items-center justify-between border p-3 rounded-lg cursor-pointer"
                        :class="addOns.gojek ? 'border-green-500 bg-green-50' : 'border-gray-200'">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" v-model="addOns.gojek" class="accent-green-600">
                            <div>
                                <p class="text-sm font-bold">Gojek Bundle (5x Trip)</p>
                                <p class="text-[10px] text-gray-500">Save 20% on local rides</p>
                            </div>
                        </div>
                        <span class="text-xs font-bold">+Rp 50k</span>
                    </label>

                    <label class="flex items-center justify-between border p-3 rounded-lg cursor-pointer"
                        :class="addOns.porter ? 'border-green-500 bg-green-50' : 'border-gray-200'">
                        <div class="flex items-center gap-2">
                            <input type="checkbox" v-model="addOns.porter" class="accent-green-600">
                            <div>
                                <p class="text-sm font-bold">KAI Porter Service</p>
                                <p class="text-[10px] text-gray-500">Hassle-free luggage</p>
                            </div>
                        </div>
                        <span class="text-xs font-bold">+Rp 30k</span>
                    </label>
                </div>

                <div class="flex justify-between items-center mb-6 pt-4 border-t">
                    <span class="text-sm font-bold text-gray-500">Total</span>
                    <span class="text-2xl font-bold text-kai-orange">Rp {{ calculateTotal().toLocaleString() }}</span>
                </div>

                <div class="flex gap-3">
                    <button @click="selectedPass = null" class="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                    <button @click="confirmPurchase"
                        class="flex-1 bg-kai-blue text-white py-3 rounded-lg font-bold shadow-lg">
                        Confirm Pay
                    </button>
                </div>
            </div>
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
        passes.value = res.data;
    } catch (error) {
        console.error("Failed fetch passes", error);
    }
});

const openPurchaseModal = (pass) => {
    selectedPass.value = pass;
    addOns.value = { gojek: false, porter: false };
};

const calculateTotal = () => {
    let total = selectedPass.value.price;
    if (addOns.value.gojek) total += 50000;
    if (addOns.value.porter) total += 30000;
    return total;
};

const confirmPurchase = async () => {
    try {
        await api.post('/pass/buy', {
            passId: selectedPass.value._id,
            addOns: addOns.value
        });
        alert("🎉 Purchase Successful! Your pass is active.");
        selectedPass.value = null;
        router.push('/profile');
    } catch (error) {
        alert(error.response?.data?.msg || "Purchase Failed");
    }
};
</script>