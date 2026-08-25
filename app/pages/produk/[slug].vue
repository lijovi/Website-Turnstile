<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

import productsData from '@/data/products.json'
import companyData from '@/data/company.json'



import { Search, Image as ImageIcon, FileDown, ClipboardList } from 'lucide-vue-next'

const route = useRoute()

const product = computed(() => {
  return productsData.find(p => p.slug === route.params.slug)
})

// SEO: use Nuxt useHead instead of document.title
useHead({
  title: computed(() => product.value ? `${product.value.name} | ${companyData.name}` : `Produk Tidak Ditemukan | ${companyData.name}`),
  meta: [
    { name: 'description', content: computed(() => product.value ? product.value.description : 'Produk yang Anda cari tidak tersedia.') },
  ],
})

const selectedImage = ref(0)
const pageVisible = ref(false)
const thumbContainer = ref(null)

const canScroll = computed(() => {
  return product.value && product.value.gallery && product.value.gallery.length > 4
})

const scrollThumbnails = (direction) => {
  if (!thumbContainer.value) return
  const scrollAmount = 120
  thumbContainer.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

const relatedProducts = computed(() => {
  if (!product.value) return []
  return productsData
    .filter(p => p.category === product.value.category && p.id !== product.value.id)
    .slice(0, 4)
})

const categoryName = computed(() => {
  if (!product.value) return ''
  return product.value.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
})

const waLink = computed(() => {
  if (!product.value) return '#'
  const text = `Halo, saya tertarik dengan produk ${product.value.name}. Bisa minta informasi lebih lanjut?`
  return `https://wa.me/${companyData.whatsapp}?text=${encodeURIComponent(text)}`
})

// Automatic carousel timer
let carouselInterval = null

const startCarousel = () => {
  stopCarousel()
  if (!product.value || !product.value.gallery || product.value.gallery.length <= 1) return
  carouselInterval = setInterval(() => {
    selectedImage.value = (selectedImage.value + 1) % product.value.gallery.length
  }, 3000)
}

const stopCarousel = () => {
  if (carouselInterval) {
    clearInterval(carouselInterval)
    carouselInterval = null
  }
}

const handleThumbnailClick = (idx) => {
  selectedImage.value = idx
  startCarousel()
}

// Auto-scroll thumbnail strip to keep active thumbnail visible
watch(selectedImage, async (newIdx) => {
  await nextTick()
  if (!thumbContainer.value) return
  const activeThumb = thumbContainer.value.children[newIdx]
  if (activeThumb) {
    const container = thumbContainer.value;
    const containerRect = container.getBoundingClientRect();
    const thumbRect = activeThumb.getBoundingClientRect();
    
    const containerCenter = containerRect.left + containerRect.width / 2;
    const thumbCenter = thumbRect.left + thumbRect.width / 2;
    const offset = thumbCenter - containerCenter;
    
    container.scrollBy({
      left: offset,
      behavior: 'smooth'
    });
  }
})

watch(product, (newProduct) => {
  selectedImage.value = 0
  if (newProduct) {
    startCarousel()
  } else {
    stopCarousel()
  }
})

onMounted(async () => {
  startCarousel()
  await nextTick()
  setTimeout(() => { pageVisible.value = true }, 50)
})

onUnmounted(() => {
  stopCarousel()
})

const images = import.meta.glob('~/assets/ProductImage/*.{png,jpg,jpeg,svg}', { eager: true, import: 'default' })
const getImageUrl = (path) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const key = Object.keys(images).find(k => k.endsWith('/' + filename))
  return key ? images[key] : path
}
</script>

