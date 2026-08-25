<script setup>

import navData from "@/data/navigation.json";
import companyData from "@/data/company.json";
import { ChevronRight, Mail, Phone, MapPin, Clock } from "lucide-vue-next";

const router = useRouter();
const navLinks = navData.mainNav;
const footerCta = navData.footer;

const navigateTo = (link) => {
  if (!link) return;
  if (link.startsWith("mailto:") || link.startsWith("tel:")) {
    window.open(link);
    return;
  }
  if (link.includes("#")) {
    const [path, hash] = link.split("#");
    router.push({ path: path || "/", hash: `#${hash}` });
  } else {
    router.push(link);
  }
};
</script>

<template>
  <footer class="footer-root relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="footer-bg-glow footer-bg-glow--left"></div>
    <div class="footer-bg-glow footer-bg-glow--right"></div>

    <!-- Top divider gradient line -->
    <div class="footer-top-line"></div>

    <!-- Main Footer Content -->
    <div class="footer-main">
      <div class="footer-container">
        <div class="footer-grid">
          <!-- Column 1: Brand -->
          <div class="footer-brand-col">
            <!-- Logo -->
            <div class="footer-logo">
              <div>
                <span class="footer-brand-name">{{ companyData.name }}</span>
                <span class="footer-brand-tagline">{{
                  companyData.tagline
                }}</span>
              </div>
            </div>

            <!-- Description -->
            <p class="footer-desc">
              {{ companyData.description }}
            </p>

            <!-- Social links -->
            <div class="footer-social">
              <a
                :href="companyData.social.instagram"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-btn"
                aria-label="Instagram"
              >
                <img src="@/assets/icons/instagram.svg" alt="Instagram" class="w-[18px] h-[18px]" />
              </a>
              <a
                :href="companyData.social.linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-btn"
                aria-label="LinkedIn"
              >
                <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" class="w-[18px] h-[18px]" />
              </a>
              <a
                :href="companyData.social.youtube"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-btn"
                aria-label="YouTube"
              >
                <img src="@/assets/icons/youtube.svg" alt="YouTube" class="w-[18px] h-[18px]" />
              </a>
            </div>
          </div>

          <!-- Column 2: Navigation -->
          <div class="footer-links-col">
            <h4 class="footer-col-title">
              <span class="footer-col-title-accent"></span>
              Navigasi
            </h4>
            <ul class="footer-links-list">
              <li v-for="item in navLinks" :key="item.link">
                <a
                  @click.prevent="navigateTo(item.link)"
                  href="#"
                  class="footer-link"
                >
                  <ChevronRight
                    class="w-3.5 h-3.5 opacity-50 group-hover:opacity-100 transition-opacity"
                    stroke-width="2.5"
                  />
                  {{ item.text }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Column 3: Contact -->
          <div class="footer-links-col">
            <h4 class="footer-col-title">
              <span class="footer-col-title-accent"></span>
              Kontak
            </h4>
            <ul class="footer-contact-list">
              <!-- Email -->
              <li>
                <a
                  @click.prevent="navigateTo('mailto:' + companyData.email)"
                  href="#"
                  class="footer-contact-item"
                >
                  <div class="footer-contact-icon">
                    <Mail class="w-4 h-4" />
                  </div>
                  <span>{{ companyData.email }}</span>
                </a>
              </li>
              <!-- Phone -->
              <li>
                <a
                  @click.prevent="
                    navigateTo('tel:' + companyData.phone.replace(/\s/g, ''))
                  "
                  href="#"
                  class="footer-contact-item"
                >
                  <div class="footer-contact-icon">
                    <Phone class="w-4 h-4" />
                  </div>
                  <span>{{ companyData.phone }}</span>
                </a>
              </li>
              <!-- Address -->
              <li>
                <div class="footer-contact-item footer-contact-item--static">
                  <div class="footer-contact-icon">
                    <MapPin class="w-4 h-4" />
                  </div>
                  <span>{{ companyData.address }}</span>
                </div>
              </li>
              <!-- Hours -->
              <li>
                <div class="footer-contact-item footer-contact-item--static">
                  <div class="footer-contact-icon">
                    <Clock class="w-4 h-4" />
                  </div>
                  <span>{{ companyData.operatingHours }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Column 4: WhatsApp CTA -->
          <div class="footer-cta-col">
            <h4 class="footer-col-title">
              <span class="footer-col-title-accent"></span>
              {{ footerCta.ctaTitle }}
            </h4>
            <p class="footer-cta-desc">
              {{ footerCta.ctaDescription }}
            </p>
            <a
              :href="'https://wa.me/' + companyData.whatsapp"
              target="_blank"
              rel="noopener"
              class="footer-wa-btn"
            >
              <img src="@/assets/icons/whatsapp.svg" alt="WhatsApp" class="w-5 h-5" />
              Chat via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="footer-bottom">
      <div class="footer-container">
        <div class="footer-bottom-inner">
          <span class="footer-copyright">{{ companyData.copyright }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* ===== ROOT ===== */
.footer-root {
  background: #000000;
  color: white;
  position: relative;
}

/* ===== DECORATIVE GLOWS ===== */
.footer-bg-glow {
  position: absolute;
  width: 500px;
  height: 500px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
  opacity: 0.06;
}
.footer-bg-glow--left {
  top: -100px;
  left: -100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.8), transparent 70%);
}
.footer-bg-glow--right {
  bottom: -100px;
  right: -100px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.5), transparent 70%);
}

