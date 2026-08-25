<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true
  }
})
import { Star } from 'lucide-vue-next'
</script>

<template>
  <div class="bg-section rounded-2xl border border-divider-light p-6 shadow-sm card-hover">
    <!-- Stars -->
    <div class="flex gap-1 mb-4">
      <Star v-for="i in testimonial.rating" :key="i" class="w-4 h-4 text-star fill-current" stroke-width="0" />
    </div>

    <!-- Quote -->
    <p class="text-body text-sm leading-relaxed mb-6 italic">
      "{{ testimonial.text }}"
    </p>

    <!-- Author -->
    <div class="flex items-center gap-3 pt-4 border-t border-divider-light">
      <div class="w-10 h-10 rounded-full bg-gradient-to-br from-link to-link-hover flex items-center justify-center text-white font-bold text-sm shadow-sm">
        {{ testimonial.name.charAt(0) }}
      </div>
      <div>
        <div class="text-sm font-semibold text-heading">{{ testimonial.name }}</div>
        <div class="text-xs text-body-light">{{ testimonial.role }}, {{ testimonial.company }}</div>
      </div>
    </div>
  </div>
</template>
