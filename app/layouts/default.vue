<template>
  <div class="min-h-screen flex flex-col bg-white">
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
    <WhatsAppFloat />
  </div>
</template>
