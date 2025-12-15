<template>
    <div class="min-h-screen bg-gray-50 pb-32 font-sans">
        <div class="px-5 pt-6 max-w-lg mx-auto">

            <div class="flex items-center gap-4 mb-6">
                <div
                    class="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center p-1 border-2 border-white shadow-sm overflow-hidden">
                    <img src="../assets/img/maskot-kai.png"
                        class="w-full h-full object-cover transform scale-125 translate-y-1" alt="AI Mascot">
                </div>
                <div>
                    <h1 class="text-xl font-bold text-kai-blue">AI Trip Planner</h1>
                    <p class="text-xs text-gray-500">Rencanakan perjalanan dengan AI</p>
                </div>
            </div>

            <div v-if="!tripResult"
                class="bg-white rounded-3xl p-6 shadow-[0_5px_20px_rgba(0,0,0,0.05)] border border-gray-100 space-y-5">

                <div>
                    <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Tujuan
                    </label>
                    <input v-model="form.destination" type="text" placeholder="Contoh: Yogyakarta"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue transition">
                </div>

                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Durasi (Hari)
                        </label>
                        <select v-model="form.days"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue bg-white appearance-none">
                            <option value="" disabled selected>Pilih</option>
                            <option v-for="n in 7" :key="n" :value="n">{{ n }} Hari</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                            <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            Jumlah Orang
                        </label>
                        <input v-model="form.people" type="number" min="1" placeholder="1"
                            class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue transition">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        Stasiun Awal
                    </label>
                    <input v-model="form.start_station" type="text" placeholder="Contoh: Stasiun Gambir"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue transition">
                </div>

                <div>
                    <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Budget Total
                    </label>
                    <input v-model="form.budget" type="text" placeholder="Contoh: Rp 2.000.000"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue transition">
                </div>

                <div>
                    <label class="block text-sm font-bold text-kai-blue mb-2 flex items-center gap-2">
                        <svg class="w-4 h-4 text-kai-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Catatan
                    </label>
                    <input v-model="form.notes" type="text"
                        placeholder="Opsional (mis: Hindari seafood, wisata sejarah)"
                        class="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-kai-blue focus:ring-1 focus:ring-kai-blue transition">
                </div>

                <button @click="generateTrip" :disabled="loading"
                    class="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white font-bold py-4 rounded-xl hover:shadow-lg transition transform active:scale-95 flex justify-center items-center gap-2 shadow-md">
                    <span v-if="loading" class="animate-spin">⏳</span>
                    <span v-else class="flex items-center gap-2">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Buat Plan
                    </span>
                </button>
            </div>

            <div v-else class="animate-fade-in pb-10">

                <div
                    class="flex justify-between items-center mb-6 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm sticky top-16 z-30 border border-gray-100">
                    <button @click="confirmBack"
                        class="text-sm text-gray-500 font-medium px-2 hover:text-kai-blue transition flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Ulang
                    </button>

                    <div class="flex gap-2">
                        <button @click="isEditing = !isEditing"
                            class="text-xs px-4 py-2 rounded-xl font-bold border transition"
                            :class="isEditing ? 'bg-orange-100 text-orange-600 border-orange-200' : 'bg-gray-100 text-gray-600 border-gray-200'">
                            {{ isEditing ? '✅ Selesai Edit' : '✏️ Edit Plan' }}
                        </button>

                        <button @click="saveCurrentTrip"
                            class="text-xs px-4 py-2 bg-kai-blue text-white rounded-xl font-bold shadow-md hover:bg-blue-800 transition flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Simpan
                        </button>
                    </div>
                </div>

                <div v-for="(day, index) in tripResult" :key="index" class="mb-8 relative">
                    <div class="flex items-center gap-3 mb-4">
                        <h2
                            class="text-lg font-extrabold text-kai-blue bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
                            Hari ke-{{ day.day }}
                        </h2>
                        <div class="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <div v-if="day.transport_detail"
                        class="mb-6 bg-gradient-to-br from-white to-orange-50/50 border border-orange-100 p-5 rounded-2xl shadow-sm relative overflow-hidden group">
                        <div
                            class="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -mr-8 -mt-8 opacity-50">
                        </div>
                        <div class="relative z-10">
                            <h3 class="font-bold text-gray-800 flex items-center gap-2 text-sm mb-3">
                                <span class="bg-orange-100 p-1 rounded-md text-orange-600">🚂</span>
                                Transportasi
                            </h3>

                            <div v-if="!isEditing">
                                <p class="text-sm font-bold text-kai-blue">{{ day.transport_detail.mode }}</p>
                                <p class="text-xs text-gray-500 mt-0.5">{{ day.transport_detail.route }}</p>
                                <p class="text-sm font-bold text-kai-orange mt-2 text-right">{{
                                    day.transport_detail.cost }}</p>
                            </div>
                            <div v-else class="space-y-2">
                                <input v-model="day.transport_detail.mode"
                                    class="w-full text-xs border p-2 rounded bg-white" placeholder="Mode Transport">
                                <input v-model="day.transport_detail.route"
                                    class="w-full text-xs border p-2 rounded bg-white" placeholder="Rute">
                                <input v-model="day.transport_detail.cost"
                                    class="w-full text-xs border p-2 rounded bg-white" placeholder="Harga">
                            </div>
                        </div>
                    </div>

                    <div class="space-y-6 border-l-2 border-dashed border-gray-200 ml-4 pl-6 relative pb-2">
                        <div v-for="(activity, idx) in day.activities" :key="idx" class="relative group">

                            <div class="absolute -left-[33px] top-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center text-[10px] shadow-md text-white font-bold transition-colors"
                                :class="activity.category === 'Kuliner' ? 'bg-orange-500' : 'bg-kai-blue'">
                                {{ idx + 1 }}
                            </div>

                            <div
                                class="bg-white p-4 rounded-2xl shadow-[0_2px_15px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-blue-200 transition-all duration-300">

                                <div v-if="!isEditing">
                                    <div class="flex justify-between items-start gap-2 mb-1">
                                        <h3 class="font-bold text-gray-800 text-sm leading-tight">{{ activity.place_name
                                            }}</h3>
                                        <span
                                            class="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500 whitespace-nowrap">
                                            {{ activity.time }}
                                        </span>
                                    </div>

                                    <p class="text-xs text-gray-500 leading-relaxed mb-3">{{ activity.description }}</p>

                                    <div class="flex justify-between items-end border-t border-gray-50 pt-3 mt-1">
                                        <a :href="getGoogleMapsLink(activity.place_name)" target="_blank"
                                            class="flex items-center gap-1 text-[10px] font-bold text-kai-blue hover:underline bg-blue-50 px-2 py-1 rounded-lg transition hover:bg-blue-100">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 24 24"
                                                fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                                            </svg>
                                            Lihat di Peta
                                        </a>
                                        <p class="text-xs font-bold text-kai-orange">{{ activity.estimated_cost }}</p>
                                    </div>
                                </div>

                                <div v-else class="space-y-2 bg-gray-50 p-2 rounded-lg">
                                    <div class="flex gap-2">
                                        <input v-model="activity.place_name"
                                            class="flex-1 text-xs border border-gray-300 p-2 rounded focus:border-kai-blue outline-none"
                                            placeholder="Nama Tempat">
                                        <input v-model="activity.time"
                                            class="w-16 text-xs border border-gray-300 p-2 rounded focus:border-kai-blue outline-none"
                                            placeholder="Jam">
                                    </div>
                                    <textarea v-model="activity.description" rows="2"
                                        class="w-full text-xs border border-gray-300 p-2 rounded focus:border-kai-blue outline-none"
                                        placeholder="Deskripsi"></textarea>
                                    <input v-model="activity.estimated_cost"
                                        class="w-full text-xs border border-gray-300 p-2 rounded focus:border-kai-blue outline-none"
                                        placeholder="Estimasi Biaya">
                                </div>

                            </div>
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
const currentTripId = ref(null);
const isEditing = ref(false); // State untuk Mode Edit

