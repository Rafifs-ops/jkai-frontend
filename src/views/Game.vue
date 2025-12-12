<template>
    <div class="min-h-screen bg-gradient-to-br from-kai-blue to-indigo-900 p-6 text-white pb-24">
        <h1 class="text-3xl font-bold text-center mb-6">🎮 KAI Trivia</h1>

        <div v-if="!isPlaying && !isFinished" class="text-center mt-10">
            <div class="text-6xl mb-4">🏆</div>
            <p class="mb-6 text-lg">Uji wawasan pariwisata Indonesia kamu dan dapatkan poin royalti!</p>
            <button @click="startGame"
                class="bg-kai-orange px-8 py-3 rounded-full font-bold shadow-lg hover:scale-105 transition">
                Mulai Main
            </button>
        </div>

        <div v-else-if="isPlaying" class="max-w-md mx-auto bg-white text-gray-800 rounded-xl p-6 shadow-2xl">
            <div class="flex justify-between mb-4 font-bold text-gray-500">
                <span>Soal {{ currentQuestionIndex + 1 }}/{{ questions.length }}</span>
                <span>Poin: {{ score }}</span>
            </div>

            <img :src="currentQuestion.image" class="w-full h-48 object-cover rounded-lg mb-4 bg-gray-200">
            <h3 class="text-xl font-bold mb-4 text-center">{{ currentQuestion.question }}</h3>

            <div class="grid grid-cols-1 gap-3">
                <button v-for="opt in currentQuestion.options" :key="opt" @click="answer(opt)"
                    class="py-3 px-4 rounded-lg border-2 border-gray-100 hover:bg-blue-50 hover:border-kai-blue font-semibold transition text-left">
                    {{ opt }}
                </button>
            </div>
        </div>

        <div v-else class="text-center mt-10 animate-fade-in">
            <h2 class="text-4xl font-bold mb-2">Permainan Selesai!</h2>
            <p class="text-xl mb-6">Skor Kamu: <span class="text-kai-orange font-bold">{{ score }}</span></p>

            <div class="bg-white/10 p-4 rounded-lg backdrop-blur-sm mb-6 inline-block">
                <p>🎉 Poin berhasil ditambahkan ke akunmu!</p>
            </div>

            <div>
                <button @click="resetGame" class="bg-white text-kai-blue px-6 py-2 rounded-full font-bold mr-4">Main
                    Lagi</button>
                <button @click="$router.push('/')" class="text-gray-300 underline">Kembali ke Home</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth';
import api from '../services/api';

const authStore = useAuthStore();
const isPlaying = ref(false);
const isFinished = ref(false);
const score = ref(0);
const currentQuestionIndex = ref(0);

// Data Dummy Soal (Nanti bisa dari DB)
const questions = [
    {
        question: "Landmark apakah ini yang terletak di Sumatera Barat?",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Jam_Gadang_Bukittinggi.jpg",
        options: ["Jam Gadang", "Monas", "Gedung Sate", "Benteng Kuto Besak"],
        answer: "Jam Gadang"
    },
    {
        question: "Stasiun kereta api tertinggi di Indonesia adalah?",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Nagreg_Station.jpg/640px-Nagreg_Station.jpg",
        options: ["Stasiun Bandung", "Stasiun Nagreg", "Stasiun Lebakjero", "Stasiun Malang"],
        answer: "Stasiun Nagreg"
    },
    {
        question: "Pulau yang terkenal dengan Komodo Dragon terletak di provinsi?",
        image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Komodo_Island_01.jpg",
        options: ["Bali", "NTB", "NTT", "Papua"],
        answer: "NTT"
    }
];

const currentQuestion = computed(() => questions[currentQuestionIndex.value]);

const startGame = () => {
    if (!authStore.isAuthenticated) return alert("Silakan Login dulu untuk main!");
    isPlaying.value = true;
    score.value = 0;
    currentQuestionIndex.value = 0;
};

const answer = async (selectedOption) => {
    if (selectedOption === currentQuestion.value.answer) {
        score.value += 100; // Poin per soal
    }

    if (currentQuestionIndex.value < questions.length - 1) {
        currentQuestionIndex.value++;
    } else {
        finishGame();
    }
};

const finishGame = async () => {
    isPlaying.value = false;
    isFinished.value = true;

    // Update poin ke backend
    if (authStore.isAuthenticated) {
        try {
            await api.put('/auth/points', { points: score.value });
            // Update store lokal juga
            authStore.user.points += score.value;
        } catch (error) {
            console.error("Gagal update poin", error);
        }
    }
};

const resetGame = () => {
    isFinished.value = false;
    isPlaying.value = false;
};
</script>