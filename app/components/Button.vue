<template>
  <component
    :is="as"
    :class="[
      'inline-flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-sm transition-all duration-300 cursor-pointer',
      variantClasses[variant]
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'white', 'outline-white', 'success', 'hero-primary', 'hero-secondary'].includes(value)
  },
  as: {
    type: [String, Object],
    default: 'button'
  }
});

const variantClasses = {
  'primary': 'bg-black text-white border-none hover:-translate-y-0.5 shadow-sm',
  'secondary': 'bg-transparent text-black border-2 border-black hover:bg-[#F5F5F5] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(0,0,0,0.05)]',
  'white': 'bg-white text-black border-none hover:bg-gray-100 hover:-translate-y-0.5 shadow-md',
  'outline-white': 'bg-transparent text-white border-2 border-white hover:bg-white/10 hover:-translate-y-0.5',
  'success': 'bg-[#0e8f00] text-white border-none hover:bg-[#0b7300] hover:-translate-y-0.5 shadow-sm',
  'hero-primary': 'bg-white text-black lg:bg-black lg:text-white border-none hover:-translate-y-0.5 shadow-md',
  'hero-secondary': 'bg-transparent text-white border-2 border-white lg:text-black lg:border-black hover:bg-white/10 lg:hover:bg-[#F5F5F5] hover:-translate-y-0.5'
};
</script>
