<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent } from '@nuxt/ui'
import { CalendarDate } from '@internationalized/date'
import { getWeekNumber } from '~/utils'

const eventStore = useEventStore()

const currentDate = new Date()
const date = shallowRef(new CalendarDate(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate()))

const schema = z.object({
  name: z.string().trim().min(2),
  type: z.string().trim().min(2),
  description: z.string().trim().min(2),
})

type Schema = z.output<typeof schema>

const state = reactive<Partial<Schema>>({
  name: undefined,
  type: undefined,
  description: undefined,
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  const newEvent = {
    userId: 1,
    name: event.data.name,
    type: event.data.type,
    date: date.value.toString(),
    description: event.data.description,
    week: getWeekNumber(date.value),
    month: date.value.month,
    year: date.value.year,
  }

  await eventStore.addEvent(newEvent)
  const router = useRouter()
  await router.push('/events')
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
      label="Nazwa eventu"
      name="event-name"
    >
      <UInput
        v-model="state.name"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Typ eventu"
      name="event-type"
    >
      <UInput
        v-model="state.type"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Opis"
      name="event-description"
    >
      <UInput
        v-model="state.description"
        class="w-full"
      />
    </UFormField>

    <UFormField
      label="Data"
      name="event-date"
    >
      <AtomsButtonCalendar v-model:date="date" class="w-full" />
    </UFormField>
    <AtomsButtonContained
      icon="i-mdi-calendar-plus"
      label="Stwórz"
      size="lg"
      type="submit"
    />
  </UForm>
</template>
