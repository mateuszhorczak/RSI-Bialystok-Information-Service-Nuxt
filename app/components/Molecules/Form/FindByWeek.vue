<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as z from 'zod'

const eventStore = useEventStore()

const schema = z.object({
  week: z.number(),
  year: z.number(),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  week: undefined,
  year: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await eventStore.getEventsByWeek(event.data.week, event.data.year)
}
</script>

<template>
  <UForm
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      label="Tydzień roku"
      name="event-week"
    >
      <UInput
        v-model="state.week"
        type="number"
        placeholder="22"
      />
    </UFormField>

    <UFormField
      label="Rok"
      name="event-year"
    >
      <UInput
        v-model="state.year"
        type="number"
        placeholder="2025"
      />
    </UFormField>

    <AtomsButton
      icon="i-mdi-calendar-search"
      label="Wyszukaj"
      size="lg"
      type="submit"
      variant="solid"

    />
  </UForm>
</template>
