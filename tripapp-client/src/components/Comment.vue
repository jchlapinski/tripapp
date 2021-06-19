<template>
  <div class="comment" :class="{'good': comment.rate > 3}" :style="{background: backgroundColor()}">
    <p><strong>Tytuł: </strong>{{comment.title}}</p>
    <p><strong>Zawartość: </strong>{{comment.content}}</p>
    <p><strong>Nick: </strong>{{comment.nick}}</p>
    <p><strong>Ocena: </strong>{{comment.rate}}</p>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    comment: {type: Object, required: true}
  },
  methods: {
    backgroundColor() {
      switch(this.comment.rate) {
        case 5:
        case 4:
          return 'green'
        case 3:
          return 'yellow'
        case 2:
        case 1:
          return 'red'
      }
    }
  }
}
</script>

<style scoped>
.comment {
  border: 1px solid black;
}
.good {
  background: green;
}
.neutral {
  background: yellow;
}
.bad{
  background: red;
}
</style>