const form = ref({
    destination: '',
    days: '',
    people: 1,
    budget: '',
    start_station: '',
    notes: ''
});

onMounted(() => {
    if (history.state.savedTripData) {
        const trip = history.state.savedTripData;
        tripResult.value = trip.itinerary; // Array itinerary
        currentTripId.value = trip._id;
        form.value.destination = trip.destination;
    }
});

// Helper untuk Generate Link Google Maps
const getGoogleMapsLink = (placeName) => {
    const query = `${placeName} ${form.value.destination}`;
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

const generateTrip = async () => {
    if (!form.value.destination || !form.value.days) return alert("Mohon lengkapi data!");

    loading.value = true;
    try {
        const res = await api.post('/ai/trip-planner', form.value);
        tripResult.value = res.data.plan;
        currentTripId.value = null; // Reset ID karena ini trip baru
        isEditing.value = false; // Reset mode edit
    } catch (error) {
        alert("Gagal membuat rencana perjalanan. Coba lagi.");
    } finally {
        loading.value = false;
    }
};

const saveCurrentTrip = async () => {
    if (!authStore.isAuthenticated) return alert("Login dulu untuk menyimpan!");

    // Matikan mode edit sebelum simpan agar data final yg terambil
    isEditing.value = false;

    try {
        const payload = {
            destination: form.value.destination,
            days: form.value.days,
            people: form.value.people,
            budget: form.value.budget,
            notes: form.value.notes,
            itinerary: tripResult.value // Mengirim data yang (mungkin) sudah diedit user
        };
        const res = await api.post('/trip', payload);
        currentTripId.value = res.data.trip._id;
        alert("Rencana perjalanan berhasil disimpan ke Profil!");
    } catch (error) {
        alert("Gagal menyimpan.");
    }
};

const confirmBack = () => {
    if (confirm("Yakin ingin buat rencana baru? Data saat ini akan hilang jika belum disimpan.")) {
        tripResult.value = null;
        currentTripId.value = null;
    }
}
</script>

<style scoped>
/* Custom animations */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
}
</style>