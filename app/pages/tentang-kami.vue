<script setup>
import aboutData from '@/data/about.json'
import companyData from '@/data/company.json'

const about = aboutData

useHead({
  title: `${about.pageTitle} | ${companyData.name}`,
  meta: [
    { name: 'description', content: about.pageSubtitle },
  ],
})

// Resolve asset images from JSON paths
const companyImages = import.meta.glob('~/assets/CompanyPicture/*.{png,jpg,jpeg}', { eager: true, import: 'default' })
const getCompanyImageUrl = (path) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const key = Object.keys(companyImages).find(k => k.endsWith('/' + filename))
  return key ? companyImages[key] : path
}
</script>

<template>
  <div class="overflow-x-hidden">
  <!-- Hero -->
  <section class="pt-36 pb-24 relative overflow-hidden flex items-center justify-center min-h-[40vh]">
    <!-- Background Image -->
    <div class="absolute inset-0 z-0">
      <img :src="getCompanyImageUrl(about.heroImage)" alt="Tentang Kami" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/60"></div>
    </div>
    
    <div v-reveal class="reveal-up max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-4">{{ about.pageTitle }}</h1>
      <p class="text-lg text-gray-200 max-w-2xl mx-auto">{{ about.pageSubtitle }}</p>
    </div>
  </section>

  <Breadcrumb class="mt-5"/>

  <!-- Sejarah Perusahaan -->
  <section class="pt-10 pb-16 bg-white">
    <div class="max-w-6xl mx-auto px-6 lg:px-10">
      <div class="history-grid">
        <div v-reveal class="reveal-left">
          <span class="inline-block text-xs font-bold uppercase tracking-widest text-link bg-link-light py-1.5 rounded-full mb-4">Sejarah Kami</span>
          <h2 class="text-3xl font-extrabold text-heading mt-2 mb-6 tracking-tight">{{ about.history.title }}</h2>
          <div class="space-y-4">
            <p
              v-for="(paragraph, idx) in about.history.content.split('\n\n')"
              :key="idx"
              class="text-[0.9375rem] text-body leading-[1.8]"
            >
              {{ paragraph }}
            </p>
          </div>
        </div>
        <div v-reveal class="reveal-right flex justify-center">
          <div class="w-full aspect-[4/3] rounded-2xl flex flex-col items-center justify-center border border-divider-light shadow-lg overflow-hidden">
            <img :src="getCompanyImageUrl(about.history.image)" alt="Bangunan Kantor" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Visi & Misi Section -->
  <section class="py-16 pb-28 lg:pb-36 bg-white">
    <div class="max-w-6xl mx-auto px-6 lg:px-10">
      <div class="vm-grid">
        <!-- Left: Image -->
        <div v-reveal class="reveal-left flex vm-image">
          <div class="w-full min-h-96 rounded-2xl flex flex-col items-center justify-center border border-divider-light overflow-hidden shadow-lg">
            <img :src="getCompanyImageUrl(about.visionMissionImage)" alt="Tim Bekerja" class="w-full h-full object-cover" />
          </div>
        </div>

        <!-- Right: Visi & Misi Text -->
        <div class="flex flex-col justify-center gap-10 vm-text">
          <!-- Visi -->
          <div v-reveal class="reveal-up flex flex-col gap-3">
            <h3 class="text-2xl font-extrabold text-heading tracking-wide">VISI</h3>
            <p class="text-[0.9375rem] text-body leading-[1.8]">{{ about.vision.content }}</p>
          </div>

          <!-- Misi -->
          <div v-reveal class="reveal-up flex flex-col gap-3" style="transition-delay: 0.15s;">
            <h3 class="text-2xl font-extrabold text-heading tracking-wide">MISI</h3>
            <p class="text-[0.9375rem] text-body leading-[1.8]">{{ about.mission.items.join(' ') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>

/* ===== GRID LAYOUTS ===== */
.history-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: center;
}

@media (min-width: 1024px) {
  .history-grid {
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
  }
}

.vm-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  align-items: stretch;
}

.vm-image {
  order: 2;
}

.vm-text {
  order: 1;
}

@media (min-width: 1024px) {
  .vm-grid {
    grid-template-columns: 1fr 1fr;
    gap: 3.5rem;
  }
  .vm-image {
    order: 0;
  }
  .vm-text {
    order: 0;
  }
}
</style>
