/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                kai: {
                    blue: '#2D3494', // Warna Khas KAI
                    orange: '#F58220',
                    grey: '#F3F4F6'
                }
            }
        },
    },
    plugins: [],
}