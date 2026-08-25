export default defineNuxtPlugin((nuxtApp) => {
  let observer = null;
  
  if (import.meta.client) {
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
  }

  nuxtApp.vueApp.directive('reveal', {
    getSSRProps(binding, vnode) {
      return {
        class: 'scroll-reveal'
      }
    },
    beforeMount(el) {
      el.classList.add('scroll-reveal')
    },
    mounted(el) {
      if (observer) {
        observer.observe(el)
      }
    },
    unmounted(el) {
      if (observer) {
        observer.unobserve(el)
      }
    }
  })
})
