<script setup>
import { ref } from 'vue'
import faqData from '@/data/faq.json'
import { Plus, Minus } from 'lucide-vue-next'

const faqs = faqData
const openIndex = ref(null)

const toggle = (idx) => {
  openIndex.value = openIndex.value === idx ? null : idx
}
</script>

<template>
  <div class="space-y-3">
    <div
      v-for="(faq, idx) in faqs"
      :key="idx"
      class="bg-section rounded-xl border border-divider-light overflow-hidden shadow-sm transition-all duration-300"
      :class="openIndex === idx ? 'shadow-md border-link-light' : 'hover:border-divider'"
    >
      <button
        @click="toggle(idx)"
        class="w-full flex items-center justify-between p-5 text-left transition-colors cursor-pointer"
        :class="openIndex === idx ? 'bg-link-light/50' : 'hover:bg-divider-light/30'"
      >
        <span class="text-sm font-semibold text-heading pr-4">{{ faq.question }}</span>
        <div
          :class="[
            'w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 relative overflow-hidden',
            openIndex === idx ? 'bg-link' : 'bg-divider-light'
          ]"
        >
          <transition name="faq-icon" mode="out-in">
            <!-- Minus icon (open) -->
            <Minus
              v-if="openIndex === idx"
              key="minus"
              class="w-4 h-4 text-white"
              stroke-width="2.5"
            />
            <!-- Plus icon (closed) -->
            <Plus
              v-else
              key="plus"
              class="w-4 h-4 text-body-light"
              stroke-width="2.5"
            />
          </transition>
        </div>
      </button>

      <transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="max-h-0 opacity-0"
        enter-to-class="max-h-96 opacity-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="max-h-96 opacity-100"
        leave-to-class="max-h-0 opacity-0"
      >
        <div v-if="openIndex === idx" class="overflow-hidden">
          <div class="px-5 pb-5 text-sm text-body leading-relaxed">
            {{ faq.answer }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.faq-icon-enter-active,
.faq-icon-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.faq-icon-enter-from {
  opacity: 0;
  transform: scale(0.5) rotate(-45deg);
}
.faq-icon-enter-to {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
.faq-icon-leave-from {
  opacity: 1;
  transform: scale(1) rotate(0deg);
}
.faq-icon-leave-to {
  opacity: 0;
  transform: scale(0.5) rotate(45deg);
}
</style>
