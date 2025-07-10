export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../packages/vue/dist/**/*.{js,ts,vue}'
  ],
  theme: {
    extend: {
      colors: {
        // Semantic color mappings
        background: 'hsl(0 0% 100%)',
        foreground: 'hsl(222.2 84% 4.9%)',
        
        // Card colors
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(222.2 84% 4.9%)',
        
        // Primary colors
        primary: 'hsl(221.2 83.2% 53.3%)',
        'primary-foreground': 'hsl(210 40% 98%)',
        
        // Secondary colors
        secondary: 'hsl(210 40% 96%)',
        'secondary-foreground': 'hsl(222.2 84% 4.9%)',
        
        // Muted colors
        muted: 'hsl(210 40% 96%)',
        'muted-foreground': 'hsl(215.4 16.3% 46.9%)',
        
        // Accent colors
        accent: 'hsl(210 40% 96%)',
        'accent-foreground': 'hsl(222.2 84% 4.9%)',
        
        // Border colors
        border: 'hsl(214.3 31.8% 91.4%)',
        input: 'hsl(214.3 31.8% 91.4%)',
        
        // Ring colors
        ring: 'hsl(221.2 83.2% 53.3%)',
        
        // Success colors
        success: 'hsl(142.1 76.2% 36.3%)',
        'success-foreground': 'hsl(355.7 100% 97.3%)',
        
        // Destructive colors
        destructive: 'hsl(0 84.2% 60.2%)',
        'destructive-foreground': 'hsl(210 40% 98%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'fade-out': 'fade-out 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
