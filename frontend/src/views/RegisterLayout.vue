<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const steps = [
  { number: 1, title: 'Account Information', path: '/register/step-1' },
  { number: 2, title: 'Company Information', path: '/register/step-2' },
  { number: 3, title: 'Review & Confirm', path: '/register/step-3' }
]

const currentStep = computed(() => {
  if (route.path.includes('step-1')) return 1
  if (route.path.includes('step-2')) return 2
  if (route.path.includes('step-3')) return 3
  return 1
})

const progressPercentage = computed(() => {
  return (currentStep.value / 3) * 100
})

const isStepCompleted = (stepNumber: number) => {
  return stepNumber < currentStep.value
}

const isStepActive = (stepNumber: number) => {
  return stepNumber === currentStep.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 class="font-serif text-2xl font-bold text-fame-dark">FAMEConnect</h1>
        <p class="text-sm text-gray-600">Buyer Registration</p>
      </div>
    </header>

    <!-- Progress Bar -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="mb-6">
          <div class="flex justify-between mb-4">
            <div v-for="step in steps" :key="step.number" class="flex-1 mr-2">
              <div class="flex flex-col items-center">
                <div
                  :class="[
                    'w-10 h-10 rounded-full flex items-center justify-center font-semibold mb-2 transition-all',
                    isStepCompleted(step.number) ? 'bg-green-500 text-white' :
                    isStepActive(step.number) ? 'bg-fame-green text-white ring-2 ring-offset-2 ring-fame-green' :
                    'bg-gray-200 text-gray-600'
                  ]"
                >
                  <span v-if="isStepCompleted(step.number)">✓</span>
                  <span v-else>{{ step.number }}</span>
                </div>
                <p class="text-xs sm:text-sm font-medium text-center text-gray-700">
                  {{ step.title }}
                </p>
              </div>
            </div>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-fame-green h-2 rounded-full transition-all duration-300"
              :style="{ width: progressPercentage + '%' }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <router-view />
    </div>
  </div>
</template>

<style scoped></style>
