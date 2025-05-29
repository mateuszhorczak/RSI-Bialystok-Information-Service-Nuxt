<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const isSubmitting = ref(false)

const schema = z.object({
  username: z.string({ message: "Wymagane" }).trim().min(3, 'Nazwa użytkownika musi składać się z co najmniej 3 znaków'),
  password: z.string({ message: "Wymagane" }).trim().min(8, 'Hasło musi składać się z co najmniej 8 znaków'),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  try {
    const { success, error } = await authStore.login({
      username: event.data.username,
      password: event.data.password
    })

    if (success) {
      toast.add({
        title: 'Logowanie zakończone sukcesem',
        color: 'success',
        icon: 'i-mdi-check-circle'
      })
      await router.push('/')
    } else if (error) {
      toast.add({
        title: 'Logowanie zakończone niepowodzeniem',
        description: error,
        color: 'error',
        icon: 'i-mdi-exclamation-thick'
      })
    }
  }
  catch (error) {
    toast.add({
      title: 'Błąd logowania',
      description: 'Wystąpił nieoczekiwany błąd',
      color: 'error',
      icon: 'i-mdi-exclamation-thick'
    })
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <UForm
      :schema="schema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
  >
    <UFormField label="Nazwa użytkownika" name="username">
      <UInput v-model="state.username" class="w-full" />
    </UFormField>

    <UFormField label="Hasło" name="password">
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>

    <AtomsButtonContained
        icon="i-mdi-account-arrow-right"
        label="Zaloguj się"
        size="lg"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
    />
  </UForm>
</template>
