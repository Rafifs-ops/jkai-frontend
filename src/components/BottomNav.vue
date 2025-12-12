<template>
    <div
        class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-3 z-40 shadow-[0_-5px_10px_rgba(0,0,0,0.05)]">
        <router-link to="/" class="flex flex-col items-center text-gray-400 hover:text-kai-blue"
            active-class="text-kai-blue font-bold">
            <span class="text-xl">🏠</span>
            <span class="text-[10px]">Home</span>
        </router-link>

        <router-link to="/tourism" class="flex flex-col items-center text-gray-400 hover:text-kai-blue"
            active-class="text-kai-blue font-bold">
            <span class="text-xl">V</span>
            <span class="text-[10px]">Wisata</span>
        </router-link>

        <div class="relative -top-5">
            <router-link to="/trip-planner"
                class="bg-kai-orange text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 transform hover:scale-105 transition">
                <span class="text-2xl">🗺️</span>
            </router-link>
        </div>

        <router-link to="/blogs" class="flex flex-col items-center text-gray-400 hover:text-kai-blue"
            active-class="text-kai-blue font-bold">
            <span class="text-xl">📰</span>
            <span class="text-[10px]">Blog</span>
        </router-link>

        <router-link to="/profile" class="flex flex-col items-center text-gray-400 hover:text-kai-blue"
            active-class="text-kai-blue font-bold">
            <span class="text-xl">👤</span>
            <span class="text-[10px]">Profil</span>
        </router-link>
    </div>
</template>