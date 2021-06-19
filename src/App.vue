<template>
  <Main/>
</template>

<script>
import Main from './views/Main'

export default {
  components: {
    Main,
  },
  data () {
    return {}
  },
  async mounted() {
    const auth = await this.$store.dispatch('authenticate')
    if (!auth) {
      if (["Login", "Register"].indexOf(this.$route.name) === -1) {
        await this.$router.push('/login')
      }
    }
  }
}
</script>
