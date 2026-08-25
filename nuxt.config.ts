import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  future: {
    compatibilityVersion: 4,
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['~/assets/main.css'],
  app: {
    head: {
      title: 'TurnstileGate Indonesia — Solusi Keamanan Akses Terpercaya',
      htmlAttrs: {
        lang: 'id'
      },
      meta: [
        { name: 'description', content: 'TurnstileGate Indonesia — Penyedia turnstile gate dan sistem akses kontrol terkemuka. Tripod turnstile, flap barrier, swing barrier, full height turnstile. Instalasi profesional & garansi resmi.' },
        { name: 'keywords', content: 'turnstile gate, flap barrier, tripod turnstile, swing barrier, akses kontrol, keamanan gedung, Indonesia' }
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap' }
      ]
    }
  }
})

