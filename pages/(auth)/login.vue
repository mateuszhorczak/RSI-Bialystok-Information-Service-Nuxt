<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="flex">
    <LayoutsFormContainer class="mx-auto *:space-y-4 mt-8">
      <AtomsSubHeading>Zaloguj się do konta użytkownika</AtomsSubHeading>
      <MoleculesFormLogin />
    </LayoutsFormContainer>
  </div>
</template>
