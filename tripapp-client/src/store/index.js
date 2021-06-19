import {createStore} from 'vuex'
import axios from 'axios'

export const store = createStore({
    state: {
        user: undefined
    },
    getters: {
        isAuthenticated: state => {
            return state.user != null;
        }
    },
    mutations: {
        authenticate(state, user) {
            state.user = user
        }
    },
    actions: {
        async authenticate(context) {
            if (context.state.user === undefined) {
                const res = await axios.get('/api/login')
                const user = res.data
                if (user.error === true) {
                    context.commit('authenticate', null)
                } else {
                    context.commit('authenticate', user)
                }
            }
            return context.state.user != null
        }
    }
})
