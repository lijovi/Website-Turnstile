<script setup>
import { computed } from 'vue'

import productsData from '@/data/products.json'
import { ChevronRight } from 'lucide-vue-next'

const route = useRoute()

const breadcrumbs = computed(() => {
  const crumbs = [{ text: 'Beranda', link: '/' }]

  if (route.path === '/tentang-kami') {
    crumbs.push({ text: 'Tentang Kami', link: null })
  } else if (route.path === '/produk') {
    crumbs.push({ text: 'Produk', link: null })
  } else if (route.name === 'ProductDetail' || (route.path.startsWith('/produk/') && route.params.slug)) {
    crumbs.push({ text: 'Produk', link: '/produk' })
    const product = productsData.find(p => p.slug === route.params.slug)
    crumbs.push({ text: product ? product.name : route.params.slug, link: null })
  }

  return crumbs
})
</script>

<template>
  <nav class="bg-transparent" aria-label="Breadcrumb" v-if="breadcrumbs.length > 1">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <ol class="flex items-center gap-2 text-sm">
        <li v-for="(crumb, idx) in breadcrumbs" :key="idx" class="flex items-center gap-2">
          <ChevronRight v-if="idx > 0" class="w-4 h-4 text-divider" stroke-width="2" />
          <NuxtLink
            v-if="crumb.link"
            :to="crumb.link"
            class="text-body hover:text-link transition-colors font-medium"
          >
            {{ crumb.text }}
          </NuxtLink>
          <span v-else class="text-heading font-semibold">{{ crumb.text }}</span>
        </li>
      </ol>
    </div>
  </nav>
</template>
