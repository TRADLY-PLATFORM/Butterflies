const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        'c-40': ['40px', '49px'],
      },
      boxShadow: {
        'c-sm': '0px 8px 28px rgba(0, 0, 0, 0.07)',
        'c-xsm': '0px 1px 2px rgba(0, 0, 0, 0.24)',
        'c-md': '0px 24px 45px rgba(58, 76, 130, 0.08)',
      },
      transitionProperty: {
        width: 'width',
      },
      gridTemplateColumns: {
        listing_card_5: 'repeat(5, minmax(0, 290px))',
        listing_card_4: 'repeat(4, minmax(0, 290px))',
        listing_card_3: 'repeat(3, minmax(0, 290px))',
        listing_card_2: 'repeat(2, minmax(0, 290px))',
        listing_card_sm_2: 'repeat(2, minmax(0, 200px))',
      },
      colors: {
        primary: 'var( --primary_color)',
        primary_light: '#DFFBF4',
        secondary: '#959393',
      },
      borderRadius: {
        'c-48': '48px',
      },
    },
    screens: {
      xs: '540px',
      ms: '450px',
      xxs: '350px',
      'c-lg': '1100px',
      'c-md': '824px',
      ...defaultTheme.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
  ],
};
