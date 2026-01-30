import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

export interface RegistrationState {
  account: {
    first_name: string
    last_name: string
    email: string
    username: string
    password: string
    password_confirmation: string
    participation_type: string
  }
  company: {
    company_name: string
    address: string
    city: string
    region: string
    country: string
    year_established: string
    website: string
    brochure_file: File | null
  }
  ui: {
    currentStep: number
    loading: boolean
    errors: Record<string, string[]>
    success: boolean
  }
}

export const useRegistrationStore = defineStore('registration', () => {
  const account = reactive({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    participation_type: 'buyer'
  })

  const company = reactive({
    company_name: '',
    address: '',
    city: '',
    region: '',
    country: '',
    year_established: '',
    website: '',
    brochure_file: null as File | null
  })

  const ui = reactive({
    currentStep: 1,
    loading: false,
    errors: {} as Record<string, string[]>,
    success: false
  })

  function setCurrentStep(step: number) {
    ui.currentStep = step
  }

  function setAccountField(field: keyof typeof account, value: string) {
    account[field] = value
  }

  function setCompanyField<K extends keyof typeof company>(
    field: K,
    value: typeof company[K]
  ) {
    company[field] = value
  }

  function setErrors(errors: Record<string, string[]>) {
    ui.errors = errors
  }

  function clearErrors() {
    ui.errors = {}
  }

  function setLoading(loading: boolean) {
    ui.loading = loading
  }

  function setSuccess(success: boolean) {
    ui.success = success
  }

  function resetForm() {
    Object.assign(account, {
      first_name: '',
      last_name: '',
      email: '',
      username: '',
      password: '',
      password_confirmation: '',
      participation_type: 'buyer'
    })
    Object.assign(company, {
      company_name: '',
      address: '',
      city: '',
      region: '',
      country: '',
      year_established: '',
      website: '',
      brochure_file: null
    })
    Object.assign(ui, {
      currentStep: 1,
      loading: false,
      errors: {},
      success: false
    })
  }

  return {
    account,
    company,
    ui,
    setCurrentStep,
    setAccountField,
    setCompanyField,
    setErrors,
    clearErrors,
    setLoading,
    setSuccess,
    resetForm
  }
}, {
  persist: {
    key: 'fame-registration', // optional, default is store id
    storage: localStorage,    // save in localStorage
  }
})
