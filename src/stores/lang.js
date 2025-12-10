import { defineStore } from 'pinia';

export const useLangStore = defineStore('lang', {
    state: () => ({
        current: 'en', // Default English untuk turis
    }),
    actions: {
        toggle() {
            this.current = this.current === 'en' ? 'id' : 'en';
        }
    },
    getters: {
        t: (state) => (key) => {
            const db = {
                greeting: { en: "Where to go today?", id: "Mau kemana hari ini?" },
                subtitle: { en: "Find your dream trip with AI.", id: "Temukan perjalanan impianmu bersama AI." },
                searchPlaceholder: { en: "Ask AI... (e.g., Best beach in Bali)", id: "Tanya AI... (misal: Pantai terbaik di Bali)" },
                popular: { en: "Popular Destinations", id: "Destinasi Populer" },
                stories: { en: "Travel Stories", id: "Cerita Perjalanan" },
                login: { en: "Login", id: "Masuk" },
            };
            return db[key][state.current] || key;
        }
    }
});