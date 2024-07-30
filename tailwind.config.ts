import type { Config } from 'tailwindcss'

const config = {
	darkMode: ['class'],

	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}'
	],
	prefix: '',
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			aspectRatio: {
				'2/1': '2 / 1'
			},
			screens: {
				xs: '440px',
				'max-xs': { max: '439.98px' },
				'max-sm': { max: '639.98px' },
				'max-md': { max: '767.98px' },
				'max-lg': { max: '1023.98px' }
			},
			fontFamily: {
				quicksand: 'var(--font-quicksand)',
				'noto-sans': 'var(--font-noto-sans)'
			},
			colors: {
				'tw-green-light': 'var(--green-light)',
				"tw-red-alarm":"var(--red-alarm)",

				'tw-gray-500': 'var(--gray-500)',
				'tw-gray-400': 'var(--gray-400)',
				'tw-gray-200': 'var(--gray-200)',
				'tw-gray-100': 'var(--gray-100)',
				'tw-gray-75': 'var(--gray-75)',
				'tw-gray-50': 'var(--gray-50)',
				'tw-gray-25': 'var(--gray-25)',

				'tw-orange-300': 'var(--orange-300)',
				'tw-orange-50': 'var(--orange-50)',

				'tw-blue-50': 'var(--tw-blue-50)',
				'tw-blue-75': 'var(--tw-blue-75)',
				'tw-blue-100': 'var(--tw-blue-100)',
				'tw-blue-200': 'var(--tw-blue-200)',
				'tw-blue-300': 'var(--tw-blue-300)',
				'tw-blue-400': 'var(--tw-blue-400)',
				'tw-blue-450': 'var(--tw-blue-450)',
				'tw-blue-500': 'var(--tw-blue-500)',

				'tw-black': 'var(--tw-black)',
				'tw-purple-400': 'var(--tw-purple-400)',
				'tw-purple-500': 'var(--tw-purple-500)',

				'tw-secondary-500': 'var(--secondary-500)',
				'tw-secondary-450': 'var(--secondary-450)',
				'tw-secondary-400': 'var(--secondary-400)',
				'tw-secondary-300': 'var(--secondary-300)',
				'tw-secondary-200': 'var(--secondary-200)',
				'tw-secondary-100': 'var(--secondary-100)',
				"tw-secondary-50":"var(--secondary-50)",
				'tw-secondary-000': 'var(--secondary-000)',

				'tw-info-500': 'var(--info-500)',
				'tw-info-400': 'var(--info-400)',
				'tw-info-300': 'var(--info-300)',
				'tw-info-200': 'var(--info-200)',
				'tw-info-100': 'var(--info-100)',

				'tw-neutral-500': 'var(--neutral-500)',
				'tw-neutral-400': 'var(--neutral-400)',
				'tw-neutral-300': 'var(--neutral-300)',
				'tw-neutral-200': 'var(--neutral-200)',
				'tw-neutral-100': 'var(--neutral-100)',
				'tw-neutral-000': 'var(--neutral-000)',

				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
} satisfies Config

export default config
