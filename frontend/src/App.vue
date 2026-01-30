<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isRegisterPage = route.path.startsWith('/register')
</script>

<template>
  <div class="min-h-screen bg-white">
    <router-view />
  </div>
</template>

<style scoped></style>
