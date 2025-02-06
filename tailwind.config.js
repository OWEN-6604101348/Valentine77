import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                fall: 'fall 3s linear infinite',
            },
            keyframes: {
                fall: {
                    '0%': { transform: 'translateY(-100px)', opacity: '1' },
                    '100%': { transform: 'translateY(100vh)', opacity: '0' },
                },
            },
        },
    },

    plugins: [forms],
};
