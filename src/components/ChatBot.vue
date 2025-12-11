<template>
    <div class="fixed bottom-24 right-6 z-50 flex flex-col items-end">
        <div v-if="isOpen"
            class="bg-white w-80 h-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-fade-in mb-4">
            <div class="bg-kai-blue p-4 text-white flex justify-between items-center">
                <div class="flex items-center gap-2">
                    <span class="text-xl">🤖</span>
                    <div>
                        <h3 class="font-bold text-sm">KAI Assistant</h3>
                        <p class="text-xs text-blue-200">Online • Siap membantu</p>
                    </div>
                </div>
                <button @click="isOpen = false" class="text-white hover:text-gray-200">✕</button>
            </div>

            <div class="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-3" ref="chatContainer">
                <div v-for="(msg, index) in messages" :key="index" :class="msg.isUser ? 'text-right' : 'text-left'">
                    <div class="inline-block px-3 py-2 rounded-lg text-sm max-w-[85%]"
                        :class="msg.isUser ? 'bg-kai-blue text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'">
                        {{ msg.text }}
                    </div>
                </div>
                <div v-if="loading" class="text-xs text-gray-400 italic ml-2">Sedang mengetik...</div>
            </div>

            <div class="px-2 py-2 bg-gray-100 border-t border-gray-200 overflow-x-auto whitespace-nowrap hide-scroll">
                <button v-for="kw in keywords" :key="kw" @click="sendMessage(kw)"
                    class="inline-block px-3 py-1 mr-2 text-xs bg-white border border-kai-blue text-kai-blue rounded-full hover:bg-blue-50 transition">
                    {{ kw }}
                </button>
            </div>

            <div class="p-2 border-t border-gray-200 bg-white flex gap-2">
                <input v-model="inputMsg" @keyup.enter="sendMessage(inputMsg)" type="text"
                    placeholder="Tanya sesuatu..."
                    class="flex-1 px-3 py-2 text-sm border rounded-full focus:outline-none focus:border-kai-blue">
                <button @click="sendMessage(inputMsg)"
                    class="bg-kai-orange text-white p-2 rounded-full w-9 h-9 flex items-center justify-center hover:bg-orange-600 transition">
                    ➤
                </button>
            </div>
        </div>

        <button @click="isOpen = !isOpen"
            class="bg-kai-blue text-white w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-2xl hover:scale-110 transition border-2 border-white">
            <span v-if="!isOpen">💬</span>
            <span v-else>QD</span>
        </button>
    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import api from '../services/api';

const isOpen = ref(false);
const inputMsg = ref('');
const loading = ref(false);
const chatContainer = ref(null);

const messages = ref([
    { text: "Halo! Ada yang bisa saya bantu tentang perjalanan wisatamu?", isUser: false }
]);

const keywords = [
    "Cara pesan tiket terusan?",
    "Rekomendasi kuliner stasiun?",
    "Landmark terkenal Indonesia?",
    "Apakah ada diskon pelajar?",
    "Bagaimana etika wisata lokal?"
];

const sendMessage = async (text) => {
    if (!text) return;

    // Add User Message
    messages.value.push({ text: text, isUser: true });
    inputMsg.value = '';
    scrollToBottom();

    loading.value = true;
    try {
        // Reuse endpoint rekomendasi karena fungsinya sama (tanya jawab pariwisata)
        const res = await api.post('/ai/recommendation', { query: text });
        messages.value.push({ text: res.data.result, isUser: false });
    } catch (error) {
        messages.value.push({ text: "Maaf, saya sedang gangguan.", isUser: false });
    } finally {
        loading.value = false;
        scrollToBottom();
    }
};

const scrollToBottom = async () => {
    await nextTick();
    if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
};
</script>