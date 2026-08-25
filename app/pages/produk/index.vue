<script setup>
import { ref, computed, onMounted, nextTick } from 'vue'

import productsData from '@/data/products.json'
import categoriesData from '@/data/categories.json'
import companyData from '@/data/company.json'


import { Search } from 'lucide-vue-next'

useHead({
  title: `Produk | ${companyData.name}`,
  meta: [
    { name: 'description', content: 'Temukan berbagai produk turnstile gate berkualitas tinggi — tripod turnstile, flap barrier, swing barrier, full height turnstile, dan sistem akses kontrol.' },
  ],
})


const route = useRoute()

const searchQuery = ref('')
const selectedCategory = ref('all')

const pageVisible = ref(false)

onMounted(async () => {
  if (route.query.category) {
    selectedCategory.value = route.query.category
  }
  await nextTick()
  setTimeout(() => { pageVisible.value = true }, 50)
})

const filteredProducts = computed(() => {
  let results = productsData

  if (selectedCategory.value !== 'all') {
    results = results.filter(p => p.category === selectedCategory.value)
  }

  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    results = results.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.shortDesc.toLowerCase().includes(query)
    )
  }

  return results
})

const selectCategory = (catId) => {
  selectedCategory.value = catId
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <!-- Spacer for fixed navbar -->
  <div class="pt-20"></div>

  <Breadcrumb />

  <!-- Product Listing -->
  <div :class="['page-enter', pageVisible && 'page-enter--visible']">
  <section class="pt-8 pb-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col lg:flex-row lg:gap-8">
        <!-- Sidebar -->
        <aside class="w-full lg:w-64 flex-shrink-0">
          <div class="sidebar-card bg-section rounded-2xl p-6 border border-divider-light shadow-sm sticky top-24">
            <!-- Search -->
            <div class="mb-6">
              <label class="text-sm font-semibold text-heading mb-3 block">Cari Produk</label>
              <div class="relative">
                <Search class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-body-light" stroke-width="2" />
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Cari produk..."
                  class="w-full bg-divider-light/30 border border-divider-light rounded-xl pl-10 pr-4 py-2.5 text-sm text-heading placeholder-body-light focus:outline-none focus:border-link focus:ring-2 focus:ring-link/20 transition-all"
                >
              </div>
            </div>

            <!-- Categories -->
            <div>
              <label class="text-sm font-semibold text-heading mb-3 block">Kategori</label>
              <div class="categories-container">
                <button
                  @click="selectCategory('all')"
                  :class="[
                    'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all category-btn',
                    selectedCategory === 'all'
                      ? 'bg-link-light text-link shadow-sm'
                      : 'text-body hover:bg-divider-light/30 hover:text-heading'
                  ]"
                >
                  Semua Produk
                </button>
                <button
                  v-for="cat in categoriesData"
                  :key="cat.id"
                  @click="selectCategory(cat.id)"
                  :class="[
                    'w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all category-btn',
                    selectedCategory === cat.id
                      ? 'bg-link-light text-link shadow-sm'
                      : 'text-body hover:bg-divider-light/30 hover:text-heading'
                  ]"
                >
                  {{ cat.name }}
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Product Grid -->
        <div class="flex-1">
          <!-- Results Count -->
          <div class="flex items-center justify-between mb-6">
            <p class="text-sm text-body-light">
              Menampilkan <span class="font-semibold text-heading">{{ filteredProducts.length }}</span> produk
            </p>
          </div>

          <div v-if="filteredProducts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-20 animate-fade-in-up" style="animation-duration: 0.3s;">
            <Search class="w-16 h-16 text-divider mx-auto mb-4" stroke-width="1" />
            <h3 class="text-lg font-semibold text-heading mb-2">Produk tidak ditemukan</h3>
            <p class="text-sm text-body-light">Coba ubah kata kunci pencarian atau pilih kategori lain.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
.page-enter {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.page-enter--visible {
  opacity: 1;
  transform: translateY(0);
}

/* ===== DESKTOP CATEGORIES SPACING ===== */
@media (min-width: 1024px) {
  .categories-container {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
}

/* ===== MOBILE SIDEBAR & CATEGORIES ===== */
@media (max-width: 1023px) {
  .sidebar-card {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
    position: static !important;
    margin-bottom: 1.5rem;
  }

  .categories-container {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    overflow-x: auto !important;
    margin: 0 -1rem !important;
    padding: 0.25rem 1rem 0.75rem 1rem !important;
    gap: 0.5rem !important;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }

  .categories-container::-webkit-scrollbar {
    display: none;
  }

  .categories-container > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }

  .category-btn {
    width: auto !important;
    text-align: center !important;
    flex-shrink: 0 !important;
    padding: 0.5rem 1.25rem !important;
    border-radius: 9999px !important;
    white-space: nowrap !important;
  }
}
</style>
