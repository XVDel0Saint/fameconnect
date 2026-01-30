<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../stores/registrationStore'

const router = useRouter()
const store = useRegistrationStore()

const errors = ref<Record<string, string>>({})
const fileInputRef = ref<HTMLInputElement | null>(null)

const countries = ref<string[]>([])

onMounted(async () => {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + '/api/countries')
    if (!res.ok) throw new Error('Failed to fetch countries')
    const data = await res.json()

    // Map to just country names
    countries.value = data.map((c: any) => c.name)
  } catch (error) {
    console.error('Error fetching countries:', error)
    countries.value = ['Philippines', 'United States', 'Other'] // fallback
  }
})


const regions = [
  'NCR - National Capital Region',
  'Calabarzon',
  'Central Luzon',
  'Ilocos',
  'Cagayan Valley',
  'Central Visayas',
  'Eastern Visayas',
  'Western Visayas',
  'Northern Mindanao',
  'Davao Region',
  'Soccsksargen',
  'Bangsamoro',
  'Cordillera',
  'Other'
]

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!store.company.company_name.trim()) {
    newErrors.company_name = 'Company name is required'
  }

  if (!store.company.address.trim()) {
    newErrors.address = 'Address is required'
  }

  if (!store.company.city.trim()) {
    newErrors.city = 'City is required'
  }

  if (!store.company.region.trim()) {
    newErrors.region = 'Region is required'
  }

  if (!store.company.country.trim()) {
    newErrors.country = 'Country is required'
  }

  if (!store.company.year_established) {
    newErrors.year_established = 'Year established is required'
  }

  if (store.company.website && !/^https?:\/\/.+/.test(store.company.website)) {
    newErrors.website = 'Please enter a valid URL (e.g., https://example.com)'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleNext = () => {
  if (validateForm()) {
    store.setCurrentStep(3)
    router.push('/register/step-3')
  }
}

const handleBack = () => {
  store.setCurrentStep(1)
  router.push('/register/step-1')
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    const file = target.files[0]
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']

    if (allowedTypes.includes(file.type)) {
      store.setCompanyField('brochure_file', file)
    } else {
      errors.value.brochure_file = 'Please upload a PDF or Word document'
    }
  }
}

const clearFile = () => {
  store.setCompanyField('brochure_file', null)
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
}

const handleCompanyNameChange = (value: string) => {
  store.setCompanyField('company_name', value)
  if (errors.value.company_name) {
    delete errors.value.company_name
  }
}

const handleAddressChange = (value: string) => {
  store.setCompanyField('address', value)
  if (errors.value.address) {
    delete errors.value.address
  }
}

const handleCityChange = (value: string) => {
  store.setCompanyField('city', value)
  if (errors.value.city) {
    delete errors.value.city
  }
}

const handleRegionChange = (value: string) => {
  store.setCompanyField('region', value)
  if (errors.value.region) {
    delete errors.value.region
  }
}

const handleCountryChange = (value: string) => {
  store.setCompanyField('country', value)
  if (errors.value.country) {
    delete errors.value.country
  }
}

const handleYearChange = (value: string) => {
  store.setCompanyField('year_established', value)
  if (errors.value.year_established) {
    delete errors.value.year_established
  }
}

