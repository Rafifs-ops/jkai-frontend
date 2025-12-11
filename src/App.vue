<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">
    <nav class="bg-kai-blue text-white p-4 shadow-md sticky top-0 z-50">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="text-xl font-bold flex items-center gap-2">
          🚆 Journey with KAI
        </router-link>

        <div class="relative" v-if="authStore.isAuthenticated">
          <button @click="showDropdown = !showDropdown"
            class="flex items-center gap-2 bg-blue-800 px-3 py-1 rounded-full text-sm hover:bg-blue-700 transition">
            <span>👤 {{ authStore.user?.username }}</span>
            <span class="text-xs">▼</span>
          </button>

          <div v-if="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 text-gray-800 animate-fade-in">
            <div class="px-4 py-2 border-b">
              <p class="text-xs text-gray-500">Poin Royalti</p>
              <p class="text-lg font-bold text-kai-orange">{{ authStore.user?.points }} Poin</p>
            </div>
            <a href="#" class="block px-4 py-2 hover:bg-gray-100 text-sm">Riwayat Perjalanan (UGC)</a>
            <button @click="logout"
              class="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-500">Logout</button>
          </div>
        </div>

        <router-link v-else to="/login"
          class="bg-kai-orange px-4 py-1.5 rounded-full text-sm font-bold shadow hover:bg-orange-600 transition">
          Login
        </router-link>
      </div>

      <div class="flex items-center gap-3">
        <button @click="langStore.toggle()"
          class="text-xs font-bold border border-white/30 px-2 py-1 rounded hover:bg-white/10">
          {{ langStore.current === 'en' ? '🇺🇸 EN' : '🇮🇩 ID' }}
        </button>
      </div>
    </nav>

    <main class="container mx-auto pb-20"> <router-view />
    </main>

    <ChatBot />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter } from 'vue-router';
import { useLangStore } from './stores/lang';
import ChatBot from './components/ChatBot.vue';

const langStore = useLangStore();
const authStore = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);

const logout = () => {
  authStore.logout();
  showDropdown.value = false;
  router.push('/login');
};
</script>