/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ayur: {
                    primary: '#1A5D1A', // Deep Web Green
                    secondary: '#F1C93B', // Golden Yellow
                    accent: '#A64B2A', // Earthy Red/Brown
                    bg: '#FDFBF7', // Cream/Off-white background
                    text: '#2C3639', // Dark Gray Text
                }
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Merriweather', 'serif'],
            }
        },
    },
    plugins: [],
}
