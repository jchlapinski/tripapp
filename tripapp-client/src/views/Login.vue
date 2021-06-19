<template>
  <q-form>
    <h3>Witaj w tripapp</h3>
    <h6 v-if="message">{{message}}</h6>
    <q-input v-model="username" label="Login"></q-input>
    <q-input v-model="password" label="Hasło"></q-input>
    <input class="button" type="submit" value="Zaloguj" @click="login()">
    <a href="/auth/facebook">Facebook</a>
    <a href="#/register">Register</a>
  </q-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      password: '',
      message: '',
    }
  },
  methods: {
    login: async function () {
      const res = await axios.post('/api/login', {
        username: this.username,
        password: this.password,
      }, { validateStatus: false })

      if (res.status === 401) {
        this.message = "Nieprawidłowe dane logowania"
      } else if (res.status === 200) {
        this.$store.commit('authenticate', res.data)
        await this.$router.push('/')
      }
    },
  }
}
</script>
