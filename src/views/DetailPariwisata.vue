<template>
    <div class="bg-gray-50 min-h-screen pb-24 relative">
        <div class="relative h-64 bg-gray-300">
            <img :src="pariwisata.image" class="w-full h-full object-cover" alt="Wisata Image">
            <button @click="$router.back()"
                class="absolute top-4 left-4 bg-white/50 p-2 rounded-full backdrop-blur z-10 hover:bg-white transition">
                ⬅️
            </button>
        </div>

        <div class="p-5 -mt-6 bg-white rounded-t-3xl relative z-10 shadow-lg min-h-[50vh]">
            <h1 class="text-2xl font-bold text-gray-800">{{ pariwisata.name }}</h1>
            <p class="text-gray-500 text-sm mt-1">📍 {{ pariwisata.location?.address }}</p>

            <div class="flex gap-4 border-b mt-6">
                <button @click="activeTab = 'detail'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'detail' }"
                    class="pb-2 flex-1 text-gray-500">Detail</button>
                <button @click="activeTab = 'map'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'map' }"
                    class="pb-2 flex-1 text-gray-500">Map & Location</button>
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
                        class="w-full bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm font-bold hover:bg-indigo-200 transition">
                        {{ analyzing ? 'Analyzing...' : '🔍 Analyze Reviews' }}
                    </button>
                    <div v-else class="bg-gray-100 p-3 rounded text-sm text-gray-700">
                        <p class="italic mb-2">"{{ reviewAnalysis.summary }}"</p>
                        <div v-if="reviewAnalysis.pros" class="flex flex-wrap gap-1">
                            <span v-for="(pro, idx) in reviewAnalysis.pros" :key="idx"
                                class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {{ pro }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-show="activeTab === 'map'"
                class="mt-4 animate-fade-in h-64 w-full rounded-xl overflow-hidden z-0 bg-gray-200">
                <div id="map" class="h-full w-full z-0"></div>
            </div>
        </div>

        <div
            class="fixed bottom-0 left-0 w-full bg-white border-t p-4 flex justify-between items-center shadow-[0_-5px_10px_rgba(0,0,0,0.1)] z-50">
            <div>
                <p class="text-xs text-gray-500">Starts from</p>
                <p class="text-lg font-bold text-orange-500">IDR 85.000</p>
            </div>
            <button @click="openBooking"
                class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition transform active:scale-95">
                Book Train Ticket 🚆
            </button>
        </div>

        <div v-if="showBookingModal" class="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4">
            <div
                class="bg-white w-full max-w-lg rounded-xl flex flex-col max-h-[90vh] overflow-hidden animate-slide-up">

                <div class="p-4 border-b bg-blue-600 text-white flex justify-between items-center">
                    <h3 class="font-bold">Booking Train Ticket</h3>
                    <button @click="showBookingModal = false"
                        class="text-white hover:text-red-200 font-bold text-xl">✕</button>
                </div>

                <div class="bg-gray-100 h-1.5 w-full">
                    <div class="bg-orange-500 h-1.5 transition-all duration-300"
                        :style="{ width: (bookingStep / 6 * 100) + '%' }"></div>
                </div>

                <div class="p-6 overflow-y-auto flex-1">

                    <div v-if="bookingStep === 1" class="space-y-4">
                        <h4 class="font-bold text-lg text-blue-600">1. Pilih Jadwal & Kereta</h4>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Tanggal Keberangkatan</label>
                            <input v-model="bookingForm.date" type="date"
                                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Jumlah Penumpang</label>
                            <input v-model.number="bookingForm.paxCount" type="number" min="1" max="4"
                                class="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none">
                        </div>
                        <div>
                            <label class="text-xs font-bold text-gray-500">Pilih Kereta</label>
                            <div class="space-y-2 mt-1">
                                <div v-for="train in availableTrains" :key="train.name"
                                    @click="bookingForm.selectedTrain = train"
                                    class="p-3 border rounded-lg cursor-pointer flex justify-between items-center hover:bg-blue-50 transition"
                                    :class="bookingForm.selectedTrain?.name === train.name ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : ''">
                                    <div>
                                        <p class="font-bold text-sm">{{ train.name }}</p>
                                        <p class="text-xs text-gray-500">{{ train.time }} • {{ train.class }}</p>
                                    </div>
                                    <p class="font-bold text-orange-500">Rp {{ train.price.toLocaleString() }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="bookingStep === 2" class="space-y-4">
                        <h4 class="font-bold text-lg text-blue-600">2. Data Penumpang</h4>
                        <div v-for="(pax, index) in bookingForm.passengers" :key="index"
                            class="bg-gray-50 p-3 rounded border">
                            <p class="text-xs font-bold text-gray-400 mb-2">Penumpang {{ index + 1 }}</p>
                            <input v-model="pax.name" placeholder="Nama Lengkap (Sesuai KTP)"
                                class="w-full p-2 border rounded mb-2 text-sm focus:outline-blue-500">
                            <input v-model="pax.id_card" placeholder="Nomor NIK / Paspor"
                                class="w-full p-2 border rounded text-sm focus:outline-blue-500">
                        </div>
                    </div>

                    <div v-else-if="bookingStep === 3" class="space-y-4">
                        <h4 class="font-bold text-lg text-blue-600">3. Pilih Kursi</h4>
                        <p class="text-xs text-gray-500">Gerbong Eksekutif 1</p>
                        <div class="grid grid-cols-4 gap-2 bg-gray-100 p-4 rounded-lg justify-items-center">
                            <div v-for="seat in seatMap" :key="seat.id" @click="selectSeat(seat.id)"
                                class="w-10 h-10 rounded flex items-center justify-center text-xs font-bold cursor-pointer transition select-none"
                                :class="getSeatClass(seat.id)">
                                {{ seat.id }}
                            </div>
                        </div>
                        <div class="flex gap-4 text-xs mt-2 justify-center">
                            <span class="flex items-center gap-1">
                                <div class="w-3 h-3 bg-white border"></div> Kosong
                            </span>
                            <span class="flex items-center gap-1">
                                <div class="w-3 h-3 bg-gray-400"></div> Terisi
                            </span>
                            <span class="flex items-center gap-1">
                                <div class="w-3 h-3 bg-blue-600"></div> Dipilih
                            </span>
                        </div>
                    </div>

                    <div v-else-if="bookingStep === 4" class="space-y-6">
                        <h4 class="font-bold text-lg text-blue-600">4. Layanan Tambahan</h4>

                        <div class="border p-3 rounded-lg flex items-center gap-3 hover:bg-gray-50 cursor-pointer">
                            <input type="checkbox" v-model="bookingForm.insurance"
                                class="w-5 h-5 accent-blue-600 cursor-pointer">
                            <div>
                                <p class="font-bold text-sm">Asuransi Perjalanan</p>
                                <p class="text-xs text-gray-500">Proteksi kecelakaan s.d Rp 50 Juta (+Rp 10.000/pax)</p>
                            </div>
                        </div>

                        <div>
                            <p class="font-bold text-sm mb-2">Railfood (Pre-order)</p>
                            <div class="space-y-2">
                                <div v-for="food in railFoodMenu" :key="food.name"
                                    class="flex justify-between items-center p-2 border rounded bg-white">
                                    <div>
                                        <p class="text-sm font-bold">{{ food.name }}</p>
                                        <p class="text-xs text-gray-500">Rp {{ food.price.toLocaleString() }}</p>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <button @click="food.qty > 0 ? food.qty-- : 0"
                                            class="w-6 h-6 bg-gray-200 rounded hover:bg-gray-300">-</button>
                                        <span class="text-sm font-bold w-4 text-center">{{ food.qty }}</span>
                                        <button @click="food.qty++"
                                            class="w-6 h-6 bg-blue-600 text-white rounded hover:bg-blue-700">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="bookingStep === 5" class="space-y-4">
                        <h4 class="font-bold text-lg text-blue-600">5. Review Pesanan</h4>

                        <div class="bg-gray-50 p-4 rounded-lg space-y-2 text-sm border">
                            <div class="flex justify-between">
                                <span class="text-gray-500">Kereta</span>
                                <span class="font-bold">{{ bookingForm.selectedTrain.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Tanggal</span>
                                <span class="font-bold">{{ bookingForm.date }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Penumpang</span>
                                <span class="font-bold">{{ bookingForm.paxCount }} Org</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Kursi</span>
                                <span class="font-bold">{{ getSelectedSeatsString() }}</span>
                            </div>
                            <div class="border-t pt-2 mt-2">
                                <p class="font-bold mb-1">Rincian Harga:</p>
                                <div class="flex justify-between text-xs">
                                    <span>Tiket x{{ bookingForm.paxCount }}</span>
                                    <span>Rp {{ (bookingForm.selectedTrain.price *
                                        bookingForm.paxCount).toLocaleString() }}</span>
                                </div>
                                <div v-if="bookingForm.insurance" class="flex justify-between text-xs">
                                    <span>Asuransi x{{ bookingForm.paxCount }}</span>
                                    <span>Rp {{ (10000 * bookingForm.paxCount).toLocaleString() }}</span>
                                </div>
                                <div v-if="getFoodTotal() > 0" class="flex justify-between text-xs">
                                    <span>Railfood</span>
                                    <span>Rp {{ getFoodTotal().toLocaleString() }}</span>
                                </div>
                                <div
                                    class="flex justify-between font-bold text-lg text-orange-500 mt-2 pt-2 border-t border-dashed">
                                    <span>Total</span>
                                    <span>Rp {{ calculateTotal().toLocaleString() }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-else-if="bookingStep === 6" class="space-y-4 text-center py-4">
                        <h4 class="font-bold text-lg text-blue-600">6. Pembayaran</h4>
                        <p class="text-sm text-gray-500 mb-4">Pilih metode pembayaran</p>

                        <div class="grid grid-cols-2 gap-3">
                            <button @click="bookingForm.paymentMethod = 'QRIS'"
                                class="p-4 border rounded-xl hover:border-blue-600 transition flex flex-col items-center gap-2"
                                :class="bookingForm.paymentMethod === 'QRIS' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : ''">
                                <span class="text-2xl">📱</span> <span class="text-sm font-bold">QRIS</span>
                            </button>
                            <button @click="bookingForm.paymentMethod = 'Transfer'"
                                class="p-4 border rounded-xl hover:border-blue-600 transition flex flex-col items-center gap-2"
                                :class="bookingForm.paymentMethod === 'Transfer' ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : ''">
                                <span class="text-2xl">🏦</span> <span class="text-sm font-bold">Transfer Bank</span>
                            </button>
                        </div>

                        <div class="mt-6 bg-yellow-50 p-3 rounded text-xs text-yellow-800 border border-yellow-200">
                            Waktu pembayaran tersisa: <span class="font-bold">09:59</span>
                        </div>
                    </div>

                </div>

                <div class="p-4 border-t flex gap-3">
                    <button v-if="bookingStep > 1" @click="bookingStep--"
                        class="px-4 py-2 border rounded-lg font-bold text-gray-500 hover:bg-gray-100">Kembali</button>

                    <button v-if="bookingStep < 6" @click="nextStep"
                        class="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold hover:bg-blue-700 transition">
                        Lanjut
                    </button>

                    <button v-else @click="confirmPayment"
                        class="flex-1 bg-orange-500 text-white py-2 rounded-lg font-bold shadow-lg hover:bg-orange-600 transition">
                        Bayar Sekarang
                    </button>
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

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const pariwisata = ref({});
const activeTab = ref('detail');
const reviewAnalysis = ref(null);
const analyzing = ref(false);

// --- LOGIC BOOKING WIZARD ---
// PERBAIKAN: Variabel dideklarasikan hanya SATU kali di sini
const showBookingModal = ref(false);
const bookingStep = ref(1);

const availableTrains = [
    { name: "Argo Wilis", time: "08:00 - 14:30", class: "Eksekutif", price: 350000 },
    { name: "Turangga", time: "18:00 - 04:30", class: "Eksekutif", price: 340000 },
    { name: "Pasundan", time: "10:00 - 18:30", class: "Ekonomi", price: 150000 }
];

const railFoodMenu = ref([
    { name: "Nasi Goreng Parahyangan", price: 35000, qty: 0 },
    { name: "Bakso Malang", price: 30000, qty: 0 },
    { name: "Teh Botol", price: 10000, qty: 0 }
]);

// Simulasi Seat Map (A1 - D10)
const seatMap = ref([]);
for (let r = 1; r <= 8; r++) {
    ['A', 'B', 'C', 'D'].forEach(c => {
        seatMap.value.push({ id: `${r}${c}`, status: Math.random() > 0.8 ? 'taken' : 'avail' });
    });
}

const bookingForm = reactive({
    date: '',
    paxCount: 1,
    selectedTrain: null,
    passengers: [], // Array objek {name, id_card, seat}
    selectedSeats: [], // Array ID kursi
    insurance: false,
    paymentMethod: 'QRIS'
});

// PERBAIKAN: Fungsi ini sebelumnya hilang, sekarang ditambahkan
const openBooking = () => {
    // 1. Cek Login
    if (!authStore.isAuthenticated) {
        alert("Silakan Login terlebih dahulu untuk memesan tiket!");
        router.push('/login');
        return;
    }
    // 2. Reset Step & Buka Modal
    bookingStep.value = 1;
    bookingForm.paxCount = 1; // Reset form default
    showBookingModal.value = true;
};

// Watch paxCount untuk resize array passenger
watch(() => bookingForm.paxCount, (newVal) => {
    bookingForm.passengers = Array.from({ length: newVal }, () => ({ name: '', id_card: '', seat: null }));
    bookingForm.selectedSeats = [];
});

const nextStep = () => {
    // Validasi sederhana per step
    if (bookingStep.value === 1) {
        if (!bookingForm.date || !bookingForm.selectedTrain) return alert("Pilih tanggal dan kereta!");
    }
    if (bookingStep.value === 2) {
        if (bookingForm.passengers.some(p => !p.name || !p.id_card)) return alert("Lengkapi data penumpang!");
    }
    if (bookingStep.value === 3) {
        if (bookingForm.selectedSeats.length !== bookingForm.paxCount) return alert(`Pilih ${bookingForm.paxCount} kursi!`);
    }
    bookingStep.value++;
};

const selectSeat = (seatId) => {
    const seat = seatMap.value.find(s => s.id === seatId);
    if (seat.status === 'taken') return;

    if (bookingForm.selectedSeats.includes(seatId)) {
        bookingForm.selectedSeats = bookingForm.selectedSeats.filter(id => id !== seatId);
    } else {
        if (bookingForm.selectedSeats.length < bookingForm.paxCount) {
            bookingForm.selectedSeats.push(seatId);
        } else {
            alert("Jumlah kursi sudah pas dengan penumpang!");
        }
    }
};

const getSeatClass = (seatId) => {
    const seat = seatMap.value.find(s => s.id === seatId);
    if (seat.status === 'taken') return 'bg-gray-300 text-gray-500 cursor-not-allowed';
    if (bookingForm.selectedSeats.includes(seatId)) return 'bg-blue-600 text-white shadow-md transform scale-110';
    return 'bg-white border hover:bg-blue-100';
};

const getSelectedSeatsString = () => bookingForm.selectedSeats.join(', ');

const getFoodTotal = () => {
    return railFoodMenu.value.reduce((acc, item) => acc + (item.price * item.qty), 0);
};

const calculateTotal = () => {
    if (!bookingForm.selectedTrain) return 0;
    let total = bookingForm.selectedTrain.price * bookingForm.paxCount;
    if (bookingForm.insurance) total += 10000 * bookingForm.paxCount;
    total += getFoodTotal();
    return total;
};

const confirmPayment = async () => {
    try {
        // Map data ke format backend
        const passengerData = bookingForm.passengers.map((p, idx) => ({
            name: p.name,
            id_card: p.id_card,
            type: 'Adult',
            seat_number: bookingForm.selectedSeats[idx]
        }));

        const foodData = railFoodMenu.value.filter(f => f.qty > 0).map(f => ({
            item: f.name,
            qty: f.qty,
            price: f.price
        }));

        // Kirim ke Backend
        const res = await api.post('/auth/booking', {
            pariwisata_name: pariwisata.value.name,
            train_name: bookingForm.selectedTrain.name,
            origin: "Jakarta (Gambir)", // Hardcoded for prototype
            destination: pariwisata.value.nearest_station || "Bandung",
            date: bookingForm.date,
            passengers: passengerData,
            addons: {
                insurance: bookingForm.insurance,
                railfood: foodData
            },
            payment: {
                method: bookingForm.paymentMethod,
                total_amount: calculateTotal()
            },
            train_type: 'long_haul'
        });

        if (res.data.pass_info) {
            alert(`🎉 ${res.data.msg}\n${res.data.pass_info}`);
        } else {
            alert("Pembayaran Berhasil! E-Tiket telah dikirim.");
        }

        showBookingModal.value = false;
        // Opsional: router.push('/profile');
    } catch (error) {
        alert("Gagal memproses pembayaran: " + (error.response?.data?.msg || error.message));
        console.error(error);
    }
};

// --- LOAD DATA & MAP ---
onMounted(async () => {
    try {
        const res = await api.get(`/content/pariwisata/${route.params.id}`);
        pariwisata.value = {
            ...res.data,
            distance: res.data.nearest_station?.distance_km || 0,
            nearest_station: res.data.nearest_station?.name || 'Unknown',
            description: res.data.details?.summary || '',
            image: res.data.images && res.data.images.length > 0 ? res.data.images[0] : 'https://via.placeholder.com/400',
            reviews_data: res.data.reviews_data || [],
            lat: res.data.location?.coordinates?.lat || -6.9175, // Default Bandung
            lng: res.data.location?.coordinates?.lng || 107.6191
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

            // Tambah Marker
            L.marker([pariwisata.value.lat, pariwisata.value.lng]).addTo(map)
                .bindPopup(pariwisata.value.name)
                .openPopup();
        } else {
            setTimeout(() => { map.invalidateSize(); }, 200); // Fix render issue
        }
    }
});

const analyzeReviews = async () => {
    analyzing.value = true;
    try {
        const res = await api.post('/ai/analyze-reviews', {
            place_name: pariwisata.value.name,
            location: pariwisata.value.location?.address || "Indonesia"
        });

        reviewAnalysis.value = res.data;
    } catch (error) {
        console.error(error);
        alert("Gagal menganalisis review publik. Coba lagi nanti.");
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

/* Hide scrollbar for cleaner modal */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
}
</style>