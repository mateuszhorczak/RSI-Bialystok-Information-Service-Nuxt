<script setup lang="ts">
</script>

<template>
<!--   <div class="absolute bottom-0 w-screen h-16 md:h-24 bg-gray-500 flex items-center justify-around">
    <div class="flex items-center xl:space-x-16 space-x-1 xl:ml-16">
      <MoleculesFooterCopyrights />
      <MoleculesContactIcons />
    </div>
  </div> -->
  
 <UFooter>
    <template #left>
      <MoleculesFooterCopyrights />
    </template>

    <template #right>
      <MoleculesContactIcons />
    </template>
  </UFooter>
</template>
