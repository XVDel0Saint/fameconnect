<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/data'
import Navbar from '../components/Navbar.vue'
import { ArrowLeft, ArrowRight } from "lucide-vue-next"


const router = useRouter()
const dataStore = useDataStore()

// computed or destructure to get data
const { heroSlides, exhibitors, testimonials, benefits, categories } = dataStore

// --- UI STATE ---
const currentHeroSlide = ref(0)
const heroAutoplayInterval = ref<number | null>(null)
const heroIsPaused = ref(false)

const currentExhibitorSlide = ref(0)
const exhibitorAutoplayInterval = ref<number | null>(null)

const currentTestimonialSlide = ref(0)
const testimonialAutoplayInterval = ref<number | null>(null)

// --- COMPUTED LOGIC ---
const exhibitorsPerSlide = 3
const totalExhibitorSlides = computed(() => Math.ceil(exhibitors.length / exhibitorsPerSlide))

// Hero carousel controls
const startHeroAutoplay = () => {
  if (heroAutoplayInterval.value) clearInterval(heroAutoplayInterval.value)
  heroAutoplayInterval.value = window.setInterval(() => {
    if (!heroIsPaused.value) {
      currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length
    }
  }, 7000)
}

const nextHeroSlide = () => {
  currentHeroSlide.value = (currentHeroSlide.value + 1) % heroSlides.length
}

const prevHeroSlide = () => {
  currentHeroSlide.value = (currentHeroSlide.value - 1 + heroSlides.length) % heroSlides.length
}

const nextExhibitorSlide = () => {
  currentExhibitorSlide.value = (currentExhibitorSlide.value + 1) % totalExhibitorSlides.value
}

const prevExhibitorSlide = () => {
  currentExhibitorSlide.value = (currentExhibitorSlide.value - 1 + totalExhibitorSlides.value) % totalExhibitorSlides.value
}

const startExhibitorAutoplay = () => {
  if (exhibitorAutoplayInterval.value) clearInterval(exhibitorAutoplayInterval.value)
  exhibitorAutoplayInterval.value = window.setInterval(() => {
    nextExhibitorSlide()
  }, 6000)
}

// Testimonials carousel controls
const nextTestimonialSlide = () => {
  currentTestimonialSlide.value = (currentTestimonialSlide.value + 1) % testimonials.length
}

const prevTestimonialSlide = () => {
  currentTestimonialSlide.value = (currentTestimonialSlide.value - 1 + testimonials.length) % testimonials.length
}

const startTestimonialAutoplay = () => {
  if (testimonialAutoplayInterval.value) clearInterval(testimonialAutoplayInterval.value)
  testimonialAutoplayInterval.value = window.setInterval(() => {
    nextTestimonialSlide()
  }, 6000)
}

const goToRegister = () => {
  router.push('/register/step-1')
}

const scrollToCategories = () => {
  const element = document.getElementById('categories')
  element?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  startHeroAutoplay()
  startExhibitorAutoplay()
  startTestimonialAutoplay()
})

onUnmounted(() => {
  if (heroAutoplayInterval.value) clearInterval(heroAutoplayInterval.value)
  if (exhibitorAutoplayInterval.value) clearInterval(exhibitorAutoplayInterval.value)
  if (testimonialAutoplayInterval.value) clearInterval(testimonialAutoplayInterval.value)
})

</script>

