/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            height: {
                'innerpage': 'calc(100vh - 80px)',
            },
            width: {
                innerpage: '100%',
            }

        },
    },
    plugins: [],
};