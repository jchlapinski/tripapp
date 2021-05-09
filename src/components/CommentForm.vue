<template>
  <q-form class="comment-form" @submit.prevent="onSubmit">
    <h3>Zostaw recenzję</h3>
    <q-input v-model="nick" label="Nick"></q-input>
    <div>
      <label>Tytuł: </label>
      <input v-model="title">
    </div>
    <div>
      <label>Recenzja: </label>
      <input v-model="content">
    </div>
    <div>
      <label>Ocena: </label>
      <select v-model.number="rate">
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>
    <input class="button" type="submit" value="Dodaj komentarz">
  </q-form>
</template>

<script>
export default {
  name: "CommentForm",
  emits: ['add-comment'],
  data() {
    return {
      nick: null,
      title: null,
      content: null,
      rate: null
    }
  },
  methods: {
    onSubmit() {
      if(!this.nick || !this.title || !this.content || !this.rate) {
        alert("Wszystkie pola powinny być uzupełnione")
      } else {
        // dodawanie komentarzy
        this.$emit('add-comment', {
          nick: this.nick,
          title: this.title,
          content: this.content,
          rate: this.rate
        })
        this.clearForm()
      }
    },
    clearForm() {
      this.nick = null
      this.title  = null
      this.content  = null
      this.rate = null
    }
  }
}
</script>

<style scoped>
.comment-form {
  text-align: left;
}
.comment-form div {
  margin: 10px;
}
</style>