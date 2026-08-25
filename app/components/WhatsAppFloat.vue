<script setup>
import companyData from '@/data/company.json'

const waLink = `https://wa.me/${companyData.whatsapp}?text=${encodeURIComponent('Halo, saya tertarik dengan produk turnstile gate. Bisa dibantu?')}`
</script>

<template>
  <a
    :href="waLink"
    target="_blank"
    rel="noopener noreferrer"
    class="fixed bottom-6 right-6 z-50 group"
    aria-label="Chat via WhatsApp"
  >
    <!-- Pulse Ring -->
    <div class="absolute inset-0 rounded-full bg-success opacity-30 animate-[pulse-ring_2s_ease-out_infinite]"></div>

    <!-- Button -->
    <div class="relative w-14 h-14 rounded-full bg-success flex items-center justify-center shadow-lg shadow-success/30 group-hover:shadow-success/50 group-hover:scale-110 transition-all duration-300">
      <img src="@/assets/icons/whatsapp.svg" alt="WhatsApp" class="w-7 h-7 text-white" />
    </div>

    <!-- Tooltip -->
    <div class="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-heading text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-xl">
      Chat via WhatsApp
      <div class="absolute left-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-heading"></div>
    </div>
  </a>
</template>
