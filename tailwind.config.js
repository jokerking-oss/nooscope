const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{html,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                ink: {
                    950: '#06070a',
                    900: '#0a0c11',
                    850: '#0e1117',
                    800: '#131720',
                    750: '#171c26',
                    700: '#1a1f2b',
                    600: '#232936',
                    500: '#2f3644',
                },
                amber: {
                    DEFAULT: '#e8a33d',
                    bright: '#ffc879',
                    deep: '#b8763a',
                },
                signal: {
                    DEFAULT: '#56c8d8',
                },
            },
            fontFamily: {
                display: ['Fraunces', 'Merriweather', 'Georgia', 'serif'],
                mono: ['IBM Plex Mono', 'ui-monospace', 'monospace'],
            },
            boxShadow: {
                "inner-lg": "inset 0 0 6px 0 rgba(0, 0, 0, 0.15)",
                "no-offset": "0 0 6px 0 --tw-shadow-color",
                "panel": "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 8px 32px -8px rgba(0,0,0,0.7)",
            },
            textShadow: {
                sm: '0 1px 2px var(--tw-shadow-color)',
                DEFAULT: '0 2px 4px var(--tw-shadow-color)',
                lg: '0 8px 16px var(--tw-shadow-color)',
            },
        },
    },
    plugins: [
        plugin(function ({ matchUtilities, theme }) {
            matchUtilities(
                { 'text-shadow': (value) => ({ textShadow: value }) },
                { values: theme('textShadow') });
        }),
    ],
}
