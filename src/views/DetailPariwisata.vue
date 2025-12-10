<template>
    <div class="bg-gray-50 min-h-screen pb-24 relative">
        <div class="relative h-64 bg-gray-300">
            <img :src="pariwisata.image" class="w-full h-full object-cover">
            <button @click="$router.back()"
                class="absolute top-4 left-4 bg-white/50 p-2 rounded-full backdrop-blur z-10">⬅️</button>
        </div>

        <div class="p-5 -mt-6 bg-white rounded-t-3xl relative z-10 shadow-lg min-h-[50vh]">
            <h1 class="text-2xl font-bold text-gray-800">{{ pariwisata.name }}</h1>
            <p class="text-gray-500 text-sm mt-1">📍 {{ pariwisata.location?.address }}</p>

            <div class="flex gap-4 border-b mt-6">
                <button @click="activeTab = 'detail'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'detail' }"
                    class="pb-2 flex-1">Detail</button>
                <button @click="activeTab = 'map'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'map' }"
                    class="pb-2 flex-1">Map & Location</button>
            </div>

            <div v-if="activeTab === 'detail'" class="mt-4 animate-fade-in">
                <div class="text-gray-700 text-sm leading-relaxed mb-6">{{ pariwisata.description }}</div>

                <div class="bg-blue-50 p-3 rounded-lg flex items-center gap-3 mb-6">
                    <span class="text-2xl">🚉</span>
                    <div>
                        <p class="font-bold text-sm text-kai-blue">Nearest Station: {{ pariwisata.nearest_station }}</p>
                        <p class="text-xs text-gray-600">{{ pariwisata.distance }} km away</p>
                    </div>
                </div>

                <div class="border-t pt-4">
                    <h3 class="font-bold text-lg mb-3">💬 AI Review Analysis</h3>
                    <button v-if="!reviewAnalysis" @click="analyzeReviews" :disabled="analyzing"
                        class="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm font-bold">
                        {{ analyzing ? 'Analyzing...' : '🔍 Analyze Reviews' }}
                    </button>
                    <div v-else class="bg-gray-100 p-3 rounded text-sm text-gray-700">
                        <p class="italic">"{{ reviewAnalysis.summary }}"</p>
                    </div>
                </div>
            </div>

            <div v-show="activeTab === 'map'" class="mt-4 animate-fade-in h-64 w-full rounded-xl overflow-hidden z-0">
                <div id="map" class="h-full w-full z-0"></div>
            </div>
        </div>

        <div
            class="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.1)] z-40">
            <div>
                <p class="text-xs text-gray-500">Starts from</p>
                <p class="text-lg font-bold text-kai-orange">IDR 85.000</p>
            </div>
            <button @click="openBooking"
                class="bg-kai-blue text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition">
                Book Train Ticket 🚆
            </button>
        </div>

        <div v-if="showBookingModal"
            class="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
            <div class="bg-white w-full max-w-md rounded-xl p-6 animate-slide-up">
                <h3 class="text-xl font-bold mb-4 text-kai-blue">Plan Your Trip</h3>

                <div class="space-y-4">
                    <div>
                        <label class="text-xs font-bold text-gray-500">Destination</label>
                        <input type="text" :value="pariwisata.name" disabled
                            class="w-full bg-gray-100 p-2 rounded border">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500">Travel Date</label>
                        <input v-model="bookingForm.date" type="date" class="w-full p-2 rounded border">
                    </div>
                    <div>
                        <label class="text-xs font-bold text-gray-500">Passengers</label>
                        <input v-model="bookingForm.pax" type="number" min="1" class="w-full p-2 rounded border">
                    </div>

                    <div>
                        <label class="text-xs font-bold text-gray-500">Select Train</label>
                        <select v-model="bookingForm.train" class="w-full p-2 rounded border">
                            <option value="Argo Wilis (Executive)">Argo Wilis (Executive) - IDR 350.000</option>
                            <option value="Turangga (Executive)">Turangga (Executive) - IDR 340.000</option>
                            <option value="Pasundan (Economy)">Pasundan (Economy) - IDR 150.000</option>
                        </select>
                    </div>
                </div>

                <div class="mt-6 flex gap-3">
                    <button @click="showBookingModal = false"
                        class="flex-1 py-3 text-gray-500 font-bold">Cancel</button>
                    <button @click="confirmBooking"
                        class="flex-1 bg-kai-orange text-white py-3 rounded-lg font-bold shadow-lg">
                        Confirm Booking
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import L from 'leaflet'; // Import Leaflet Core

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const pariwisata = ref({});
const activeTab = ref('detail');
const showBookingModal = ref(false);
const reviewAnalysis = ref(null);
const analyzing = ref(false);

const bookingForm = ref({
    date: '',
    pax: 1,
    train: 'Argo Wilis (Executive)'
});

// Load Data
onMounted(async () => {
    try {
        const res = await api.get(`/content/pariwisata/${route.params.id}`);
        pariwisata.value = {
            ...res.data,
            distance: res.data.nearest_station.distance_km,
            nearest_station: res.data.nearest_station.name,
            description: res.data.details.summary,
            image: res.data.images[0],
            lat: -7.6079, // Dummy Coord jika di DB kosong (Borobudur)
            lng: 110.2038
        };
    } catch (error) {
        console.error("Error load data", error);
    }
});

// Logic Peta (Leaflet)
let map = null;
watch(activeTab, async (newVal) => {
    if (newVal === 'map') {
        await nextTick(); // Tunggu DOM render
        if (!map) {
            // Inisialisasi Peta
            map = L.map('map').setView([pariwisata.value.lat, pariwisata.value.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Tambah Marker (Tanpa Custom Icon agar simpel)
            L.marker([pariwisata.value.lat, pariwisata.value.lng]).addTo(map)
                .bindPopup(pariwisata.value.name)
                .openPopup();
        } else {
            map.invalidateSize(); // Fix render issue saat tab switch
        }
    }
});

// Logic Booking
const openBooking = () => {
    // 1. Cek Login
    if (!authStore.isAuthenticated) {
        alert("Please login first to book tickets!");
        router.push('/login');
        return;
    }
    showBookingModal.value = true;
};

const confirmBooking = async () => {
    if (!bookingForm.value.date) return alert("Please select date");

    try {
        await api.post('/auth/booking', {
            pariwisata_name: pariwisata.value.name,
            train_name: bookingForm.value.train,
            origin: "Jakarta (Gambir)", // Simulasi default
            destination: pariwisata.value.nearest_station,
            date: bookingForm.value.date,
            passengers: bookingForm.value.pax,
            price: 350000 * bookingForm.value.pax // Simulasi harga
        });

        alert("Booking Success! Check your profile for tickets.");
        showBookingModal.value = false;
    } catch (error) {
        alert("Booking Failed");
        console.error(error);
    }
};

const analyzeReviews = async () => {
    analyzing.value = true;
    try {
        const res = await api.post('/ai/analyze-reviews', { reviews: pariwisata.value.reviews });
        reviewAnalysis.value = res.data;
    } catch (error) {
        console.error(error);
        alert("Gagal menganalisis review");
    } finally {
        analyzing.value = false;
    }
};
</script>

<style>
/* Animasi Modal */
.animate-slide-up {
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        transform: translateY(100%);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Leaflet z-index fix */
.leaflet-pane {
    z-index: 10 !important;
}
</style>