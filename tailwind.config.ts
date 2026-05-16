/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0f1115',
        'bg-secondary': '#12151b',
        'bg-card': '#1a1f29',
        'text-primary': '#f3f4f6',
        'text-secondary': '#9ca3af',
        'text-muted': '#6b7280',
        'accent': '#5b8cff',
        'accent-hover': '#4f7cff',
        'border-color': 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'Courier New', 'monospace'],
      },
      maxWidth: {
        'container': '1200px',
      },
    },
  },
  plugins: [],
}