<script setup lang="ts">
import type { BaseEvent } from '~/types'

defineProps<BaseEvent>()
</script>

<template>
  <div class="shadow-md p-4 space-y-1 rounded-md mx-4 my-4">
    <AtomsSubHeading v-if="name">
      {{ name }}
    </AtomsSubHeading>
    <AtomsParagraph v-if="type">
      typ: {{ type }}
    </AtomsParagraph>
    <AtomsParagraph v-if="date">
      {{ date }}
    </AtomsParagraph>
    <AtomsParagraph v-if="description">
      opis: {{ description }}
    </AtomsParagraph>
  </div>
</template>
