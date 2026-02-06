<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount  } from 'vue'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../stores/registrationStore'

const router = useRouter()
const store = useRegistrationStore()

const isSubmitting = ref(false)
const errorMessage = ref('')

const handleBack = () => {
  store.setCurrentStep(2)
  router.push('/register/step-2')
}

const handleSubmit = async () => {
  isSubmitting.value = true
  errorMessage.value = ''

  try {
    // Create FormData for multipart submission
    const formData = new FormData()

    // Add account data
    formData.append('first_name', store.account.first_name)
    formData.append('last_name', store.account.last_name)
    formData.append('email', store.account.email)
    formData.append('username', store.account.username)
    formData.append('password', store.account.password)
    formData.append('password_confirmation', store.account.password_confirmation)
    formData.append('participation_type', store.account.participation_type)

    // Add company data
    formData.append('company_name', store.company.company_name)
    formData.append('address_line', store.company.address)
    formData.append('city', store.company.city)
    formData.append('region', store.company.region)
    formData.append('country', store.company.country)
    formData.append('year_established', String(store.company.year_established))
    formData.append('website', store.company.website)

    // does not send junk values
    if (store.company.website) {
      formData.append('website', store.company.website)
    }

    // if file present, send it
    if (store.company.brochure_file) {
      formData.append('brochure', store.company.brochure_file)
    }

    // fetch api endpoint 'register'
    const response = await fetch(
      import.meta.env.VITE_API_URL + '/api/register',
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formData
      }
    )

    if (!response.ok) {
      const err = await response.json()
      throw err
    }

    store.setSuccess(true)
    router.push('/thank-you')
  } catch (error) {
    errorMessage.value = 'An error occurred during registration. Please try again.'
    console.error('Registration error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const editStep = (step: number) => {
  store.setCurrentStep(step)
  router.push(`/register/step-${step}`)
}

const handleStartOver = () => {
  const confirmed = window.confirm(
    'Are you sure you want to clear all information and start the registration again?'
  )
  // restarts all over
  if (!confirmed) return
  store.resetForm()
  router.push('/register/step-1')
}


onMounted(() => {
  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    if (!store.ui.success) {  // Only warn if registration not submitted
      event.preventDefault()
      event.returnValue = '' // Required for Chrome to show warning
    }
  }

  window.addEventListener('beforeunload', handleBeforeUnload)

  onBeforeUnmount(() => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  })
})

</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold text-fame-dark mb-2">Review Your Information</h2>
    <p class="text-gray-600 mb-8">Please review your details before submitting</p>

    <div class="space-y-6">
      <!-- Account Information Review -->
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-fame-dark">Account Information</h3>
          <button
            @click="editStep(1)"
            class="text-fame-green hover:text-green-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        <div class="space-y-3 text-sm">
          <div class="grid grid-cols-2">
            <span class="text-gray-600">First Name:</span>
            <span class="font-medium">{{ store.account.first_name }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Last Name:</span>
            <span class="font-medium">{{ store.account.last_name }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Email:</span>
            <span class="font-medium">{{ store.account.email }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Username:</span>
            <span class="font-medium">{{ store.account.username }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Account Type:</span>
            <span class="font-medium capitalize">{{ store.account.participation_type }}</span>
          </div>
        </div>
      </div>

      <!-- Company Information Review -->
      <div class="bg-gray-50 rounded-lg p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-fame-dark">Company Information</h3>
          <button
            @click="editStep(2)"
            class="text-fame-green hover:text-green-700 text-sm font-medium"
          >
            Edit
          </button>
        </div>
        <div class="space-y-3 text-sm">
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Company Name:</span>
            <span class="font-medium">{{ store.company.company_name }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Address:</span>
            <span class="font-medium">{{ store.company.address }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">City:</span>
            <span class="font-medium">{{ store.company.city }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Region:</span>
            <span class="font-medium">{{ store.company.region }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Country:</span>
            <span class="font-medium">{{ store.company.country }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Year Established:</span>
            <span class="font-medium">{{ store.company.year_established }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Website:</span>
            <span class="font-medium">{{ store.company.website || 'Not provided' }}</span>
          </div>
          <div class="grid grid-cols-2">
            <span class="text-gray-600">Brochure:</span>
            <span class="font-medium">
              {{ store.company.brochure_file ? '📄 ' + store.company.brochure_file.name : 'Not provided' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Terms -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="text-sm text-blue-900">
          By submitting this registration, you agree to Manila FAME's terms and conditions and consent to receive communications about the event.
        </p>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-900 text-sm">{{ errorMessage }}</p>
      </div>

      <!-- Form Actions -->
      <div class="flex gap-4 pt-8">
        <button
          type="button"
          @click="handleBack"
          class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          :disabled="isSubmitting"
        >
          Back
        </button>
        <button
          type="button"
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="flex-1 px-6 py-3 bg-fame-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <span v-if="isSubmitting" class="inline-block animate-spin">⏳</span>
          {{ isSubmitting ? 'Submitting...' : 'Submit Registration' }}
        </button>
      </div>
      <!-- Start Over -->
      <div class="pt-1 text-center">
        <button
          type="button"
          @click="handleStartOver"
          class="text-lg text-red-600 hover:text-red-700 border-red-300 font-semibold underline rounded-lg"
          :disabled="isSubmitting"
        >
          Start Over
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
