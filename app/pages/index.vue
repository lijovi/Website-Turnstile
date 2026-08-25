<script setup>
import emailjs from '@emailjs/browser'
import heroData from '@/data/hero.json'
import productsData from '@/data/products.json'
import projectsData from '@/data/projects.json'
import testimonialsData from '@/data/testimonials.json'
import companyData from '@/data/company.json'
import sectionsData from '@/data/sections.json'

import { ArrowRight, Building, MapPin, Phone, Mail, Clock, CheckCircle, XCircle, Loader2 } from 'lucide-vue-next'

const runtimeConfig = useRuntimeConfig()
const router = useRouter()

useHead({
  title: `${companyData.name} — ${companyData.tagline}`,
  meta: [
    { name: 'description', content: heroData.subheadline },
  ],
})

const featuredProducts = productsData.filter(p => p.featured)
const projectImages = import.meta.glob('~/assets/Project/*.{png,jpg,jpeg}', { eager: true, import: 'default' })
const heroImages = import.meta.glob('~/assets/images/*.{png,jpg,jpeg}', { eager: true, import: 'default' })

const getProjectImageUrl = (path) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const key = Object.keys(projectImages).find(k => k.endsWith('/' + filename))
  return key ? projectImages[key] : path
}

const getHeroImageUrl = (path) => {
  if (!path) return ''
  const filename = path.split('/').pop()
  const key = Object.keys(heroImages).find(k => k.endsWith('/' + filename))
  return key ? heroImages[key] : path
}

const projects = projectsData
const testimonials = testimonialsData

// Google Maps URL validation — only allow google.com/maps embeds
const validatedMapsUrl = computed(() => {
  const url = companyData.googleMapsEmbed
  if (!url) return ''
  try {
    const parsed = new URL(url)
    if (parsed.hostname.endsWith('google.com') && parsed.pathname.includes('/maps')) {
      return url
    }
    return ''
  } catch {
    return ''
  }
})

// Contact form
const formRef = ref(null)
const contactForm = ref({
  name: '',
  email: '',
  message: ''
})
const honeypot = ref('')
const isSending = ref(false)
const sendStatus = ref(null)
const sendMessage = ref('')
const lastSubmitTime = ref(0)

const submitContact = () => {
  if (honeypot.value) {
    sendStatus.value = 'success'
    sendMessage.value = 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'
    contactForm.value = { name: '', email: '', message: '' }
    return
  }

  // Simple rate limiting: 30 second cooldown
  const now = Date.now()
  if (now - lastSubmitTime.value < 30000) {
    sendStatus.value = 'error'
    sendMessage.value = 'Mohon tunggu beberapa saat sebelum mengirim pesan lagi.'
    setTimeout(() => {
      sendStatus.value = null
      sendMessage.value = ''
    }, 5000)
    return
  }

  isSending.value = true
  sendStatus.value = null
  sendMessage.value = ''
  lastSubmitTime.value = now

  emailjs
    .sendForm(
      companyData.emailJs.serviceId,
      companyData.emailJs.templateId,
      formRef.value,
      {
        publicKey: companyData.emailJs.publicKey,
      },
    )
    .then(
      () => {
        isSending.value = false
        sendStatus.value = 'success'
        sendMessage.value = 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.'
        // Reset form
        contactForm.value = { name: '', email: '', message: '' }
        // Auto-hide status after 5 seconds
        setTimeout(() => {
          sendStatus.value = null
          sendMessage.value = ''
        }, 5000)
      },
      (error) => {
        isSending.value = false
        sendStatus.value = 'error'
        sendMessage.value = 'Gagal mengirim pesan. Silakan coba lagi atau hubungi kami langsung.'
        if (import.meta.dev) {
          console.error('EmailJS Error:', error.text)
        }
        // Auto-hide status after 5 seconds
        setTimeout(() => {
          sendStatus.value = null
          sendMessage.value = ''
        }, 5000)
      },
    )
}
</script>