<template>
  <!-- Navigation Bar -->
  <Navbar />

  <!-- Hero Section with Image Carousel -->
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-fame-dark">
    <!-- Carousel slides -->
    <div class="absolute inset-0">
      <div
        v-for="(slide, index) in heroSlides"
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000"
        :style="{ opacity: index === currentHeroSlide ? 1 : 0 }"
      >
        <img
          :src="slide.image"
          :alt="slide.alt"
          class="w-full h-full object-cover"
        />
      </div>
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
    </div>

    <!-- Hero content -->
    <div class="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div class="lg:w-3/5">
        <h1 class="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight animate-fade-in">
          Discover the Soul of Filipino Design
        </h1>
        <p class="text-lg sm:text-xl text-gray-100 mb-10 leading-relaxed max-w-2xl animate-fade-in-delay">
          Step into a world where heritage craftsmanship meets contemporary design. Manila FAME connects global buyers with export-ready Filipino brands across furniture, fashion, and lifestyle.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 animate-fade-in-delay-2">
          <button
            @click="goToRegister"
            class="px-8 py-4 bg-fame-yellow text-fame-dark font-semibold rounded-lg hover:bg-yellow-400 hover:shadow-xl transition-all duration-200 text-base hover:scale-105"
          >
            Register as a Buyer
          </button>
          <button
            @click="scrollToCategories"
            class="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-fame-dark transition-all duration-200 text-base hover:shadow-xl"
          >
            Explore Event Categories
          </button>
        </div>
      </div>
    </div>

    <!-- Carousel controls -->
    <button
      @click="prevHeroSlide"
      @mouseenter="heroIsPaused = true"
      @mouseleave="heroIsPaused = false"
      class="hidden sm:flex absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-all"
      aria-label="Previous slide"
    >
      <ArrowLeft class="w-6 h-6" />
    </button>
    <button
      @click="nextHeroSlide"
      @mouseenter="heroIsPaused = true"
      @mouseleave="heroIsPaused = false"
      class="hidden sm:flex absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white items-center justify-center transition-all"
      aria-label="Next slide"
    >
      <ArrowRight class="w-6 h-6" />
    </button>

    <!-- Carousel indicators -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
      <button
        v-for="(_, index) in heroSlides"
        :key="index"
        @click="currentHeroSlide = index"
        class="w-2 h-2 rounded-full transition-all"
        :class="index === currentHeroSlide ? 'bg-fame-yellow w-8' : 'bg-white/50 hover:bg-white/70'"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </section>

  <!-- Why Visit Manila FAME Section -->
  <section id="why-visit" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <h2 class="text-4xl sm:text-5xl font-serif font-bold text-fame-dark mb-4">
          Why Visit Manila FAME
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Gain strategic advantages and build the sourcing relationships that define your brand's success.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(benefit, index) in benefits"
          :key="index"
          class="group"
          :style="{ '--animation-delay': `${index * 100}ms` } as any"
        >
          <div class="h-full bg-gray-50 p-8 rounded-lg border border-gray-100 hover:border-fame-green hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <!-- replaced from emojis to lucide icons for a cleaner look -->
            <div class="text-4xl mb-4 flex text-fame-green items-center justify-center"><component
              :is="benefit.icon"
              :size="40"
              :stroke-width="1.5"
              class="transition-colors duration-300 group-hover:scale-110"
            /></div>
            <h3 class="text-xl text-center font-semibold text-fame-green mb-3">{{ benefit.title }}</h3>
            <p class="text-gray-600 text-center  leading-relaxed text-sm">{{ benefit.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Event Categories Section -->
  <section id="categories" class="py-20 sm:py-28 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-serif font-bold text-fame-dark mb-4">
          Event Categories
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Explore the diverse range of expertly curated product categories shaping global design.
        </p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(category, index) in categories" :key="index" class="group cursor-pointer">
          <div class="relative overflow-hidden rounded-xl h-72 mb-6 hover:shadow-2xl transition-all duration-300">
            <img :src="category.image" :alt="category.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
            <div class="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center">
              <h3 class="text-3xl font-semibold text-center text-white">{{ category.title }}</h3>
            </div>
          </div>
          <p class="text-gray-700 text-center leading-relaxed">{{ category.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Exhibitors Carousel -->
  <section id="exhibitors" class="py-20 sm:py-28 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-serif font-bold text-fame-dark mb-4">
          Featured Exhibitors
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          A curated preview of the exceptional brands and products you'll discover at Manila FAME.
        </p>
      </div>

      <!-- Carousel -->
      <div class="relative">
        <div class="overflow-hidden">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentExhibitorSlide * 100}%)` }">
            <div v-for="(exhibitor, index) in exhibitors" :key="index" class="w-full md:w-1/3 flex-shrink-0 px-4">
              <div class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                <div class="w-full h-56 bg-gray-300 overflow-hidden">
                  <img :src="exhibitor.image" :alt="exhibitor.name" class="w-full h-full object-cover hover:scale-110 transition-transform duration-300" />
                </div>
                <div class="p-6">
                  <h4 class="font-semibold text-fame-dark mb-2 text-lg">{{ exhibitor.name }}</h4>
                  <p class="text-sm text-fame-green font-medium mb-3">{{ exhibitor.category }}</p>
                  <p class="text-xs text-gray-500">Premium handcrafted collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <button
          @click="prevExhibitorSlide"
          class="absolute -left-4 sm:left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-fame-green hover:bg-green-700 text-white flex items-center justify-center transition-all"
          aria-label="Previous exhibitor"
        >
          <ArrowLeft class="w-4 h-4 sm:w-6 sm:h-6
           transition-transform
           group-hover:translate-x-0.5" />
        </button>
        <button
          @click="nextExhibitorSlide"
          class="absolute -right-4 sm:right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-fame-green hover:bg-green-700 text-white flex items-center justify-center transition-all"
          aria-label="Next exhibitor"
        >
          <ArrowRight class="w-4 h-4 sm:w-6 sm:h-6
           transition-transform
           group-hover:translate-x-0.5" />
        </button>
      </div>

      <!-- Indicators -->
      <div class="flex justify-center gap-2 mt-8">
        <button
          v-for="index in totalExhibitorSlides"
          :key="index - 1"
          @click="currentExhibitorSlide = index - 1"
          class="w-2 h-2 rounded-full transition-all"
          :class="(index - 1) === currentExhibitorSlide ? 'bg-fame-green w-8' : 'bg-gray-300 hover:bg-gray-400'"
        ></button>
      </div>
    </div>
  </section>

  <!-- Testimonials Section -->
  <section id="testimonials" class="py-20 sm:py-28 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-serif font-bold text-fame-dark mb-4">
          Trusted by Global Buyers
        </h2>
        <p class="text-lg text-gray-600 max-w-3xl mx-auto">
          Hear from international sourcing professionals who've transformed their supply chains through Manila FAME.
        </p>
      </div>

      <!-- Carousel -->
      <div class="max-w-4xl mx-auto">
        <div class="relative overflow-hidden">
          <div class="flex transition-transform duration-500" :style="{ transform: `translateX(-${currentTestimonialSlide * 100}%)` }">
            <div v-for="(testimonial, index) in testimonials" :key="index" class="w-full flex-shrink-0">
              <div class="bg-white rounded-xl p-10 shadow-lg">
                <div class="flex items-start gap-4 mb-6">
                  <div class="text-4xl">{{ testimonial.flag }}</div>
                  <div>
                    <p class="font-semibold text-fame-dark text-lg">{{ testimonial.author }}</p>
                    <p class="text-sm text-gray-600">{{ testimonial.company }}</p>
                    <p class="text-xs text-gray-500">{{ testimonial.country }}</p>
                  </div>
                </div>
                <p class="text-gray-700 leading-relaxed italic text-lg mb-6">
                  "{{ testimonial.quote }}"
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex justify-between items-center mt-8">
          <button
            @click="prevTestimonialSlide"
            class="w-12 h-12 rounded-full bg-fame-green hover:bg-green-700 text-white flex items-center justify-center transition-all"
            aria-label="Previous testimonial"
          >
            <ArrowLeft class="w-4 h-4 sm:w-6 sm:h-6
           transition-transform
           group-hover:translate-x-0.5" />
          </button>
          <div class="flex gap-2">
            <button
              v-for="(_, index) in testimonials"
              :key="index"
              @click="currentTestimonialSlide = index"
              class="w-2 h-2 rounded-full transition-all"
              :class="index === currentTestimonialSlide ? 'bg-fame-green w-8' : 'bg-gray-300 hover:bg-gray-400'"
            ></button>
          </div>
          <button
            @click="nextTestimonialSlide"
            class="w-12 h-12 rounded-full bg-fame-green hover:bg-green-700 text-white flex items-center justify-center transition-all"
            aria-label="Next testimonial"
          >
            <ArrowRight class="w-4 h-4 sm:w-6 sm:h-6
           transition-transform
           group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA Section -->
  <section class="py-20 sm:py-28 relative overflow-hidden">
    <!-- Background image -->
    <div class="absolute inset-0">
      <img
        src="../assets/ctacover1.jpeg"
        alt="Manila FAME event venue"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-gradient-to-r from-fame-green/95 via-fame-green/85 to-fame-dark/90"></div>

    <!-- Pulse animation background -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0 bg-gradient-to-br from-fame-yellow to-transparent"></div>
    </div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 class="text-4xl sm:text-5xl font-serif font-bold text-white mb-6">
        Access the Philippines' Premier Design Trade Event
      </h2>
      <p class="text-lg sm:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
        Registration is free for qualified trade buyers. Secure your pass today and experience Filipino design at its finest.
      </p>
      <button
        @click="goToRegister"
        class="px-10 py-5 bg-fame-yellow text-fame-dark font-semibold rounded-lg hover:bg-yellow-400 transition-all duration-200 text-lg hover:shadow-2xl hover:scale-105 pulse-animation"
      >
        Get Your Free Buyer Pass
      </button>
      <p class="text-gray-200 text-sm mt-8">
        Joining 500+ international buyers this season
      </p>
    </div>
  </section>

  <!-- Footer -->
  <footer class="bg-fame-dark text-gray-300 py-16 border-t border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <h4 class="font-serif text-2xl font-bold text-white mb-4">Manila FAME</h4>
          <p class="text-sm text-gray-400 mb-2">March 12-14, 2024</p>
          <p class="text-sm text-gray-400">SMX Convention Center</p>
          <p class="text-sm text-gray-400">Manila, Philippines</p>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-6">Information</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Event Details</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Exhibitor List</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">FAQs</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Event Schedule</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-6">Connect</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Facebook</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Instagram</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">LinkedIn</a></li>
            <li><a href="#" class="text-sm hover:text-fame-yellow transition-colors">Twitter</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold text-white mb-6">Support</h4>
          <p class="text-sm text-gray-400 mb-3">buyers@manilaFAME.ph</p>
          <p class="text-sm text-gray-400 mb-3">+63 (2) 1234-5678</p>
          <p class="text-sm text-gray-400">Available during event hours</p>
        </div>
      </div>
      <div class="border-t border-gray-700 pt-8">
        <p class="text-center text-sm text-gray-500">
          © 2026 Manila FAME. All rights reserved. Presented by FAMEConnect.
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-fade-in-delay {
  animation: fade-in 0.8s ease-out 0.2s forwards;
  opacity: 0;
}

.animate-fade-in-delay-2 {
  animation: fade-in 0.8s ease-out 0.4s forwards;
  opacity: 0;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(251, 191, 36, 0.7);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(251, 191, 36, 0);
  }
}

.pulse-animation {
  animation: pulse 2s infinite;
}
</style>
