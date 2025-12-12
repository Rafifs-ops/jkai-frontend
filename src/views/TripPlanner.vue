<template>
    <div class="p-4 pb-24 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold text-kai-blue mb-4">🚆 AI Trip Planner</h1>

        <div v-if="!tripResult" class="bg-white p-6 rounded-xl shadow-md space-y-4">
            <div>
                <label class="block text-sm font-bold mb-1">Tujuan</label>
                <input v-model="form.destination" type="text" class="w-full border p-2 rounded"
                    placeholder="Contoh: Yogyakarta">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label class="block text-sm font-bold mb-1">Durasi</label>
                    <input v-model="form.days" type="number" class="w-full border p-2 rounded">
                </div>
                <div>
                    <label class="block text-sm font-bold mb-1">Budget</label>
                    <input v-model="form.budget" type="text" class="w-full border p-2 rounded">
                </div>
            </div>
            <div>
                <label class="block text-sm font-bold mb-1">Stasiun Awal</label>
                <input v-model="form.start_station" type="text" class="w-full border p-2 rounded">
            </div>

            <button @click="generateTrip" :disabled="loading"
                class="w-full bg-kai-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition flex justify-center">
                <span v-if="loading">Meracik Rencana... 🤖</span>
                <span v-else>Buat Rencana</span>
            </button>
        </div>

        <div v-else class="animate-fade-in">
            <div class="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm sticky top-0 z-20">
                <button @click="tripResult = null; currentTripId = null" class="text-sm text-gray-500">←
                    Kembali</button>
                <div class="flex gap-2">
                    <button @click="toggleEdit" class="text-sm px-3 py-1 border rounded"
                        :class="isEditing ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100'">
                        {{ isEditing ? 'Selesai Edit' : '✏️ Edit' }}
                    </button>
                    <button @click="saveCurrentTrip" class="text-sm px-3 py-1 bg-kai-blue text-white rounded font-bold">
                        💾 {{ currentTripId ? 'Update' : 'Simpan' }}
                    </button>
                </div>
            </div>

            <div v-for="(day, index) in tripResult" :key="index" class="mb-8 relative">
                <h2
                    class="text-xl font-bold text-kai-blue bg-blue-100 inline-block px-4 py-1 rounded-full shadow-sm mb-4">
                    Hari ke-{{ day.day }}
                </h2>

                <div v-if="day.transport_detail"
                    class="mb-6 bg-gradient-to-r from-orange-50 to-white border-l-4 border-kai-orange p-4 rounded-r-lg shadow-sm">
                    <h3 class="font-bold text-gray-800">Transportasi</h3>
                    <p v-if="!isEditing" class="text-sm">{{ day.transport_detail.mode }}</p>
                    <input v-else v-model="day.transport_detail.mode" class="w-full border p-1 rounded text-sm mt-1">
                </div>

                <div class="space-y-6 border-l-2 border-gray-200 ml-3 pl-6 relative">
                    <div v-for="(activity, idx) in day.activities" :key="idx" class="relative">
                        <div
                            class="absolute -left-[33px] w-6 h-6 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-[10px] shadow-sm text-white">
                            📍</div>

                        <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                            <div class="flex justify-between items-start gap-2">
                                <div class="w-full">
                                    <div v-if="!isEditing">
                                        <h3 class="font-bold text-gray-800 text-lg">{{ activity.place_name }}</h3>
                                        <span class="text-xs font-mono bg-gray-100 px-2 py-1 rounded">{{ activity.time
                                            }}</span>
                                    </div>
                                    <div v-else class="space-y-2">
                                        <input v-model="activity.place_name"
                                            class="w-full font-bold border-b border-gray-300 focus:outline-none focus:border-kai-blue"
                                            placeholder="Nama Tempat">
                                        <input v-model="activity.time" class="w-20 text-xs border p-1 rounded"
                                            placeholder="Jam">
                                    </div>
                                </div>
                            </div>
                            <p v-if="!isEditing" class="text-sm text-gray-600 mt-2">{{ activity.description }}</p>
                            <textarea v-else v-model="activity.description"
                                class="w-full text-sm border p-2 rounded mt-2" rows="2"></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '../services/api';
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
const loading = ref(false);
const tripResult = ref(null);
const isEditing = ref(false);
const currentTripId = ref(null); // ID jika sedang edit trip yang disimpan

const form = ref({ destination: '', days: '', budget: '', start_station: '' });

// Cek apakah ada data dari Profile (Fitur Load Saved Trip)
onMounted(() => {
    if (history.state.savedTripData) {
        const trip = history.state.savedTripData;
        tripResult.value = trip.itinerary;
        currentTripId.value = trip._id;
        form.value.destination = trip.destination;
        // Clear state agar tidak duplicate saat refresh
        history.replaceState({}, document.title);
    }
});

const generateTrip = async () => {
    if (!form.value.destination) return alert("Isi tujuan!");
    loading.value = true;
    try {
        const res = await api.post('/ai/trip-planner', form.value);
        tripResult.value = res.data.plan;
        currentTripId.value = null; // Reset ID karena ini trip baru
    } catch (error) {
        alert("Gagal generate trip");
    } finally {
        loading.value = false;
    }
};

const toggleEdit = () => {
    isEditing.value = !isEditing.value;
};

const saveCurrentTrip = async () => {
    if (!authStore.isAuthenticated) return alert("Login dulu untuk menyimpan!");

    try {
        const payload = {
            destination: form.value.destination,
            days: form.value.days,
            budget: form.value.budget,
            itinerary: tripResult.value
        };

        if (currentTripId.value) {
            // Update existing
            await api.put(`/trip/${currentTripId.value}`, { itinerary: tripResult.value });
            alert("Perubahan berhasil disimpan!");
        } else {
            // Save new
            const res = await api.post('/trip', payload);
            currentTripId.value = res.data.trip._id;
            alert("Rencana perjalanan berhasil disimpan ke Profil!");
        }
        isEditing.value = false;
    } catch (error) {
        console.error(error);
        alert("Gagal menyimpan.");
    }
};
</script>