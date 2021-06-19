<template>
  <q-form>
    <h3>Załóż konto</h3>
    <h6 v-if="message">{{message}}</h6>
    <q-input v-model="username" label="Login"></q-input>
    <q-input v-model="email" label="Email"></q-input>
    <q-input v-model="password" label="Hasło"></q-input>
    <q-input v-model="password2" label="Hasło ponownie"></q-input>
    <input class="button" type="submit" value="Zarejestruj" @click="register()">
  </q-form>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      username: '',
      email: '',
      password: '',
      password2: '',
      message: '',
    }
  },
  methods: {
    async register() {
      const res = await axios.post('/api/users/register', {
        username: this.username,
        email: this.email,
        password: this.password,
      }, { validateStatus: false });

      if (res.status === 201) {
        await this.$router.push('/');
      } else {
        this.message = res.data.message;
      }
    }
  }
}
</script>
