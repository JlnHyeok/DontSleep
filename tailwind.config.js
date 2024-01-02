/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '380px',
			sm: '700px',
			md: '768px',
			lg: '1024px',
			xl: '1280px'
		},
		extend: {
			keyframes: {
				shake: {
					'0%': { transform: 'translate(1px, 1px) rotate(0deg);' },
					'10%': { transform: 'translate(-1px, -2px) rotate(-1deg);' },
					'20%': { transform: 'translate(-3px, 0px) rotate(1deg);' },
					'30%': { transform: 'translate(3px, 2px) rotate(0deg);' },
					'40%': { transform: 'translate(1px, -1px) rotate(1deg);' },
					'50%': { transform: 'translate(-1px, 2px) rotate(-1deg);' },
					'60%': { transform: 'translate(-3px, 1px) rotate(0deg);' },
					'70%': { transform: 'translate(3px, 1px) rotate(-1deg);' },
					'80%': { transform: 'translate(-1px, -1px) rotate(1deg);' },
					'90%': { transform: 'translate(1px, 2px) rotate(0deg);' },
					'100%': { transform: 'translate(1px, -2px) rotate(-1deg);' }
				}
			},
			animation: {
				shake: 'shake 0.5s ease infinite'
			}
		}
	},
	plugins: []
};
