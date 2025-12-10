<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div class="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
            <div class="bg-kai-blue p-6 text-center">
                <h2 class="text-2xl font-bold text-white">Welcome Back!</h2>
                <p class="text-blue-100 text-sm">Log in to continue your journey.</p>
            </div>

            <div class="p-8">
                <form @submit.prevent="handleLogin" class="space-y-5">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input v-model="email" type="email" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-orange focus:border-transparent outline-none transition">
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input v-model="password" type="password" required
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kai-orange outline-none transition">
                    </div>

                    <div v-if="errorMsg" class="text-red-500 text-sm text-center font-bold bg-red-50 p-2 rounded">
                        {{ errorMsg }}
                    </div>

                    <button type="submit" :disabled="loading"
                        class="w-full bg-kai-orange text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition shadow-md flex justify-center">
                        <span v-if="loading" class="animate-spin">⏳</span>
                        <span v-else>Login</span>
                    </button>
                </form>

                <div class="mt-6 text-center text-sm text-gray-600">
                    Don't have an account?
                    <router-link to="/register" class="text-kai-blue font-bold hover:underline">Register
                        Here</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMsg = ref('');
const loading = ref(false);

const handleLogin = async () => {
    loading.value = true;
    errorMsg.value = '';

    try {
        await authStore.login(email.value, password.value);
        // Redirect ke halaman sebelumnya atau home
        router.push('/');
    } catch (error) {
        errorMsg.value = error.response?.data?.msg || "Login Failed. Check your credentials.";
    } finally {
        loading.value = false;
    }
};
</script>