<template>
  <!-- Spacer for fixed navbar -->
  <div class="pt-20"></div>
  <Breadcrumb />
  <!-- Product Not Found -->
  <div v-if="!product" class="py-20 px-6 lg:py-24 lg:px-8 text-center animate-fade-in-up" style="animation-duration: 0.3s;">
    <Search class="w-20 h-20 text-divider mx-auto mb-4" stroke-width="1" />
    <h2 class="text-2xl font-bold text-heading mb-2">Produk Tidak Ditemukan</h2>
    <p class="text-body-light mb-6">Produk yang Anda cari tidak tersedia.</p>
    <NuxtLink to="/produk" custom v-slot="{ href, navigate }">
      <Button as="a" :href="href" @click="navigate" variant="primary">Lihat Semua Produk</Button>
    </NuxtLink>
  </div>

  <div v-else :class="['page-enter', pageVisible && 'page-enter--visible']">

  <!-- Product Detail -->
  <section class="py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- Gallery -->
        <div>
          <!-- Main Image -->
          <div class="aspect-square rounded-2xl overflow-hidden placeholder-gradient mb-4 shadow-sm border border-divider-light flex items-center justify-center relative">
            <Transition name="fade" mode="out-in">
              <img
                v-if="product.gallery && product.gallery[selectedImage]"
                :key="selectedImage"
                :src="getImageUrl(product.gallery[selectedImage])"
                :alt="product.name"
                class="w-full h-full object-cover"
              />
              <div v-else class="flex flex-col items-center justify-center h-full gap-3 text-link">
                <ImageIcon class="w-20 h-20" stroke-width="1" />
                <span class="text-sm font-medium">{{ product.name }}</span>
              </div>
            </Transition>
          </div>

          <!-- Thumbnails -->
          <div class="thumbnail-scroll-wrapper">
            <button
              :class="['thumb-nav', { 'thumb-nav--disabled': !canScroll }]"
              @click="scrollThumbnails('left')"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <div ref="thumbContainer" :class="['thumbnail-scroll-container', { 'thumbnail-scroll-container--no-scroll': !canScroll }]">
              <button
                v-for="(img, idx) in product.gallery"
                :key="idx"
                @click="handleThumbnailClick(idx)"
                :class="[
                  'thumbnail-scroll-item aspect-square rounded-xl overflow-hidden placeholder-gradient border-2 transition-all flex-shrink-0',
                  selectedImage === idx
                    ? 'border-link shadow-md'
                    : 'border-divider-light hover:border-divider'
                ]"
              >
                <img
                  v-if="img"
                  :src="getImageUrl(img)"
                  :alt="product.name + ' Thumbnail ' + (idx + 1)"
                  class="w-full h-full object-cover"
                />
                <div v-else class="flex items-center justify-center h-full">
                  <ImageIcon class="w-6 h-6 text-link-light" stroke-width="1.5" />
                </div>
              </button>
            </div>
            <button
              :class="['thumb-nav', { 'thumb-nav--disabled': !canScroll }]"
              @click="scrollThumbnails('right')"
              aria-label="Scroll right"
            >
              ›
            </button>
          </div>
        </div>

        <!-- Product Info -->
        <div>
          <!-- Category Badge -->
          <div class="mb-4">
            <span class="bg-black text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              {{ categoryName }}
            </span>
          </div>

          <!-- Name -->
          <h2 class="text-2xl md:text-3xl font-extrabold text-heading mb-4">{{ product.name }}</h2>

          <!-- Description -->
          <p class="text-body leading-relaxed mb-8">{{ product.description }}</p>

          <!-- CTA Buttons -->
          <div class="flex flex-wrap gap-4 mb-10">
            <Button as="a" :href="waLink" target="_blank" variant="success" class="!py-3.5 !px-6">
              <img src="@/assets/icons/whatsapp.svg" alt="WhatsApp" class="w-5 h-5" />
              Tanya via WhatsApp
            </Button>
            <Button as="a" :href="product.brochureUrl" target="_blank" rel="noopener noreferrer" variant="secondary" class="!py-3.5 !px-6">
              <FileDown class="w-5 h-5" stroke-width="2" />
              Download Brosur (PDF)
            </Button>
          </div>

          <!-- Specs Table -->
          <div>
            <h3 class="text-lg font-bold text-heading mb-4 flex items-center gap-2">
              <ClipboardList class="w-5 h-5 text-link" stroke-width="2" />
              Spesifikasi Teknis
            </h3>
            <div class="bg-divider-light/30 rounded-2xl overflow-hidden border border-divider-light">
              <div
                v-for="(value, key, idx) in product.specs"
                :key="key"
                :class="[
                  'flex border-b border-divider-light last:border-b-0',
                  idx % 2 === 0 ? 'bg-section' : 'bg-divider-light/10'
                ]"
              >
                <div class="w-2/5 px-5 py-3.5 text-sm font-medium text-body-light border-r border-divider-light">
                  {{ key }}
                </div>
                <div class="w-3/5 px-5 py-3.5 text-sm text-heading font-medium">
                  {{ value }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Related Products -->
  <section v-if="product && relatedProducts.length > 0" class="py-20 px-6 lg:py-24 lg:px-8 bg-section/50">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">Rekomendasi</span>
        <h2 class="text-3xl font-extrabold text-heading mt-2">Produk Terkait</h2>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <ProductCard
          v-for="related in relatedProducts"
          :key="related.id"
          :product="related"
        />
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
.page-enter {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.45s ease, transform 0.45s ease;
}
.page-enter--visible {
  opacity: 1;
  transform: translateY(0);
}

/* Image Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Scrollable Thumbnails */
.thumbnail-scroll-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.thumbnail-scroll-container {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  padding: 4px 0;
}

/* Desktop: hide scrollbar */
@media (min-width: 1024px) {
  .thumbnail-scroll-container {
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .thumbnail-scroll-container::-webkit-scrollbar {
    display: none;
  }
}

/* Mobile: show thin scrollbar */
@media (max-width: 1023px) {
  .thumbnail-scroll-container {
    scrollbar-width: thin;
    scrollbar-color: rgba(0,0,0,0.2) transparent;
  }
  .thumbnail-scroll-container::-webkit-scrollbar {
    height: 3px;
  }
  .thumbnail-scroll-container::-webkit-scrollbar-track {
    background: transparent;
  }
  .thumbnail-scroll-container::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 4px;
  }
}

/* When not scrollable, don't allow overflow */
.thumbnail-scroll-container--no-scroll {
  overflow-x: hidden;
}

.thumbnail-scroll-item {
  width: calc(25% - 9px);
  min-width: 80px;
  scroll-snap-align: start;
}

/* Arrow buttons — plain text, no background */
.thumb-nav {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  font-weight: 600;
  color: rgba(0,0,0,0.7);
  cursor: pointer;
  transition: color 0.2s ease, opacity 0.2s ease;
  line-height: 1;
  padding: 0;
  user-select: none;
}
.thumb-nav:hover {
  color: rgba(0,0,0,0.9);
}

/* Disabled state — lower opacity when ≤4 images */
.thumb-nav--disabled {
  opacity: 0.25;
  cursor: default;
  pointer-events: none;
}
</style>
