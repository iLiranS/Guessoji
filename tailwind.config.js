/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        background:'hsl(var(--background))',
        background_bottom:'hsl(var(--background_bottom))',
        foreground:'hsl(var(--foreground))',
        card_background:'hsl(var(--card_background))',
        card_foreground:'hsl(var(--card_foreground))',
      },
      keyframes:{
        scaleIn:{
          '0%':{transform:'scale(0)'},
          '85%':{transform:'scale(1.1)'},
          '100%':{transform:'scale(1)'}
        },
        scaleInSoft:{
          '0%':{transform:'scale(0)'},
          '100%':{transform:'scale(1)'}
        },
        fadeOutDown:{
          '0%':{transform:'translate(0,0) scale(1)',opacity:'100'},
          '70%':{transform:'translate(0,70px) scale(1)',opacity:'50'},
          '100%':{transform:'translate(0,100px) scale(0)',opacity:'0'}
        },
        fadeOutUp:{
          '0%':{transform:'translate(0,0) scale(1)',opacity:'100'},
          '70%':{transform:'translate(0,-70px) scale(1)',opacity:'50'},
          '100%':{transform:'translate(0,-100px) scale(0)',opacity:'0'}
        },
        shake:{
          '0%,50%,100%':{transform:'rotate(0)'},
          '25%':{transform:'rotate(25deg)'},
          '75%':{transform:'rotate(-25deg)'},
        }
      },
      animation:{
        scaleIn:'scaleIn 0.25s ease-out forwards',
        scaleInSoft:'scaleInSoft 0.3s ease-out forwards',
        fadeOutDown:'fadeOutDown 1s ease-out forwards',
        fadeOutUp:'fadeOutUp 1s ease-out forwards',
        shake:'shake 0.9s linear infinite'

      }
    },
  },
  plugins: [],
}

