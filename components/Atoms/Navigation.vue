<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Strona Główna',
    icon: 'i-mdi-home',
    to: '/',
  },
  {
    label: 'Wydarzenia',
    icon: 'i-mdi-calendar',
    to: '/events',
  },
  {
    label: 'Dziś',
    icon: 'i-mdi-calendar-star',
    to: '/events/today',
  },
  {
    label: 'Wyszukaj wydarzenia',
    icon: 'i-mdi-magnify',
    children: [{
      label: 'po nazwie',
      icon: 'i-mdi-text-box-search',
      to: '/events/find',
    },
      {
        label: 'po dacie',
        icon: 'i-mdi-calendar-filter',
        to: '/events/find/by-date',
      },
      {
        label: 'po tygodniu',
        icon: 'i-mdi-calendar-week',
        to: '/events/find/by-week',
      }],
  },
  {
    label: 'Stwórz',
    icon: 'i-mdi-plus-circle',
    to: '/events/new',
  },
  {
    label: 'Eksportuj do pdf',
    icon: 'i-mdi-file-pdf',
    to: '/events/pdf',
  },
])
const authStore = useAuthStore()

watchEffect(() => {
  if (items.value.length === 6 && !authStore.isLoggedIn) {
    items.value.push({
      label: 'Zaloguj się',
      icon: 'i-mdi-door',
      to: '/login',
    })
    items.value.push({
      label: 'Załóż konto',
      icon: 'i-mdi-door-open',
      to: '/register',
    })
  }

  if (items.value.length === 6 && authStore.isLoggedIn) {
    items.value.push({
      label: 'Wyloguj się',
      icon: 'i-mdi-door-closed',
      to: '/logout',
    })
  }

  if (items.value.length === 7 && !authStore.isLoggedIn) {
    items.value.pop()
    items.value.push({
      label: 'Zaloguj się',
      icon: 'i-mdi-door',
      to: '/login',
    })
    items.value.push({
      label: 'Załóż konto',
      icon: 'i-mdi-door-open',
      to: '/register',
    })
  }

  if (items.value.length === 8 && authStore.isLoggedIn) {
    items.value.pop()
    items.value.pop()
    items.value.push({
      label: 'Wyloguj się',
      icon: 'i-mdi-door-closed',
      to: '/logout',
    })
  }
})
</script>

<template>
  <div class="flex">
    <UNavigationMenu
        :items="items"
        highlight
        class="mx-auto mb-8"
    />
  </div>
</template>
