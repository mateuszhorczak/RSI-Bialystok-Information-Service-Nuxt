<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
</script>

<template>
  <div class="flex">
    <LayoutsFormContainer class="mx-auto *:space-y-4 mt-8">
      <AtomsSubHeading class="my-4">
        Dodaj nowe wydarzenie
      </AtomsSubHeading>
      <MoleculesFormCreateEvent />
    </LayoutsFormContainer>
  </div>
</template>
