<script setup>
import { ref, onMounted } from 'vue'
import statsData from '@/data/stats.json'
import { Calendar, Building, ShieldCheck, Clock } from 'lucide-vue-next'

const stats = statsData
const isVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )

  const el = document.getElementById('stats-bar')
  if (el) observer.observe(el)
})
</script>

<template>
  <div id="stats-bar" class="bg-section border-y border-divider-light">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div
          v-for="(stat, idx) in stats"
          :key="idx"
          :class="[
            'text-center transition-all duration-700',
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          ]"
          :style="{ transitionDelay: `${idx * 150}ms` }"
        >
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-link-light flex items-center justify-center">
            <!-- Calendar -->
            <Calendar v-if="stat.iconType === 'calendar'" class="w-6 h-6 text-link" stroke-width="1.5" />
            <!-- Building -->
            <Building v-else-if="stat.iconType === 'building'" class="w-6 h-6 text-link" stroke-width="1.5" />
            <!-- Shield -->
            <ShieldCheck v-else-if="stat.iconType === 'shield'" class="w-6 h-6 text-link" stroke-width="1.5" />
            <!-- Clock -->
            <Clock v-else-if="stat.iconType === 'clock'" class="w-6 h-6 text-link" stroke-width="1.5" />
          </div>
          <div class="text-3xl md:text-4xl font-extrabold text-heading mb-1">
            {{ stat.value }}
          </div>
          <div class="text-sm text-body-light font-medium">{{ stat.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
