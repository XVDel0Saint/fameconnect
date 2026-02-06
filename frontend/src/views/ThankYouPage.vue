<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../stores/registrationStore'

const router = useRouter()
const store = useRegistrationStore()

const goHome = () => {
  store.resetForm()
  router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
    <div class="max-w-md w-full text-center">
      <!-- Success Icon -->
      <div class="mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <svg class="w-8 h-8 text-fame-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
      </div>

      <h1 class="text-3xl font-serif font-bold text-fame-dark mb-4">
        Registration Complete!
      </h1>

      <p class="text-gray-600 text-lg mb-6">
        Thank you for registering for Manila FAME.
      </p>

      <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <p class="text-sm text-blue-900 leading-relaxed">
          You'll receive a confirmation email shortly with your buyer pass details and event information. Check your inbox and spam folder to make sure you receive it.
        </p>
      </div>

      <div class="bg-gray-50 rounded-lg p-6 mb-8 text-left">
        <h3 class="font-semibold text-fame-dark mb-4">What's Next?</h3>
        <ul class="space-y-3 text-sm text-gray-600">
          <li class="flex items-start">
            <span class="text-fame-green mr-3 font-bold">✓</span>
            <span>Download your buyer pass from your email</span>
          </li>
          <li class="flex items-start">
            <span class="text-fame-green mr-3 font-bold">✓</span>
            <span>Explore exhibitor categories and schedule</span>
          </li>
          <li class="flex items-start">
            <span class="text-fame-green mr-3 font-bold">✓</span>
            <span>Attend Manila FAME event and connect with designers</span>
          </li>
        </ul>
      </div>

      <div class="space-y-3">
        <button
          @click="goHome"
          class="w-full px-6 py-3 bg-fame-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Return to Home
        </button>
        <a
          href="https://fameplus.com/"
          target="_blank"
          class="block w-full px-6 py-3 border-2 border-fame-green text-fame-green font-semibold rounded-lg hover:bg-green-50 transition-colors"
        >
          Visit Manila FAME Website
        </a>
      </div>

      <p class="text-xs text-gray-500 mt-8">
        Questions? Contact us at <a href="mailto:buyers@manilaFAME.ph" class="text-fame-green hover:underline">buyers@manilaFAME.ph</a>
      </p>
    </div>
  </div>
</template>

<style scoped></style>
