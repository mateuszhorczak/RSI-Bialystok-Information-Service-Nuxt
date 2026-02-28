<script setup lang="ts">
import type { BaseEvent } from '#shared/types/event' // import prevent Unresolvable type reference or unsupported built-in utility type bug

const props = defineProps<BaseEvent>()
</script>

<template>
  <div class="shadow-md p-4 space-y-1 rounded-md mx-4 my-4">
    <AtomsSubHeading>
      {{ props.name }}
    </AtomsSubHeading>
    <AtomsParagraph>
      typ: {{ props.type }}
    </AtomsParagraph>
    <AtomsParagraph>
      {{ props.date }}
    </AtomsParagraph>
    <AtomsParagraph>
      opis: {{ props.description }}
    </AtomsParagraph>
  </div>
</template>
