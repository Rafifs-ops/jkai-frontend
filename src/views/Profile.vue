<template>
    <div class="pb-24 min-h-screen bg-gray-50">
        <div class="bg-kai-blue text-white p-6 pb-12 rounded-b-3xl shadow-lg relative overflow-hidden z-10">
            <div v-if="authStore.isAuthenticated" class="relative z-10">
                <div class="flex items-center gap-4">
                    <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl">
                        👤
                    </div>
                    <div>
                        <h1 class="text-xl font-bold">{{ authStore.user?.username }}</h1>
                        <p class="text-blue-200 text-sm">{{ authStore.user?.email }}</p>
                    </div>
                </div>
                <div class="mt-6 flex gap-4">
                    <div class="bg-white/10 px-4 py-2 rounded-lg text-center flex-1">
                        <p class="text-xs text-blue-200">Poin Royalti</p>
                        <p class="text-xl font-bold text-yellow-400">{{ authStore.user?.points }}</p>
                    </div>
                    <div class="bg-white/10 px-4 py-2 rounded-lg text-center flex-1">
                        <p class="text-xs text-blue-200">Status</p>
                        <p class="text-sm font-bold">Gold Member</p>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-8">
                <h2 class="text-xl font-bold mb-2">Belum Login</h2>
                <p class="text-sm mb-4 opacity-90">Masuk untuk melihat tiket dan rencana perjalananmu.</p>
                <router-link to="/login"
                    class="bg-kai-orange text-white px-6 py-2 rounded-full font-bold shadow-lg">Login /
                    Register</router-link>
            </div>
        </div>

        <div v-if="authStore.isAuthenticated && myPass" class="px-4 -mt-8 relative z-20 mb-6">
            <div
                class="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-xl shadow-xl relative overflow-hidden">
                <div class="relative z-10">
                    <div class="flex justify-between items-center mb-2">
                        <h3 class="font-bold text-lg">🎟️ {{ myPass.pass_reference?.tier_name }}</h3>
                        <span class="bg-white/20 px-2 py-1 rounded text-xs font-mono">ACTIVE</span>
                    </div>
                    <div class="text-sm opacity-90 space-y-1">
                        <p>Valid until: {{ new Date(myPass.valid_until).toLocaleDateString() }}</p>
                        <p>Long Haul Quota: <span class="font-bold text-xl">{{ myPass.long_haul_remaining }}</span>
                            trips left</p>
                    </div>

                    <div class="mt-3 flex gap-2">
                        <span v-if="myPass.addons.gojek_bundle"
                            class="bg-green-600 px-2 py-1 rounded text-[10px] font-bold">🛵 Gojek Bundle</span>
                        <span v-if="myPass.addons.kai_porter"
                            class="bg-blue-600 px-2 py-1 rounded text-[10px] font-bold">🧳 Porter</span>
                    </div>
                </div>
                <div class="absolute -right-4 -bottom-4 text-9xl opacity-10">🚆</div>
            </div>
        </div>

        <div v-else-if="authStore.isAuthenticated" class="-mt-8 h-8"></div>

        <div v-if="authStore.isAuthenticated" class="px-4 mt-4">
            <div class="flex gap-4 border-b border-gray-200 mb-4 sticky top-0 bg-gray-50 z-10 pt-2">
                <button @click="activeTab = 'trips'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'trips' }"
                    class="pb-2 flex-1 transition-colors">Rencana Disimpan</button>
                <button @click="activeTab = 'tickets'"
                    :class="{ 'border-b-2 border-kai-blue text-kai-blue font-bold': activeTab === 'tickets' }"
                    class="pb-2 flex-1 transition-colors">Tiket Saya</button>
            </div>

            <div v-if="activeTab === 'trips'" class="space-y-4 animate-fade-in">
                <div v-if="savedTrips.length === 0" class="text-center text-gray-400 py-10">
                    Belum ada rencana perjalanan disimpan. <br>
                    <router-link to="/trip-planner" class="text-kai-blue underline">Buat sekarang!</router-link>
                </div>

                <div v-for="trip in savedTrips" :key="trip._id"
                    class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="font-bold text-lg text-gray-800">{{ trip.destination }}</h3>
                        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{{ trip.duration_days }}
                            Hari</span>
                    </div>
                    <p class="text-xs text-gray-500 mb-3">Dibuat: {{ new Date(trip.created_at).toLocaleDateString() }}
                    </p>
                    <div class="flex gap-2">
                        <button @click="openTrip(trip)"
                            class="flex-1 bg-kai-blue text-white py-1.5 rounded text-sm">Lihat & Edit</button>
                        <button @click="deleteTrip(trip._id)"
                            class="px-3 py-1.5 bg-red-100 text-red-600 rounded text-sm">Hapus</button>
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'tickets'" class="space-y-4 animate-fade-in">
                <div v-if="myTickets.length === 0" class="text-center text-gray-400 py-10">
                    Belum ada tiket aktif.
                </div>
                <div v-for="ticket in myTickets" :key="ticket._id"
                    class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                    <div
                        class="absolute right-0 top-0 bottom-0 w-12 bg-gray-100 border-l border-dashed border-gray-300 flex items-center justify-center">
                        <span class="rotate-90 text-xs text-gray-400 whitespace-nowrap">QR CODE</span>
                    </div>
                    <div class="p-4 pr-14">
                        <h4 class="font-bold text-kai-blue">{{ ticket.train_name }}</h4>
                        <div class="flex justify-between text-sm mt-2 text-gray-600">
                            <div>
                                <p class="text-xs text-gray-400">Asal</p>
                                <p class="font-bold">{{ ticket.origin_station }}</p>
                            </div>
                            <div class="text-right">
                                <p class="text-xs text-gray-400">Tujuan</p>
                                <p class="font-bold">{{ ticket.destination_station }}</p>
                            </div>
                        </div>
                        <div class="mt-3 pt-3 border-t border-dashed flex justify-between items-center">
                            <span class="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold">LUNAS</span>
                            <span class="text-xs text-gray-500">{{ new Date(ticket.travel_date).toLocaleDateString()
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';
import api from '../services/api';

const authStore = useAuthStore();
const router = useRouter();
const activeTab = ref('trips');
const savedTrips = ref([]);
const myTickets = ref([]);
const myPass = ref(null);

onMounted(async () => {
    if (authStore.isAuthenticated) {
        fetchData();
        // Fetch Pass
        try {
            const passRes = await api.get('/pass/my-pass');
            myPass.value = passRes.data;
        } catch (e) { console.log(e) }
    }
});

const fetchData = async () => {
    try {
        const tripRes = await api.get('/trip');
        savedTrips.value = tripRes.data;

        const ticketRes = await api.get('/auth/my-bookings');
        myTickets.value = ticketRes.data;
    } catch (error) {
        console.error(error);
    }
};

const deleteTrip = async (id) => {
    if (!confirm("Hapus rencana ini?")) return;
    await api.delete(`/trip/${id}`);
    fetchData();
};

const openTrip = (trip) => {
    router.push({
        name: 'TripPlanner',
        state: { savedTripData: JSON.parse(JSON.stringify(trip)) }
    });
};
</script>