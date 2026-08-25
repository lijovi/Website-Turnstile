<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

import navData from '@/data/navigation.json'
import companyData from '@/data/company.json'
import { Phone, Menu, X } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const navLinks = navData.mainNav
const ctaButton = navData.ctaButton

const isActive = (link) => {
  if (link === '/') return route.path === '/'
  return route.path.startsWith(link)
}

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const navigateTo = (link) => {
  closeMobileMenu()
  if (link.includes('#')) {
    const [path, hash] = link.split('#')
    if (route.path === path || (path === '/' && route.path === '/')) {
      const el = document.getElementById(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    router.push({ path: path || '/', hash: `#${hash}` })
  } else {
    router.push(link)
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav :class="['navbar', isScrolled ? 'navbar--scrolled' : 'navbar--default', isMobileMenuOpen ? 'navbar--menu-open' : '']">
    <div class="navbar-container">
      <div class="navbar-inner">

        <!-- Logo -->
        <NuxtLink to="/" class="navbar-logo" @click="closeMobileMenu">
          <span class="navbar-brand">{{ companyData.name }}</span>
        </NuxtLink>

        <!-- Desktop Nav Links -->
        <div class="navbar-links">
          <template v-for="link in navLinks" :key="link.link">
            <NuxtLink
              :to="link.link"
              :class="[
                'navbar-link',
                isActive(link.link) ? 'navbar-link--active' : 'navbar-link--idle'
              ]"
            >
              {{ link.text }}
              <span v-if="isActive(link.link)" class="navbar-link-indicator"></span>
            </NuxtLink>
          </template>
        </div>

        <!-- CTA Button -->
        <div class="navbar-cta">
          <button
            @click="navigateTo(ctaButton.link)"
            class="navbar-cta-btn"
          >
            <Phone class="w-4 h-4" stroke-width="2" />
            {{ ctaButton.text }}
          </button>
        </div>

        <!-- Mobile Hamburger -->
        <button
          @click="toggleMobileMenu"
          class="navbar-hamburger"
          aria-label="Toggle menu"
        >
          <transition name="icon-fade" mode="out-in">
            <Menu v-if="!isMobileMenuOpen" key="open" class="w-5 h-5" stroke-width="2" />
            <X v-else key="close" class="w-5 h-5" stroke-width="2" />
          </transition>
        </button>

      </div>

      <!-- Mobile Menu -->
      <transition
        enter-active-class="mobile-enter-active"
        enter-from-class="mobile-enter-from"
        enter-to-class="mobile-enter-to"
        leave-active-class="mobile-leave-active"
        leave-from-class="mobile-leave-from"
        leave-to-class="mobile-leave-to"
      >
        <div v-if="isMobileMenuOpen" class="mobile-menu">
          <div class="mobile-menu-links">
            <template v-for="link in navLinks" :key="link.link">
              <NuxtLink
                :to="link.link"
                @click="closeMobileMenu"
                :class="[
                  'mobile-link',
                  isActive(link.link) ? 'mobile-link--active' : 'mobile-link--idle'
                ]"
              >
                <span v-if="isActive(link.link)" class="mobile-link-dot mobile-link-dot--active"></span>
                <span v-else class="mobile-link-dot"></span>
                {{ link.text }}
              </NuxtLink>
            </template>
          </div>

          <div class="mobile-menu-divider"></div>

          <button
            @click="navigateTo(ctaButton.link)"
            class="mobile-cta-btn"
          >
            <Phone class="w-4 h-4" stroke-width="2" />
            {{ ctaButton.text }}
          </button>
        </div>
      </transition>
    </div>
  </nav>
</template>

<style scoped>
/* ===== BASE NAVBAR ===== */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: rgba(255, 255, 255, 1);
  border-bottom: 1px solid var(--color-divider-light);
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.05);
  transition: background 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar--default {
  padding: 0.875rem 0;
}

.navbar--scrolled {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  padding: 0.625rem 0;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08), 0 1px 4px rgba(0, 0, 0, 0.04);
}

@media (max-width: 767px) {
  .navbar {
    background: white;
    backdrop-filter: none;
  }
  .navbar--scrolled {
    background: white;
    backdrop-filter: none;
  }
  .navbar--menu-open {
    border-bottom-color: transparent;
    box-shadow: none;
  }
}


/* ===== CONTAINER ===== */
.navbar-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .navbar-container {
    padding: 0 2rem;
  }
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ===== LOGO ===== */
.navbar-logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  flex-shrink: 0;
}

.navbar-brand {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--color-heading);
  transition: color 0.2s ease;
}

.navbar-logo:hover .navbar-brand {
  color: var(--color-link);
}

/* ===== DESKTOP NAV LINKS ===== */
.navbar-links {
  display: none;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 768px) {
  .navbar-links {
    display: flex;
  }
}

.navbar-link {
  position: relative;
  padding: 0.5rem 0.875rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.navbar-link--idle {
  color: var(--color-body);
}
.navbar-link--idle:hover {
  color: var(--color-link);
  background: var(--color-link-light);
}

.navbar-link--active {
  color: var(--color-link);
  background: var(--color-link-light);
  font-weight: 600;
}

.navbar-link-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 2.5px;
  border-radius: 99px;
  background: var(--color-link);
}

/* ===== CTA BUTTON ===== */
.navbar-cta {
  display: none;
}

@media (min-width: 768px) {
  .navbar-cta {
    display: flex;
    align-items: center;
  }
}

.navbar-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5625rem 1.125rem;
  border-radius: 9px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.25s ease;
  background: var(--color-link);
  color: white;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
}

.navbar-cta-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
}

/* ===== HAMBURGER ===== */
.navbar-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--color-heading);
  background: transparent;
}

@media (min-width: 768px) {
  .navbar-hamburger {
    display: none;
  }
}

.navbar-hamburger:hover {
  background: transparent;
  opacity: 0.7;
}

/* ===== MOBILE MENU ===== */
.mobile-menu {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border-bottom: 1px solid var(--color-divider-light);
  padding: 1rem 1.5rem;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.mobile-link {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.75rem 0.875rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-link--idle {
  color: var(--color-body);
}
.mobile-link--idle:hover {
  color: var(--color-heading);
}

.mobile-link--active {
  color: var(--color-heading);
  font-weight: 600;
}

.mobile-link-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--color-divider);
  flex-shrink: 0;
}
.mobile-link-dot--active {
  background: var(--color-heading);
}

.mobile-menu-divider {
  height: 1px;
  background: var(--color-divider-light);
  margin: 0.75rem 0;
}

.mobile-cta-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  border-radius: 10px;
  background: var(--color-link);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
}
.mobile-cta-btn:hover {
  background: var(--color-link-hover);
}

/* ===== MOBILE TRANSITION ===== */
.mobile-enter-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.mobile-enter-from   { opacity: 0; transform: translateY(-10px); }
.mobile-enter-to     { opacity: 1; transform: translateY(0); }
.mobile-leave-active { transition: all 0.2s ease; }
.mobile-leave-from   { opacity: 1; transform: translateY(0); }
.mobile-leave-to     { opacity: 0; transform: translateY(-8px); }

/* ===== ICON FADE TRANSITION ===== */
.icon-fade-enter-active { transition: all 0.15s ease; }
.icon-fade-leave-active { transition: all 0.1s ease; }
.icon-fade-enter-from   { opacity: 0; transform: rotate(-90deg) scale(0.7); }
.icon-fade-enter-to     { opacity: 1; transform: rotate(0deg) scale(1); }
.icon-fade-leave-from   { opacity: 1; }
.icon-fade-leave-to     { opacity: 0; }
</style>
