<template>
  <router-view/>

  <div>
    <a>Czesto odwiedzane miejsca</a>
    <Place placeId="001"/>
  </div>
</template>

<script>
// Używanie komponentów w innych komponentach wymaga ich prawidłowego zaimportowania do komponentu
// tak jak poniżej (property `components`)
import Place from '@/views/Place'
export default {
  components: {
    Place,
  },
  name: "PlaceContainer"
}
</script>

<style scoped>

</style>