/* ===== TOP ACCENT LINE ===== */
.footer-top-line {
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2) 30%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.2) 70%,
    transparent
  );
}

/* ===== LAYOUT ===== */
.footer-main {
  padding: 4rem 0 3.5rem;
}
.footer-container {
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}

@media (min-width: 1024px) {
  .footer-container {
    padding: 0 2rem;
  }
}

.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}

@media (min-width: 640px) {
  .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 2fr 1fr 1.5fr 1.8fr;
    gap: 3rem;
  }
}

/* ===== BRAND COLUMN ===== */
.footer-logo {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}

.footer-logo-icon {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border-radius: 12px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(255, 255, 255, 0.1);
}

.footer-brand-name {
  display: block;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.footer-brand-tagline {
  display: block;
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-link);
  opacity: 0.8;
  letter-spacing: 0.03em;
  margin-top: 2px;
  text-transform: uppercase;
}

.footer-desc {
  font-size: 0.85rem;
  color: var(--color-divider);
  line-height: 1.75;
  margin-bottom: 1.5rem;
}

/* ===== SOCIAL BUTTONS ===== */
.footer-social {
  display: flex;
  gap: 0.625rem;
}

.footer-social-btn {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-divider);
  transition: all 0.25s ease;
}

.footer-social-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(255, 255, 255, 0.1);
}

/* ===== COLUMN TITLES ===== */
.footer-col-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 1.25rem;
}

.footer-col-title-accent {
  display: block;
  width: 3px;
  height: 14px;
  border-radius: 2px;
  background: white;
  flex-shrink: 0;
}

/* ===== NAV LINKS ===== */
.footer-links-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.footer-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  color: var(--color-divider);
  text-decoration: none;
  padding: 0.375rem 0;
  transition: all 0.2s ease;
  border-radius: 6px;
}

.footer-link:hover {
  color: white;
  transform: translateX(4px);
}

/* ===== CONTACT LIST ===== */
.footer-contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-contact-item {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.82rem;
  color: var(--color-divider);
  text-decoration: none;
  line-height: 1.5;
  transition: color 0.2s ease;
}

a.footer-contact-item:hover {
  color: white;
}

a.footer-contact-item:hover .footer-contact-icon {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
  color: white;
}

.footer-contact-item--static {
  cursor: default;
}

.footer-contact-icon {
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-link-light);
  transition: all 0.2s ease;
  margin-top: 1px;
}

/* ===== CTA COLUMN ===== */
.footer-cta-desc {
  font-size: 0.85rem;
  color: var(--color-divider);
  line-height: 1.7;
  margin-bottom: 1.25rem;
}

.footer-wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: var(--color-success);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(22, 163, 74, 0.25);
  margin-bottom: 1.25rem;
}

.footer-wa-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(22, 163, 74, 0.35);
}

/* ===== BOTTOM BAR ===== */
.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.25rem 0;
}

.footer-bottom-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  text-align: center;
}

@media (min-width: 640px) {
  .footer-bottom-inner {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
}

.footer-copyright {
  font-size: 0.8rem;
  color: var(--color-body);
}
</style>
