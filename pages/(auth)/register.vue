<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

</script>

<template>
  <div class="flex">
    <LayoutsFormContainer class="mx-auto *:space-y-4 mt-8">
      <AtomsSubHeading class="mx-auto">Stwórz nowe konto użytkownika</AtomsSubHeading>
      <MoleculesFormRegister />
    </LayoutsFormContainer>
  </div>
</template>
