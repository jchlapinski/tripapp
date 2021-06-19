<template>
  <q-page class="q-pa-sm">
    <q-table title="Lista atrakcji"
             :rows="places"
             :columns="columns"
             row-key="id">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <div>
            <q-btn color="primary" label="Pokaz" @click="goToPlace(props.row.id)" />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import placeService from "@/services/placeService";

export default {
  name: "Places",
  data() {
    return {
      places: [],
      columns:[
        { name: 'name', label: 'Nazwa', field: 'name', align: 'left'},
        { name: 'costToVisit', label: 'Koszt wizyty', field: 'costToVisit', align: 'left'},
        { name: 'actions', align: 'right'}
      ]
    }
  },
  created() {
    this.getPlaces()
  },
  methods: {
    getPlaces() {
      this.places = placeService.getAllPlaces()
    },
    goToPlace(id) {
      this.$router.push('/places/' + id)
    }
  }
}
</script>

<style scoped>

</style>