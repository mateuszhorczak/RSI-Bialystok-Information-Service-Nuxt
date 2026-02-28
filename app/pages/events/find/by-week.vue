<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const eventStore = useEventStore()
eventStore.clearEventsList()
</script>

<template>
  <AtomsSubHeading class="my-4">
    Wyszukaj wydarzenia po tygodniu
  </AtomsSubHeading>
  <MoleculesFormFindByWeek />
  <OrganismsEvents />
</template>
