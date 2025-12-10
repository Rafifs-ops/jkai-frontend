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

            <div v-for="(day, index) in tripResult" :key="index" class="mb-8">
                <h2 class="text-xl font-bold text-kai-blue bg-blue-100 inline-block px-3 py-1 rounded-full mb-4">
                    🗓️ Hari ke-{{ day.day }}
                </h2>

                <div v-if="day.transport_recommendation"
                    class="mb-4 bg-orange-50 border-l-4 border-kai-orange p-3 text-sm">
                    🚂 <b>Transportasi:</b> {{ day.transport_recommendation }}
                </div>

                <div class="space-y-6 border-l-2 border-gray-200 ml-3 pl-6 relative">
                    <div v-for="(activity, idx) in day.activities" :key="idx" class="relative">
                        <div class="absolute -left-[31px] bg-kai-blue h-4 w-4 rounded-full border-2 border-white top-1">
                        </div>

                        <div class="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div class="flex justify-between items-start">
                                <h3 class="font-bold text-gray-800">{{ activity.place_name }}</h3>
                                <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{{ activity.time }}</span>
                            </div>
                            <p class="text-sm text-gray-600 mt-1">{{ activity.description }}</p>
                            <div class="mt-2 text-xs text-green-600 font-bold">
                                Estimasi: {{ activity.estimated_cost }}
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