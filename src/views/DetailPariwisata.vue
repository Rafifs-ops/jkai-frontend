<template>
    <div class="bg-white min-h-screen pb-28 relative">

        <div class="relative h-80 w-full overflow-hidden">
            <img :src="pariwisata.image" class="w-full h-full object-cover" alt="Wisata Image">

            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            <button @click="$router.back()"
                class="absolute top-6 left-6 bg-white/20 hover:bg-white/40 backdrop-blur-md p-2 rounded-full transition text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
            </button>

            <div class="absolute bottom-6 left-6 right-6 text-white">
                <h1 class="text-3xl font-bold mb-1 shadow-black/50 drop-shadow-md">{{ pariwisata.name }}</h1>
                <p class="text-sm opacity-90 flex items-center gap-1 drop-shadow-md">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                        </path>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    {{ pariwisata.location?.address }}
                </p>
            </div>
        </div>

        <div class="bg-white relative z-10 px-5 pt-2">

            <div class="flex items-center justify-center bg-gray-100 p-1 rounded-xl mb-6">
                <button @click="activeTab = 'detail'"
                    class="flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300"
                    :class="activeTab === 'detail' ? 'bg-white text-kai-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'">
                    Detail
                </button>
                <button @click="activeTab = 'map'"
                    class="flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300"
                    :class="activeTab === 'map' ? 'bg-white text-kai-blue shadow-sm' : 'text-gray-400 hover:text-gray-600'">
                    Map
                </button>
            </div>

            <div v-if="activeTab === 'detail'" class="animate-fade-in space-y-6">
                <div class="p-4 rounded-2xl border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                    <p class="text-gray-600 text-sm leading-relaxed text-justify">{{ pariwisata.description }}</p>
                </div>

                <div class="flex items-center gap-4 py-2">
                    <div
                        class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-2xl text-kai-blue shrink-0">
                        🚆
                    </div>
                    <div>
                        <p class="text-xs font-bold text-gray-800">Stasiun Terdekat:
                            <span class="text-kai-orange">{{ pariwisata.nearest_station }}</span>
                        </p>
                        <p class="text-xs text-kai-orange font-bold mt-0.5">{{ pariwisata.distance }} km</p>
                    </div>
                </div>

                <div class="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div class="flex items-center gap-3 mb-3">

                        <div
                            class="w-10 h-10 bg-kai-orange rounded-full flex items-center justify-center shadow-md overflow-hidden p-1">
                            <img src="../assets/img/maskot-kai.png" class="w-full h-full object-contain" alt="AI Mascot">
                        </div>
                        <div>
                            <h3 class="font-bold text-gray-800 text-sm">AI Analyze Review</h3>
                            <p class="text-[10px] text-gray-500">Review berdasarkan Google review dan media sosial</p>
                        </div>
                    </div>

                    <div v-if="reviewAnalysis"
                        class="bg-white p-3 rounded-xl border border-gray-100 mb-3 animate-fade-in">
                        <p class="italic text-xs text-gray-600 mb-2">"{{ reviewAnalysis.summary }}"</p>
                        <div class="flex flex-wrap gap-1">
                            <span v-for="(pro, idx) in reviewAnalysis.pros" :key="idx"
                                class="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-bold">
                                {{ pro }}
                            </span>
                        </div>
                    </div>

                    <button @click="analyzeReviews" :disabled="analyzing"
                        class="w-full bg-kai-blue text-white py-3 rounded-xl text-sm font-bold shadow-md hover:bg-blue-800 transition flex justify-center items-center gap-2">
                        <span v-if="analyzing" class="animate-spin">⏳</span>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path
                                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z">
                            </path>
                        </svg>
                        {{ analyzing ? 'Analyzing...' : 'Analyze Review' }}
                    </button>
                </div>
            </div>

            <div v-show="activeTab === 'map'"
                class="mt-4 animate-fade-in h-80 w-full rounded-2xl overflow-hidden shadow-inner bg-gray-200 border">
                <div id="map" class="h-full w-full z-0"></div>
            </div>
        </div>

        <div
            class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 px-6 pb-6 flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-40 rounded-t-3xl">
            <div>
                <p class="text-[10px] text-gray-500 font-medium">Mulai dari</p>
                <p class="text-2xl font-bold text-kai-blue">Rp 85.000</p>
            </div>
            <button @click="openBooking"
                class="bg-kai-orange text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition flex items-center gap-2 transform active:scale-95">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                    <polyline points="17 21 17 13 7 13 7 21"></polyline>
                    <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Book Train Ticket
            </button>
        </div>

        <div v-if="showBookingModal" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div
                class="bg-white w-full max-w-lg rounded-2xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">
                <div class="p-4 border-b bg-kai-blue text-white flex justify-between items-center">
                    <h3 class="font-bold">Booking Train Ticket</h3>
                    <button @click="showBookingModal = false"
                        class="text-white/80 hover:text-white font-bold text-xl">✕</button>
                </div>

                <div class="bg-gray-100 h-1 w-full">
                    <div class="bg-kai-orange h-1 transition-all duration-300"
                        :style="{ width: (bookingStep / 6 * 100) + '%' }"></div>
                </div>

                <div class="p-6 overflow-y-auto flex-1">
                    <div v-if="bookingStep === 1" class="space-y-4">
                        <h4 class="font-bold text-lg text-kai-blue">1. Pilih Jadwal & Kereta</h4>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Tanggal Keberangkatan</label>
                            <input v-model="bookingForm.date" type="date"
                                class="w-full p-2 border rounded focus:ring-2 focus:ring-kai-blue outline-none">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Jumlah Penumpang</label>
                            <input v-model.number="bookingForm.paxCount" type="number" min="1" max="4"
                                class="w-full p-2 border rounded focus:ring-2 focus:ring-kai-blue outline-none">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Pilih Kereta</label>
                            <div class="space-y-2 mt-1">
                                <div v-for="train in availableTrains" :key="train.name"
                                    @click="bookingForm.selectedTrain = train"
                                    class="p-3 border rounded-lg cursor-pointer flex justify-between items-center hover:bg-blue-50 transition"
                                    :class="bookingForm.selectedTrain?.name === train.name ? 'border-kai-blue bg-blue-50 ring-1 ring-kai-blue' : ''">
                                    <div>
                                        <p class="font-bold text-sm">{{ train.name }}</p>
                                        <p class="text-xs text-gray-500">{{ train.time }} • {{ train.class }}</p>
                                    </div>
                                    <p class="font-bold text-kai-orange">Rp {{ train.price.toLocaleString() }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="bookingStep === 2">
                        <h4 class="font-bold text-lg text-kai-blue mb-4">2. Data Penumpang</h4>
                        <div v-for="(pax, index) in bookingForm.passengers" :key="index"
                            class="bg-gray-50 p-3 rounded border mb-2">
                            <p class="text-xs font-bold text-gray-400 mb-2">Penumpang {{ index + 1 }}</p>
                            <input v-model="pax.name" placeholder="Nama Lengkap"
                                class="w-full p-2 border rounded mb-2 text-sm">
                            <input v-model="pax.id_card" placeholder="Nomor NIK / Paspor"
                                class="w-full p-2 border rounded text-sm">
                        </div>
                    </div>

                    <div v-if="bookingStep === 3">
                        <h4 class="font-bold text-lg text-kai-blue mb-2">3. Pilih Kursi</h4>
                        <div class="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg justify-items-center">
                            <div v-for="seat in seatMap" :key="seat.id" @click="selectSeat(seat.id)"
                                class="w-10 h-10 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition select-none"
                                :class="getSeatClass(seat.id)">
                                {{ seat.id }}
                            </div>
                        </div>
                    </div>

                    <div v-if="bookingStep === 4">
                        <h4 class="font-bold text-lg text-kai-blue mb-4">4. Tambahan</h4>
                        <div class="border p-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 cursor-pointer mb-4">
                            <input type="checkbox" v-model="bookingForm.insurance" class="w-5 h-5 accent-kai-blue">
                            <div>
                                <p class="font-bold text-sm">Asuransi</p>
                                <p class="text-xs text-gray-500">+Rp 10.000/pax</p>
                            </div>
                        </div>
                    </div>

                    <div v-if="bookingStep === 5">
                        <h4 class="font-bold text-lg text-kai-blue mb-4">5. Review</h4>
                        <div class="bg-gray-50 p-4 rounded-lg text-sm border space-y-2">
                            <div class="flex justify-between"><span>Kereta</span><span class="font-bold">{{
                                bookingForm.selectedTrain?.name }}</span></div>
                            <div class="flex justify-between"><span>Total</span><span
                                    class="font-bold text-kai-orange">Rp {{ calculateTotal().toLocaleString() }}</span>
                            </div>
                        </div>
                    </div>

                    <div v-if="bookingStep === 6" class="text-center py-4">
                        <h4 class="font-bold text-lg text-kai-blue mb-4">6. Pembayaran</h4>
                        <button @click="bookingForm.paymentMethod = 'QRIS'"
                            class="w-full p-4 border rounded-xl hover:border-kai-blue mb-2 flex items-center justify-center gap-2 font-bold"
                            :class="bookingForm.paymentMethod === 'QRIS' ? 'border-kai-blue bg-blue-50' : ''">QRIS</button>
                    </div>
                </div>

                <div class="p-4 border-t flex gap-3 bg-gray-50">
                    <button v-if="bookingStep > 1" @click="bookingStep--"
                        class="px-4 py-2 border rounded-lg font-bold text-gray-500 hover:bg-gray-200">Kembali</button>
                    <button v-if="bookingStep < 6" @click="nextStep"
                        class="flex-1 bg-kai-blue text-white py-2 rounded-lg font-bold hover:bg-blue-800 transition">Lanjut</button>
                    <button v-else @click="confirmPayment"
                        class="flex-1 bg-kai-orange text-white py-2 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition">Bayar
                        Sekarang</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';
import L from 'leaflet';

// --- LOGIC SCRIPT TETAP SAMA SEPERTI YANG ANDA BERIKAN SEBELUMNYA ---
// Saya menyalin logic inti agar fungsionalitas tidak hilang

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const pariwisata = ref({});
const activeTab = ref('detail');
const reviewAnalysis = ref(null);
const analyzing = ref(false);
const showBookingModal = ref(false);
const bookingStep = ref(1);

const availableTrains = [
    { name: "Argo Wilis", time: "08:00 - 14:30", class: "Eksekutif", price: 350000 },
    { name: "Turangga", time: "18:00 - 04:30", class: "Eksekutif", price: 340000 },
    { name: "Pasundan", time: "10:00 - 18:30", class: "Ekonomi", price: 150000 }
];

const seatMap = ref([]);
for (let r = 1; r <= 8; r++) { ['A', 'B', 'C', 'D'].forEach(c => seatMap.value.push({ id: `${r}${c}`, status: Math.random() > 0.8 ? 'taken' : 'avail' })); }

const bookingForm = reactive({ date: '', paxCount: 1, selectedTrain: null, passengers: [], selectedSeats: [], insurance: false, paymentMethod: 'QRIS' });

// Watch paxCount
watch(() => bookingForm.paxCount, (newVal) => {
    bookingForm.passengers = Array.from({ length: newVal }, () => ({ name: '', id_card: '', seat: null }));
    bookingForm.selectedSeats = [];
});

const openBooking = () => {
    if (!authStore.isAuthenticated) { alert("Silakan Login terlebih dahulu!"); router.push('/login'); return; }
    bookingStep.value = 1; bookingForm.paxCount = 1; showBookingModal.value = true;
};

const nextStep = () => {
    if (bookingStep.value === 1 && (!bookingForm.date || !bookingForm.selectedTrain)) return alert("Lengkapi data!");
    if (bookingStep.value === 3 && bookingForm.selectedSeats.length !== bookingForm.paxCount) return alert("Pilih kursi!");
    bookingStep.value++;
};

const selectSeat = (seatId) => {
    const seat = seatMap.value.find(s => s.id === seatId);
    if (seat.status === 'taken') return;
    if (bookingForm.selectedSeats.includes(seatId)) bookingForm.selectedSeats = bookingForm.selectedSeats.filter(id => id !== seatId);
    else if (bookingForm.selectedSeats.length < bookingForm.paxCount) bookingForm.selectedSeats.push(seatId);
};

const getSeatClass = (seatId) => {
    const seat = seatMap.value.find(s => s.id === seatId);
    if (seat.status === 'taken') return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (bookingForm.selectedSeats.includes(seatId)) return 'bg-kai-blue text-white';
    return 'bg-white border';
};

const calculateTotal = () => {
    if (!bookingForm.selectedTrain) return 0;
    let total = bookingForm.selectedTrain.price * bookingForm.paxCount;
    if (bookingForm.insurance) total += 10000 * bookingForm.paxCount;
    return total;
};

const confirmPayment = async () => {
    try {
        const passengerData = bookingForm.passengers.map((p, idx) => ({ name: p.name, id_card: p.id_card, type: 'Adult', seat_number: bookingForm.selectedSeats[idx] }));
        await api.post('/auth/booking', {
            pariwisata_name: pariwisata.value.name,
            train_name: bookingForm.selectedTrain.name,
            origin: "Jakarta (Gambir)", destination: pariwisata.value.nearest_station || "Bandung",
            date: bookingForm.date, passengers: passengerData,
            addons: { insurance: bookingForm.insurance, railfood: [] },
            payment: { method: bookingForm.paymentMethod, total_amount: calculateTotal() },
            train_type: 'long_haul'
        });
        alert("Pembayaran Berhasil! Tiket dikirim.");
        showBookingModal.value = false;
    } catch (error) { alert("Gagal bayar: " + error.message); }
};

onMounted(async () => {
    try {
        const res = await api.get(`/content/pariwisata/${route.params.id}`);
        pariwisata.value = {
            ...res.data,
            distance: res.data.nearest_station?.distance_km || 0,
            nearest_station: res.data.nearest_station?.name || 'Unknown',
            description: res.data.details?.summary || '',
            image: res.data.images?.[0] || 'https://via.placeholder.com/400',
            lat: res.data.location?.coordinates?.lat || -6.9175,
            lng: res.data.location?.coordinates?.lng || 107.6191
        };
    } catch (e) { console.error(e); }
});

const analyzeReviews = async () => {
    analyzing.value = true;
    try {
        const res = await api.post('/ai/analyze-reviews', { place_name: pariwisata.value.name, location: pariwisata.value.location?.address });
        reviewAnalysis.value = res.data;
    } catch (e) { alert("AI Analyze failed"); } finally { analyzing.value = false; }
};

// Map Logic
let map = null;
watch(activeTab, async (newVal) => {
    if (newVal === 'map') {
        await nextTick();
        if (!map) {
            map = L.map('map').setView([pariwisata.value.lat, pariwisata.value.lng], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
            L.marker([pariwisata.value.lat, pariwisata.value.lng]).addTo(map).bindPopup(pariwisata.value.name).openPopup();
        } else { setTimeout(() => { map.invalidateSize(); }, 200); }
    }
});
</script>

<style>
/* Animasi */
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

.leaflet-pane {
    z-index: 10 !important;
}
</style>