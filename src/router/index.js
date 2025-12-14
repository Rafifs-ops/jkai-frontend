import { createRouter, createWebHistory } from 'vue-router'

// Kita akan buat komponen ini nanti di Tahap 4, sekarang import dummy dulu atau biarkan kosong
// Cara lazy load component (Best Practice untuk performa)
const Home = () => import('../views/Home.vue')
const DetailPariwisata = () => import('../views/DetailPariwisata.vue')
const BlogDetail = () => import('../views/BlogDetail.vue')
const TripPlanner = () => import('../views/TripPlanner.vue')
const Game = () => import('../views/Game.vue')
const Login = () => import('../views/Login.vue')
const Register = () => import('../views/Register.vue')
const TourismList = () => import('../views/TourismList.vue')
const BlogList = () => import('../views/BlogList.vue')
const Profile = () => import('../views/Profile.vue')
const NusantaraPass = () => import('../views/NusantaraPass.vue')

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/login', name: 'Login', component: Login },
    { path: '/pariwisata/:id', name: 'DetailPariwisata', component: DetailPariwisata },
    { path: '/blog/:id', name: 'BlogDetail', component: BlogDetail },
    { path: '/trip-planner', name: 'TripPlanner', component: TripPlanner },
    { path: '/game', name: 'Game', component: Game },
    { path: '/register', name: 'Register', component: Register },
    { path: '/tourism', name: 'TourismList', component: TourismList },
    { path: '/blogs', name: 'BlogList', component: BlogList },
    { path: '/profile', name: 'Profile', component: Profile },
    { path: '/nusantara-pass', name: 'NusantaraPass', component: NusantaraPass }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router