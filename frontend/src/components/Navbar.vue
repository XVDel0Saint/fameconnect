<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

const navItems = [
  { label: 'Why Visit', id: 'why-visit' },
  { label: 'Categories', id: 'categories' },
  { label: 'Exhibitors', id: 'exhibitors' },
  { label: 'Testimonials', id: 'testimonials' }
]

const scrollToSection = (id: string) => {
  isMenuOpen.value = false

  // navigate to registration
  if (id === 'register') {
    router.push('/register/step-1')
    return
  }

  // Smooth scroll to section
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const goToRegister = () => {
  isMenuOpen.value = false
  router.push('/register/step-1')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16 sm:h-20">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center">
          <div class="flex items-center gap-2 group cursor-pointer" @click="router.push('/')">
            <!-- real logo -->
            <img src="/logo.png" class="w-16 h-16" alt="brand Logo" />
            <span class="text-xl font-serif sm:text-2xl font-bold text-fame-dark hidden sm:block group-hover:text-fame-green transition-colors">FAMEConnect</span>
            <span class="text-sm font-serif sm:text-base font-bold text-fame-dark sm:hidden">FAMEConnect</span>
          </div>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="px-3 lg:px-4 py-2 text-sm lg:text-base font-medium text-gray-700 hover:text-fame-green transition-colors rounded-md hover:bg-gray-50"
          >
            {{ item.label }}
          </button>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden md:block">
          <button
            @click="goToRegister"
            class="px-6 py-2 lg:py-3 bg-fame-yellow text-fame-dark font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 hover:shadow-lg hover:scale-105 text-sm lg:text-base"
          >
            Register as a Buyer
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <div
        v-if="isMenuOpen"
        class="md:hidden border-t border-gray-200 bg-white"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-fame-green hover:bg-gray-50 transition-colors"
          >
            {{ item.label }}
          </button>
          <button
            @click="goToRegister"
            class="w-full px-3 py-2 rounded-md text-base font-semibold text-white bg-fame-yellow hover:bg-yellow-400 transition-colors mt-2"
          >
            Register as a Buyer
          </button>
        </div>
      </div>
    </div>
  </nav>

  <!-- Spacer to offset fixed navbar -->
  <div class="h-16 sm:h-20"></div>
</template>

<style scoped>
</style>
