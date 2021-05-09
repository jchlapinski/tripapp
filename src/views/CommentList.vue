<template>
  <h3>Lista recenzji</h3>
  <div v-for="comment in comments" v-bind:key="comment.id">
    <Comment :comment="comment"/>
  </div>
  <CommentForm @addComment="addComment"/>
  <button @click="goBack">Powrot</button>
</template>

<script>
import Comment from "@/components/Comment";
import placeService from "@/services/placeService";
import CommentForm from "@/components/CommentForm";
export default {
  name: "CommentList",
  components: {Comment, CommentForm},
  props: {
    placeId: {type: String}
  },
  data() {
    return {
      comments: []
    }
  },
  created() {
    this.getPlace(this.$route.params.placeId)
  },
  methods: {
    getPlace(id) {
      if (id) {
        const place = placeService.getPlaceById(id)
        if (place) {
          this.comments = place.comments
        }
      }
    },
    addComment(comment) {
      this.comments.push(comment)
    },
    goBack() {
      this.$router.push('/places/' + this.$route.params.placeId)
    }
  }
}
</script>

<style scoped>

</style>