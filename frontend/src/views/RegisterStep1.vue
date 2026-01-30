<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useRegistrationStore } from '../stores/registrationStore'

const router = useRouter()
const store = useRegistrationStore()

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

// Validation
const errors = ref<Record<string, string>>({})

const validateForm = () => {
  const newErrors: Record<string, string> = {}

  if (!store.account.first_name.trim()) {
    newErrors.first_name = 'First name is required'
  }

  if (!store.account.last_name.trim()) {
    newErrors.last_name = 'Last name is required'
  }

  if (!store.account.email.trim()) {
    newErrors.email = 'Email is required'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(store.account.email)) {
    newErrors.email = 'Please enter a valid email address'
  }

  if (!store.account.username.trim()) {
    newErrors.username = 'Username is required'
  } else if (store.account.username.length < 3) {
    newErrors.username = 'Username must be at least 3 characters'
  }

  if (!store.account.password) {
    newErrors.password = 'Password is required'
  } else if (store.account.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters'
  }

  if (store.account.password_confirmation !== store.account.password) {
    newErrors.password_confirmation = 'Passwords do not match'
  }

  errors.value = newErrors
  return Object.keys(newErrors).length === 0
}

const handleNext = () => {
  if (validateForm()) {
    store.setCurrentStep(2)
    router.push('/register/step-2')
  }
}

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirmVisibility = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

const handleFirstNameChange = (value: string) => {
  store.setAccountField('first_name', value)
  if (errors.value.first_name) {
    delete errors.value.first_name
  }
}

const handleLastNameChange = (value: string) => {
  store.setAccountField('last_name', value)
  if (errors.value.last_name) {
    delete errors.value.last_name
  }
}

const handleEmailChange = (value: string) => {
  store.setAccountField('email', value)
  if (errors.value.email) {
    delete errors.value.email
  }
}

const handleUsernameChange = (value: string) => {
  store.setAccountField('username', value)
  if (errors.value.username) {
    delete errors.value.username
  }
}

const handlePasswordChange = (value: string) => {
  store.setAccountField('password', value)
  if (errors.value.password) {
    delete errors.value.password
  }
}

const handlePasswordConfirmChange = (value: string) => {
  store.setAccountField('password_confirmation', value)
  if (errors.value.password_confirmation) {
    delete errors.value.password_confirmation
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-semibold text-fame-dark mb-2">Account Information</h2>
    <p class="text-gray-600 mb-8">Create your buyer account to access Manila FAME</p>

    <form @submit.prevent="handleNext" class="space-y-6">
      <!-- Name Fields -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            First Name <span class="text-red-500">*</span>
          </label>
          <input
            :value="store.account.first_name"
            @input="(e) => handleFirstNameChange((e.target as HTMLInputElement).value)"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
            :class="errors.first_name ? 'border-red-500' : 'border-gray-300'"
            placeholder="John"
          />
          <p v-if="errors.first_name" class="text-red-500 text-sm mt-1">{{ errors.first_name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Last Name <span class="text-red-500">*</span>
          </label>
          <input
            :value="store.account.last_name"
            @input="(e) => handleLastNameChange((e.target as HTMLInputElement).value)"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
            :class="errors.last_name ? 'border-red-500' : 'border-gray-300'"
            placeholder="Doe"
          />
          <p v-if="errors.last_name" class="text-red-500 text-sm mt-1">{{ errors.last_name }}</p>
        </div>
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Email Address <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.account.email"
          @input="(e) => handleEmailChange((e.target as HTMLInputElement).value)"
          type="email"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.email ? 'border-red-500' : 'border-gray-300'"
          placeholder="john@example.com"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
      </div>

      <!-- Username -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Username <span class="text-red-500">*</span>
        </label>
        <input
          :value="store.account.username"
          @input="(e) => handleUsernameChange((e.target as HTMLInputElement).value)"
          type="text"
          class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
          :class="errors.username ? 'border-red-500' : 'border-gray-300'"
          placeholder="johndoe"
        />
        <p v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</p>
      </div>

      <!-- Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            :value="store.account.password"
            @input="(e) => handlePasswordChange((e.target as HTMLInputElement).value)"
            :type="showPassword ? 'text' : 'password'"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
            :class="errors.password ? 'border-red-500' : 'border-gray-300'"
            placeholder="••••••••"
          />
          <button
            @click.prevent="togglePasswordVisibility"
            class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            type="button"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <p v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
        <p class="text-gray-500 text-xs mt-1">At least 8 characters</p>
      </div>

      <!-- Confirm Password -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Confirm Password <span class="text-red-500">*</span>
        </label>
        <div class="relative">
          <input
            :value="store.account.password_confirmation"
            @input="(e) => handlePasswordConfirmChange((e.target as HTMLInputElement).value)"
            :type="showPasswordConfirm ? 'text' : 'password'"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-fame-green"
            :class="errors.password_confirmation ? 'border-red-500' : 'border-gray-300'"
            placeholder="••••••••"
          />
          <button
            @click.prevent="togglePasswordConfirmVisibility"
            class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            type="button"
          >
            {{ showPasswordConfirm ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
        <p v-if="errors.password_confirmation" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
      </div>

      <!-- Form Actions -->
      <div class="flex gap-4 pt-8">
        <button
          type="submit"
          class="flex-1 px-6 py-3 bg-fame-green text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
        >
          Next Step
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
