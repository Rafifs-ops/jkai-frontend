<template>
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div class="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
            <h2 class="text-2xl font-bold text-kai-blue text-center mb-6">Join Journey with KAI</h2>

            <form @submit.prevent="handleRegister" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="form.username" type="text" required
                        class="w-full mt-1 p-2 border rounded-lg focus:ring-kai-blue focus:border-kai-blue">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Email Address</label>
                    <input v-model="form.email" type="email" required class="w-full mt-1 p-2 border rounded-lg">
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="form.password" type="password" required class="w-full mt-1 p-2 border rounded-lg">
                </div>

                <button type="submit"
                    class="w-full bg-kai-orange text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition">
                    Register
                </button>
            </form>

            <p class="mt-4 text-center text-sm text-gray-600">
                Already have an account?
                <router-link to="/login" class="text-kai-blue font-bold">Login here</router-link>
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const form = ref({ username: '', email: '', password: '' });

const handleRegister = async () => {
    try {
        await axios.post('http://localhost:8080/api/auth/register', form.value);
        alert('Registration successful! Please login.');
        router.push('/login');
    } catch (error) {
        alert(error.response?.data?.msg || 'Registration failed');
    }
};
</script>