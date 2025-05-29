<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const eventStore = useEventStore()
eventStore.clearEventsList()
</script>

<template>
  <AtomsSubHeading>
    Wyszukaj wydarzenia po nazwie
  </AtomsSubHeading>
  <MoleculesFormFindByName />
  <OrganismsEvents />
</template>
