<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})
import { Image as ImageIcon, ArrowRight } from 'lucide-vue-next'

const images = import.meta.glob('~/assets/ProductImage/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' })
const getImageUrl = (path) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const key = Object.keys(images).find(k => k.endsWith('/' + filename))
  return key ? images[key] : path
}
</script>

<template>
  <NuxtLink
    :to="`/produk/${product.slug}`"
    class="group block bg-section rounded-2xl border border-divider-light overflow-hidden shadow-sm"
  >
    <!-- Image -->
    <div class="relative overflow-hidden aspect-[4/3]">
      <img
        v-if="product.image"
        :src="getImageUrl(product.image)"
        :alt="product.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div v-else class="w-full h-full placeholder-gradient flex items-center justify-center">
        <div class="flex flex-col items-center gap-2 text-body-light">
          <ImageIcon class="w-10 h-10" stroke-width="1.5" />
          <span class="text-xs font-medium">{{ product.name }}</span>
        </div>
      </div>
      <!-- Category Badge -->
      <div class="absolute top-3 left-3">
        <span class="bg-section/90 backdrop-blur text-link text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
          {{ product.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) }}
        </span>
      </div>
      <!-- Hover Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-heading/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <span class="text-white text-sm font-medium flex items-center gap-2">
          Lihat Detail
          <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" stroke-width="2" />
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <h3 class="text-base font-bold text-heading mb-2 group-hover:text-link transition-colors">
        {{ product.name }}
      </h3>
      <p class="text-body text-sm leading-relaxed line-clamp-2">
        {{ product.shortDesc }}
      </p>
    </div>
  </NuxtLink>
</template>
