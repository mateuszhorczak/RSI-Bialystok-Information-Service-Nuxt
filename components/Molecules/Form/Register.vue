<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'

const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()
const isSubmitting = ref(false)

const schema = z.object({
  username: z.string({ message: "Wymagane" }).trim().min(3, 'Nazwa użytkownika musi składać się z co najmniej 3 liter'),
  email: z.string({ message: "Wymagane" }).trim().email('Nieprawidłowy format email').nonempty(),
  password: z.string({ message: "Wymagane" }).trim().min(8, 'Hasło musi składać się z co najmniej 8 znaków'),
  password2: z.string({ message: "Wymagane" }).trim().nonempty()
}).refine(data => data.password === data.password2, {
  message: "Hasła nie są identyczne",
  path: ["password2"]
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  username: undefined,
  password: undefined,
  password2: undefined,
  email: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  isSubmitting.value = true
  try {
    const { success, error } = await authStore.register({
      username: event.data.username,
      password: event.data.password,
      email: event.data.email
    })

    if (success) {
      toast.add({
        title: 'Rejestracja zakończona sukcesem',
        description: 'Możesz się teraz zalogować do swojego konta',
        color: 'success',
        icon: 'i-mdi-check-circle-outline'
      })
      await router.push('/login')
    } else if (error) {
      toast.add({
        title: 'Rejestracja zakończona niepowodzeniem',
        description: error,
        color: 'error',
        icon: 'i-mdi-exclamation-thick'
      })
    }
  } catch (error) {
    toast.add({
      title: 'Błąd rejestracji',
      description: 'Wystąpił nieoczekiwany błąd',
      color: 'error',
      icon: 'i-mdi-exclamation-thick'
    })
  } finally {
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
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" class="w-full" />
    </UFormField>

    <UFormField label="Nazwa użytkownika" name="username">
      <UInput v-model="state.username" class="w-full" />
    </UFormField>

    <UFormField label="Hasło" name="password">
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>

    <UFormField label="Powtórz hasło" name="password2">
      <UInput v-model="state.password2" type="password" class="w-full" />
    </UFormField>

    <AtomsButtonContained
        icon="i-mdi-account-arrow-up"
        label="Stwórz konto"
        size="lg"
        type="submit"
        :loading="isSubmitting"
        :disabled="isSubmitting"
    />
  </UForm>
</template>
