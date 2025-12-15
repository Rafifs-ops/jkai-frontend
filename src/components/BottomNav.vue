<template>
    <div
        class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-between items-center px-4 py-2 z-40 pb-4 shadow-[0_-5px_15px_rgba(0,0,0,0.03)]">

        <router-link to="/tourism" class="flex flex-col items-center gap-1 w-1/5 text-gray-400"
            active-class="text-kai-blue">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="10" r="3" />
                <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 7 8 11.7z" />
            </svg>
            <span class="text-[9px] font-medium">Destination</span>
        </router-link>

        <router-link to="/trip-planner" class="flex flex-col items-center gap-1 w-1/5 text-gray-400"
            active-class="text-kai-blue">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
            </svg>
            <span class="text-[9px] font-medium">Planner</span>
        </router-link>

        <router-link to="/" class="flex flex-col items-center w-1/5 group">
            <div
                class="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-kai-blue group-[.router-link-active]:bg-indigo-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
            </div>
            <span class="text-[9px] font-bold text-kai-blue mt-1">Home</span>
        </router-link>

        <router-link to="/blogs" class="flex flex-col items-center gap-1 w-1/5 text-gray-400"
            active-class="text-kai-blue">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            <span class="text-[9px] font-medium">Blog</span>
        </router-link>

        <router-link to="/profile" class="flex flex-col items-center gap-1 w-1/5 text-gray-400"
            active-class="text-kai-blue">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
            <span class="text-[9px] font-medium">Profile</span>
        </router-link>
    </div>
</template>