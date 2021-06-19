<template>
  <q-page class="q-pa-sm">
    <q-card class="my-card" v-if="place" flat bordered>
      <img :alt="place.name" :src="place.url">
      <q-card-section>
        <div class="text-h6">{{ place.name }}</div>
        <div class="text-subtitle2">
          <p v-if="place.costToVisit"><strong>Koszt wizyty: </strong>{{place.costToVisit}} zł</p>
          <p v-else>Darmowy wstęp!</p></div>
      </q-card-section>
      <q-card-section>
        <p><strong>Opis: </strong>{{place.descr}}</p>
        <p><strong>Pozycja: </strong>{{geoPosition}}</p>
      </q-card-section>
      <q-card-actions>
        <q-btn @click="showWeather" flat>Pogoda</q-btn>
        <q-btn @click="goToComments" flat>Komentarze</q-btn>
      </q-card-actions>
    </q-card>
    <div v-else>Brak miejsca w bazie</div>
  </q-page>
</template>

<script>
import placeService from "@/services/placeService";
export default {
  name: "Place",
  props: {
    placeId: {type: String}
  },
  emits: ['add-comment'],
  data() {
    return {
      place: null
    }
  },
  computed: {
    geoPosition() {
      return this.place.lat + ', ' + this.place.lon
    }
  },
  created() {
    console.log(this.placeId)
    this.getPlace(this.placeId)
  },
  methods: {
    goToComments() {
      this.$router.push('/places/' + this.placeId + '/comments')
    },
    getPlace(id) {
      if (id) {
        this.place = placeService.getPlaceById(id)
      }
    },
    showWeather() {
      alert("Słonecznie")
    }
  }
}
</script>

<style scoped>
.my-card{
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>