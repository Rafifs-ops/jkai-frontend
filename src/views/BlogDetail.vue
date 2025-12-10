<template>
    <div class="pb-24 max-w-2xl mx-auto bg-white min-h-screen shadow-xl">
        <div v-if="blog" class="animate-fade-in">
            <img :src="blog.image_cover" class="w-full h-64 object-cover">

            <div class="p-6">
                <span class="text-xs font-bold text-kai-orange uppercase tracking-wider">Travel Blog</span>
                <h1 class="text-3xl font-bold text-gray-900 mt-2 mb-2">{{ blog.title }}</h1>
                <div class="text-xs text-gray-500 mb-6 flex items-center gap-2">
                    <span>✍️ {{ blog.author }}</span> • <span>📅 {{ new Date().toLocaleDateString() }}</span>
                </div>

                <article class="prose prose-blue text-gray-700 leading-relaxed">
                    {{ blog.content }}
                </article>

                <div class="mt-10 bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 class="font-bold text-kai-blue flex items-center gap-2">
                        🤖 AI Reading Assistant
                    </h3>
                    <p class="text-sm text-gray-600 mb-3">Too lazy to read? Or have specific questions about this
                        article? Ask AI!</p>

                    <div class="flex gap-2">
                        <input v-model="aiQuestion" @keyup.enter="askAiAboutBlog" type="text"
                            placeholder="Ex: What is the main tip?" class="flex-grow p-2 text-sm border rounded-lg">
                        <button @click="askAiAboutBlog"
                            class="bg-kai-blue text-white px-4 py-2 rounded-lg text-sm font-bold">Ask</button>
                    </div>

                    <div v-if="aiAnswer"
                        class="mt-3 bg-white p-3 rounded-lg text-sm text-gray-800 shadow-sm border border-gray-100">
                        <p><b>AI Answer:</b> {{ aiAnswer }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="text-center py-20">Loading Article...</div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '../services/api';

const route = useRoute();
const blog = ref(null);
const aiQuestion = ref('');
const aiAnswer = ref(null);

onMounted(async () => {
    try {
        const res = await api.get(`/content/blogs/${route.params.id}`);
        blog.value = res.data;
    } catch (error) {
        console.error("Failed to load blog", error);
    }
});

const askAiAboutBlog = async () => {
    if (!aiQuestion.value) return;
    aiAnswer.value = "Thinking...";
    try {
        const res = await api.post('/ai/explain-blog', {
            blogContent: blog.value.content,
            question: aiQuestion.value
        });
        aiAnswer.value = res.data.answer;
    } catch (error) {
        aiAnswer.value = "Sorry, AI cannot answer right now.";
    }
};
</script>