<template lang="pug">
    v-app
        v-container.primary(fluid fill-height)
            v-row.justify-center.align-center()
                v-col(cols=12 md=5)
                    v-card(md=12 xs=12)
                        v-card-text
                            span.headline Login
                            v-container
                                v-row.justify-center.align-center()
                                    v-col
                                        v-form(v-model="valid")
                                            v-text-field(label="Email" placeholder="Digite o Email" v-model="email" outline :rules="[rules.userRequired]")
                                            v-text-field(label="Senha" placeholder="Digite a Senha" v-model="password" outline :rules="[rules.passwordRequired]" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword")
                                        v-btn.primary(text block @click="login") Login
                                        v-btn.primary.mt-5(text block @click="goToSignUp") Cadastro 
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            email: '',
            password: '',
            valid: true,
            showPassword: false,
            rules: {
                userRequired: value => !!value || 'Preencha o email.',
                passwordRequired: value => !!value || 'Preencha a senha.',
            },
        }
    },
    methods: {
        async login() {
            /* eslint-disable */
            if (this.valid) {
                const instance = axios.create({
                    baseURL: 'http://localhost:8888'
                });
                try {
                    const authRes = await instance.post('/auth/authenticate', {
                    email: this.email,
                    password: this.password
                    })
                    console.log(authRes)
                    localStorage.token = authRes.data.token
                    localStorage.id = authRes.data.user._id
                    this.$router.push({path: '/'})
                } catch (err) {
                    console.log(err)
                }
            }
        },
        goToSignUp() {
            this.$router.push('/signup')
        }
    }
}
</script>
<style scoped>
</style>