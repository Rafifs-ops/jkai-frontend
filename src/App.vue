<template>
  <div class="min-h-screen bg-gray-50 text-gray-800 font-sans">

    <nav v-if="!hideNav"
      class="bg-white px-4 md:px-8 py-3 sticky top-0 z-50 flex justify-between items-center shadow-sm max-w-7xl mx-auto w-full">
      <router-link to="/" class="flex items-center gap-2">
        <div class="flex items-end">
          <img :src="logoKai" alt="KAI Logo" class="h-8 md:h-10 object-contain">
        </div>
      </router-link>

      <div class="flex items-center gap-4">
        <button @click="langStore.toggle()" class="text-xs font-bold text-gray-400 hover:text-kai-blue">
          {{ langStore.current === 'en' ? 'EN' : 'ID' }}
        </button>

        <button v-if="authStore.isAuthenticated" @click="logout"
          class="text-gray-400 hover:text-red-500 flex items-center gap-2">
          <span class="hidden md:inline text-xs font-bold">Logout</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
        </button>

        <router-link v-else to="/login"
          class="text-sm font-bold text-kai-blue border border-kai-blue px-4 py-1 rounded-full hover:bg-kai-blue hover:text-white transition">
          Login
        </router-link>
      </div>
    </nav>

    <main class="container mx-auto w-full md:max-w-7xl min-h-screen" :class="hideNav ? 'pb-0' : 'pb-24'">
      <router-view />
    </main>

    <ChatBot />

    <div class="md:hidden">
      <BottomNav v-if="!hideNav" />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './stores/auth';
import { useRouter, useRoute } from 'vue-router';
import { useLangStore } from './stores/lang';
import ChatBot from './components/ChatBot.vue';
import BottomNav from './components/BottomNav.vue';

// FIX: Import Logo
import logoKai from './assets/img/logo.png';

const langStore = useLangStore();
const authStore = useAuthStore();
const router = useRouter();
const route = useRoute();

const hideNav = computed(() => {
  return ['Login', 'Register', 'DetailPariwisata', 'Game'].includes(route.name);
});

const logout = () => {
  if (confirm('Are you sure want to logout?')) {
    authStore.logout();
    router.push('/login');
  }
};
</script>