<template>
  <!-- HERO SECTION -->
  <section class="gradient-hero relative overflow-hidden min-h-screen flex items-center">
    <!-- Mobile Background Image -->
    <div class="absolute inset-0 z-0 lg:hidden">
      <img :src="getHeroImageUrl(heroData.heroImage)" alt="Hero Background" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-black/75"></div>
    </div>



    <!-- Grid Pattern Overlay -->
    <div class="absolute inset-0 opacity-5" style="background-image: linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px); background-size: 60px 60px;"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10 w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Text Content -->
        <div class="animate-fade-in-up relative z-10 text-left">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white lg:text-heading leading-tight mb-6">
            {{ heroData.headline }}
          </h1>

          <p class="text-lg text-gray-200 lg:text-body leading-relaxed mb-8 max-w-lg text-left">
            {{ heroData.subheadline }}
          </p>

          <div class="flex flex-wrap gap-4 justify-start">
            <NuxtLink to="/produk" custom v-slot="{ href, navigate }">
              <Button as="a" :href="href" @click="navigate" variant="hero-primary">
                {{ heroData.ctaPrimary.text }}
                <ArrowRight class="w-4 h-4" />
              </Button>
            </NuxtLink>
            <Button as="a" :href="heroData.ctaSecondary.link" variant="hero-secondary">
              {{ heroData.ctaSecondary.text }}
            </Button>
          </div>
        </div>

        <!-- Hero Image / Visual -->
        <div class="animate-slide-right animation-delay-300 hidden lg:block">
          <div class="relative">
            <div class="w-full aspect-square max-w-lg mx-auto rounded-3xl overflow-hidden border border-divider-light shadow-2xl relative">
              <img :src="getHeroImageUrl(heroData.heroImage)" alt="Premium Turnstile Gate" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col items-center justify-end p-8">
                <span class="text-white text-lg font-semibold text-center drop-shadow-md">Turnstile Gate<br>Premium Solution</span>
              </div>
            </div>
            <!-- Floating badges from JSON -->
            <div v-if="heroData.badges && heroData.badges[0]" class="absolute -top-4 -right-4 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-200">
              <div class="text-2xl font-extrabold text-heading">{{ heroData.badges[0].value }}</div>
              <div class="text-xs text-body">{{ heroData.badges[0].label }}</div>
            </div>
            <div v-if="heroData.badges && heroData.badges[1]" class="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl animate-float animation-delay-400">
              <div class="text-2xl font-extrabold text-link">{{ heroData.badges[1].value }}</div>
              <div class="text-xs text-body">{{ heroData.badges[1].label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS BAR -->
  <StatsBar />

  <!-- FEATURED PRODUCTS -->
  <section class="py-10 px-6 lg:py-24 lg:px-8 bg-section">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">{{ sectionsData.featuredProducts.badge }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-heading mt-2 mb-4">{{ sectionsData.featuredProducts.title }}</h2>
        <p class="text-body max-w-2xl mx-auto">{{ sectionsData.featuredProducts.subtitle }}</p>
      </div>

      <div v-reveal class="reveal-up grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProductCard
          v-for="product in featuredProducts"
          :key="product.id"
          :product="product"
        />
      </div>

      <div v-reveal class="reveal-up text-center mt-16">
        <NuxtLink to="/produk" custom v-slot="{ href, navigate }">
          <Button as="a" :href="href" @click="navigate" variant="secondary">
            {{ sectionsData.featuredProducts.buttonText }}
            <ArrowRight class="w-4 h-4" />
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>

  <!-- RECENT PROJECTS -->
  <section class="py-10 px-6 lg:py-24 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">{{ sectionsData.projects.badge }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-heading mt-2 mb-4">{{ sectionsData.projects.title }}</h2>
        <p class="text-body max-w-2xl mx-auto">{{ sectionsData.projects.subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          v-reveal
          class="reveal-up group bg-white rounded-2xl border border-divider-light overflow-hidden shadow-sm transition-all duration-300"
        >
          <div class="aspect-[16/10] bg-divider-light relative overflow-hidden group">
            <img :src="getProjectImageUrl(project.image)" :alt="project.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
          </div>
          <div class="p-5">
            <h3 class="text-base font-bold text-heading mb-1 group-hover:text-link transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-sm text-body leading-relaxed mb-3">{{ project.description }}</p>
            <div class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full bg-link-light flex items-center justify-center">
                <Building class="w-3 h-3 text-link" stroke-width="2" />
              </div>
              <span class="text-xs text-body-light font-medium">{{ project.client }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIALS -->
  <section class="py-10 lg:py-24 bg-section overflow-hidden">
    <!-- Constrained Title Container -->
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <div v-reveal class="reveal-up text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">{{ sectionsData.testimonials.badge }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-heading mt-2 mb-4">{{ sectionsData.testimonials.title }}</h2>
        <p class="text-body max-w-2xl mx-auto">{{ sectionsData.testimonials.subtitle }}</p>
      </div>
    </div>

    <!-- Full Width Marquee Container -->
    <div v-reveal class="reveal-up w-full relative py-6">
      <!-- Marquee Track -->
      <div class="flex animate-marquee-left w-max group">
        <!-- Copy 1 -->
        <div class="flex gap-6 pr-6">
          <div class="w-[300px] md:w-[350px] lg:w-[400px] shrink-0" v-for="testimonial in testimonials" :key="testimonial.id">
            <TestimonialCard :testimonial="testimonial" class="h-full" />
          </div>
        </div>
        <!-- Copy 2 -->
        <div class="flex gap-6 pr-6" aria-hidden="true">
          <div class="w-[300px] md:w-[350px] lg:w-[400px] shrink-0" v-for="testimonial in testimonials" :key="'dup-' + testimonial.id">
            <TestimonialCard :testimonial="testimonial" class="h-full" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ SECTION -->
  <section id="faq" class="py-10 px-6 lg:py-24 lg:px-8 bg-white">
    <div class="max-w-5xl mx-auto">
      <div v-reveal class="reveal-up text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">{{ sectionsData.faq.badge }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-heading mt-2 mb-4">{{ sectionsData.faq.title }}</h2>
        <p class="text-body">{{ sectionsData.faq.subtitle }}</p>
      </div>

      <div v-reveal class="reveal-up">
        <FaqAccordion />
      </div>
    </div>
  </section>

  <!-- CONTACT SECTION -->
  <section id="kontak" class="pt-10 pb-20 px-6 lg:py-24 lg:px-8 gradient-hero relative overflow-hidden">
    <div class="max-w-7xl mx-auto relative z-10">
      <div v-reveal class="reveal-up text-center mb-12">
        <span class="text-link text-sm font-semibold uppercase tracking-wider">{{ sectionsData.contact.badge }}</span>
        <h2 class="text-3xl md:text-4xl font-extrabold text-heading mt-2 mb-4">{{ sectionsData.contact.title }}</h2>
        <p class="text-body max-w-2xl mx-auto">{{ sectionsData.contact.subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <!-- Contact Form -->
        <div v-reveal class="reveal-left bg-section rounded-2xl p-8 border border-divider-light">
          <h3 class="text-xl font-bold text-heading mb-6">{{ sectionsData.contact.formTitle }}</h3>
          <form ref="formRef" @submit.prevent="submitContact" class="space-y-4">
            <div>
              <label class="block text-sm text-body mb-2 font-medium">Nama Lengkap</label>
              <input
                v-model="contactForm.name"
                name="user_name"
                type="text"
                required
                :disabled="isSending"
                placeholder="Masukkan nama Anda"
                class="w-full bg-divider-light border border-divider-light rounded-xl px-4 py-3 text-heading placeholder-body-light text-sm focus:outline-none focus:border-link focus:ring-2 focus:ring-link/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
            </div>
            <!-- Honeypot anti-bot (hidden from real users) -->
            <div class="absolute opacity-0 -z-10 h-0 overflow-hidden" aria-hidden="true" tabindex="-1">
              <label>Phone</label>
              <input
                v-model="honeypot"
                name="phone_number"
                type="text"
                tabindex="-1"
                autocomplete="off"
              >
            </div>
            <div>
              <label class="block text-sm text-body mb-2 font-medium">Email</label>
              <input
                v-model="contactForm.email"
                name="user_email"
                type="email"
                required
                :disabled="isSending"
                placeholder="contoh@email.com"
                class="w-full bg-divider-light border border-divider-light rounded-xl px-4 py-3 text-heading placeholder-body-light text-sm focus:outline-none focus:border-link focus:ring-2 focus:ring-link/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
            </div>
            <div>
              <label class="block text-sm text-body mb-2 font-medium">Pesan</label>
              <textarea
                v-model="contactForm.message"
                name="message"
                rows="4"
                required
                :disabled="isSending"
                placeholder="Tuliskan pesan atau kebutuhan Anda"
                class="w-full bg-divider-light border border-divider-light rounded-xl px-4 py-3 text-heading placeholder-body-light text-sm focus:outline-none focus:border-link focus:ring-2 focus:ring-link/20 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              ></textarea>
            </div>
            <Button type="submit" variant="primary" class="w-full justify-center !py-3.5" :disabled="isSending">
              <Loader2 v-if="isSending" class="w-5 h-5 animate-spin" stroke-width="2" />
              <Mail v-else class="w-5 h-5" stroke-width="2" />
              {{ isSending ? 'Mengirim...' : 'Kirim Pesan' }}
            </Button>
          </form>

          <!-- Status Message -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div
              v-if="sendStatus"
              :class="[
                'mt-4 p-4 rounded-xl flex items-center gap-3 text-sm font-medium',
                sendStatus === 'success'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-red-50 text-red-700 border border-red-200'
              ]"
            >
              <CheckCircle v-if="sendStatus === 'success'" class="w-5 h-5 flex-shrink-0" stroke-width="2" />
              <XCircle v-else class="w-5 h-5 flex-shrink-0" stroke-width="2" />
              {{ sendMessage }}
            </div>
          </Transition>
        </div>

        <!-- Contact Info -->
        <div v-reveal class="reveal-right flex flex-col gap-6">
          <div class="bg-section rounded-2xl p-8 border border-divider-light">
            <h3 class="text-xl font-bold text-heading mb-6">{{ sectionsData.contact.infoTitle }}</h3>
            <div class="space-y-5">
              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-link-light flex items-center justify-center flex-shrink-0">
                  <MapPin class="w-5 h-5 text-link" stroke-width="2" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-heading">Alamat Kantor</div>
                  <div class="text-sm text-body">{{ companyData.address }}</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-link-light flex items-center justify-center flex-shrink-0">
                  <Phone class="w-5 h-5 text-link" stroke-width="2" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-heading">Telepon / WhatsApp</div>
                  <div class="text-sm text-body">{{ companyData.phone }}</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-link-light flex items-center justify-center flex-shrink-0">
                  <Mail class="w-5 h-5 text-link" stroke-width="2" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-heading">Email</div>
                  <div class="text-sm text-body">{{ companyData.email }}</div>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-10 h-10 rounded-xl bg-link-light flex items-center justify-center flex-shrink-0">
                  <Clock class="w-5 h-5 text-link" stroke-width="2" />
                </div>
                <div>
                  <div class="text-sm font-semibold text-heading">Jam Operasional</div>
                  <div class="text-sm text-body">{{ companyData.operatingHours }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Map -->
          <div class="bg-section rounded-2xl overflow-hidden border border-divider-light flex-1 min-h-[200px]">
            <iframe
              v-if="validatedMapsUrl"
              :src="validatedMapsUrl"
              class="w-full h-full min-h-[200px]"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
            <div v-else class="w-full h-full min-h-[200px] flex items-center justify-center text-body-light text-sm">
              Peta tidak tersedia
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
