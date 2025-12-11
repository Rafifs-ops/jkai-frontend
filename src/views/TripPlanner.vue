<template>
    <div class="p-4 pb-20 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-kai-blue mb-4">🚆 AI Trip Planner</h1>

        <div v-if="!tripResult" class="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div>
                <label class="block text-sm font-bold mb-1">Tujuan</label>
                <input v-model="form.destination" type="text" class="w-full border p-2 rounded"
                    placeholder="Contoh: Yogyakarta">
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold mb-1">Durasi (Hari)</label>
                    <input v-model="form.days" type="number" class="w-full border p-2 rounded" placeholder="3">
                </div>
                <div>
                    <label class="block text-sm font-bold mb-1">Budget</label>
                    <input v-model="form.budget" type="text" class="w-full border p-2 rounded" placeholder="2 Juta">
                </div>
            </div>

            <div>
                <label class="block text-sm font-bold mb-1">Stasiun Awal</label>
                <input v-model="form.start_station" type="text" class="w-full border p-2 rounded"
                    placeholder="Stasiun Gambir">
            </div>

            <button @click="generateTrip" :disabled="loading"
                class="w-full bg-kai-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition flex justify-center">
                <span v-if="loading">Sedang Meracik Itinerary... 🤖</span>
                <span v-else>Buat Rencana Perjalanan</span>
            </button>
        </div>

        <div v-if="loading" class="text-center py-10">
            <div class="animate-spin text-4xl mb-4">⚙️</div>
            <p class="text-gray-500">AI sedang mencari rute kereta dan tempat wisata terbaik...</p>
        </div>

        <div v-if="tripResult && !loading" class="animate-fade-in">
            <button @click="tripResult = null" class="mb-4 text-sm text-kai-blue underline">← Buat Ulang</button>

            <div v-for="(day, index) in tripResult" :key="index" class="mb-8 relative">
                <div class="sticky top-20 z-10 bg-gray-50 py-2">
                    <h2
                        class="text-xl font-bold text-kai-blue bg-blue-100 inline-block px-4 py-1 rounded-full shadow-sm">
                        🗓️ Hari ke-{{ day.day }}
                    </h2>
                </div>

                <div v-if="day.transport_detail"
                    class="mt-4 mb-6 bg-gradient-to-r from-orange-50 to-white border-l-4 border-kai-orange p-4 rounded-r-lg shadow-sm">
                    <div class="flex items-start gap-3">
                        <span class="text-2xl">🚆</span>
                        <div>
                            <h3 class="font-bold text-gray-800">Transportasi All-in-One</h3>
                            <p class="text-sm text-gray-600">{{ day.transport_detail.route }}</p>
                            <p class="text-xs font-bold text-kai-blue mt-1">
                                {{ day.transport_detail.mode }}
                            </p>
                            <div
                                class="mt-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded inline-block font-bold">
                                Estimasi: {{ day.transport_detail.cost }}
                            </div>
                        </div>
                    </div>
                </div>

                <div class="space-y-6 border-l-2 border-gray-200 ml-3 pl-6 relative pb-4">
                    <div v-for="(activity, idx) in day.activities" :key="idx" class="relative group">
                        <div class="absolute -left-[33px] w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow-sm"
                            :class="{
                                'bg-blue-500': activity.category === 'Wisata',
                                'bg-red-500': activity.category === 'Kuliner',
                                'bg-purple-500': activity.category === 'Landmark'
                            }">
                            <span class="text-white">📍</span>
                        </div>

                        <div
                            class="bg-white p-4 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
                            <div class="flex justify-between items-start">
                                <div>
                                    <span
                                        class="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded mb-1 inline-block"
                                        :class="{
                                            'bg-blue-100 text-blue-700': activity.category === 'Wisata',
                                            'bg-red-100 text-red-700': activity.category === 'Kuliner',
                                            'bg-purple-100 text-purple-700': activity.category === 'Landmark'
                                        }">
                                        {{ activity.category || 'Wisata' }}
                                    </span>
                                    <h3 class="font-bold text-gray-800 text-lg">{{ activity.place_name }}</h3>
                                </div>
                                <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{{ activity.time }}</span>
                            </div>

                            <p class="text-sm text-gray-600 mt-2">{{ activity.description }}</p>

                            <a v-if="activity.social_link" :href="'https://' + activity.social_link" target="_blank"
                                class="text-xs text-kai-blue flex items-center gap-1 mt-2 hover:underline">
                                🔗 Cek Info/Menu
                            </a>

                            <div class="mt-3 flex items-center gap-2 text-xs text-gray-500">
                                <span>💵 {{ activity.estimated_cost }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../services/api';

const loading = ref(false);
const tripResult = ref(null);
const form = ref({
    destination: '',
    days: '',
    budget: '',
    start_station: ''
});

const generateTrip = async () => {
    if (!form.value.destination || !form.value.days) return alert("Mohon lengkapi data");

    loading.value = true;
    try {
        const res = await api.post('/ai/trip-planner', form.value);
        tripResult.value = res.data.plan; // Mengambil JSON array dari backend
    } catch (error) {
        console.error(error);
        alert("Gagal membuat rencana. Coba lagi.");
    } finally {
        loading.value = false;
    }
};
</script>