const handleWebsiteChange = (value: string) => {
  store.setCompanyField('website', value)
  if (errors.value.website) {
    delete errors.value.website
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold text-fame-dark mb-2">Company Information</h2>
    <p class="text-gray-600 mb-8">Tell us about your importing business</p>

    <form @submit.prevent="handleNext" class="space-y-6">
      <!-- Company Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Company Name <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.company.company_name"
          @input="(e) => handleCompanyNameChange((e.target as HTMLInputElement).value)"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.company_name ? 'border-red-500' : 'border-gray-300'"
          placeholder="Your Company Name"
        />
        <p v-if="errors.company_name" class="text-red-500 text-sm mt-1">{{ errors.company_name }}</p>
      </div>

      <!-- Address -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Street Address <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.company.address"
          @input="(e) => handleAddressChange((e.target as HTMLInputElement).value)"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.address ? 'border-red-500' : 'border-gray-300'"
          placeholder="123 Business Street"
        />
        <p v-if="errors.address" class="text-red-500 text-sm mt-1">{{ errors.address }}</p>
      </div>

      <!-- City -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          City <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.company.city"
          @input="(e) => handleCityChange((e.target as HTMLInputElement).value)"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.city ? 'border-red-500' : 'border-gray-300'"
          placeholder="New York"
        />
        <p v-if="errors.city" class="text-red-500 text-sm mt-1">{{ errors.city }}</p>
      </div>

      <!-- Region (for PH) / State -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Region <span class="text-red-500">*</span>
        </label>
        <select
          :value="store.company.region"
          @change="(e) => handleRegionChange((e.target as HTMLSelectElement).value)"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.region ? 'border-red-500' : 'border-gray-300'"
        >
          <option value="">Select a region...</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
        <p v-if="errors.region" class="text-red-500 text-sm mt-1">{{ errors.region }}</p>
      </div>

      <!-- Country -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Country <span class="text-red-500">*</span>
        </label>
        <select
          v-model="store.company.country"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.country ? 'border-red-500' : 'border-gray-300'"
        >
          <option value="" disabled>
            {{ countries.length ? 'Select a country...' : 'Loading countries...' }}
          </option>
          <option v-for="country in countries" :key="country" :value="country">
            {{ country }}
          </option>
        </select>
        <p v-if="errors.country" class="text-red-500 text-sm mt-1">{{ errors.country }}</p>
      </div>

      <!-- Year Established -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Year Established <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.company.year_established"
          @input="(e) => handleYearChange((e.target as HTMLInputElement).value)"
          type="number"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.year_established ? 'border-red-500' : 'border-gray-300'"
          placeholder="2020"
          min="1900"
          :max="new Date().getFullYear()"
        />
        <p v-if="errors.year_established" class="text-red-500 text-sm mt-1">{{ errors.year_established }}</p>
      </div>

      <!-- Website -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Website (Optional)
        </label>
        <input
          :value="store.company.website"
          @input="(e) => handleWebsiteChange((e.target as HTMLInputElement).value)"
          type="url"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.website ? 'border-red-500' : 'border-gray-300'"
          placeholder="https://yourcompany.com"
        />
        <p v-if="errors.website" class="text-red-500 text-sm mt-1">{{ errors.website }}</p>
      </div>

      <!-- Brochure Upload -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Company Brochure (Optional)
        </label>
        <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fame-green transition-colors cursor-pointer"
          @click="fileInputRef?.click()">
          <input
            ref="fileInputRef"
            type="file"
            accept=".pdf,.doc,.docx"
            @change="handleFileSelect"
            class="hidden"
          />
          <p class="text-gray-600">
            <span v-if="!store.company.brochure_file">
              Drop your file here or click to browse
            </span>
            <span v-else class="text-fame-green font-semibold">
              📄 {{ store.company.brochure_file.name }}
            </span>
          </p>
          <p class="text-xs text-gray-500 mt-1">Accepted formats: PDF, DOC, DOCX</p>
        </div>
        <button
          v-if="store.company.brochure_file"
          type="button"
          @click="clearFile"
          class="mt-2 text-red-500 hover:text-red-700 text-sm font-medium"
        >
          Remove file
        </button>
        <p v-if="errors.brochure_file" class="text-red-500 text-sm mt-1">{{ errors.brochure_file }}</p>
      </div>

      <!-- Form Actions -->
      <div class="flex gap-4 pt-8">
        <button
          type="button"
          @click="handleBack"
          class="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
        >
          Back
        </button>
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-fame-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Review & Confirm
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
