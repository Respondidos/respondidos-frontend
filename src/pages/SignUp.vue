<template lang="pug">
    v-app
        v-container.primary(fluid fill-height)
            v-row.justify-center.align-center()
                v-col(cols=12 md=6)
                    v-card(md=12 xs=12)
                        v-card-text
                            span.headline Cadastro
                            v-container
                                v-row.justify-center.align-center()
                                    v-col
                                        v-form(v-model="valid")
                                            v-text-field(label="Nome" placeholder="Digite o Nome" v-model="name" outline :rules="[rules.userRequired]")
                                            v-text-field(label="Sobrenome" placeholder="Digite o Sobrenome" v-model="surname" outline :rules="[rules.userRequired]")
                                            v-text-field(label="Email" placeholder="Digite o Email" v-model="email" outline :rules="[rules.userRequired]")
                                            v-text-field(label="Senha" placeholder="Digite a Senha" v-model="password" outline :rules="[rules.passwordRequired, rules.passwordSize]" :append-icon="showPassword ? 'visibility' : 'visibility_off'" :type="showPassword ? 'text' : 'password'" @click:append="showPassword = !showPassword")
                                            v-text-field(label="Confirmação de Senha" placeholder="Digite a Senha Novamente" outline :rules="[rules.passwordRequired,rules.passwordEqual]" :append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'" :type="showConfirmPassword ? 'text' : 'password'" @click:append="showConfirmPassword = !showConfirmPassword")
                                        v-btn.primary.mt-5(text block @click="signUp") Cadastrar
                                        v-btn.primary.mt-5(text block @click="goToLogin") Já tem conta? faça login!
</template>
<script>
import axios from 'axios'
export default {
    data () {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            valid: true,
            showPassword: false,
            showConfirmPassword: false,
            rules: {
                nameRequired: value => !!value || 'Preencha o nome',
                userRequired: value => !!value || 'Preencha o email.',
                passwordRequired: value => !!value || 'Preencha a senha.',
                passwordEqual: value => value === this.password || 'A senha deve ser igual',
                passwordSize: value => value.length > 8 || 'A senha deve conter mais de 7 digitos'
            },
        }
    },
    methods: {
        async signUp() {
            /* eslint-disable */
            if (this.valid) {
                
                const instance = axios.create({
                    baseURL: 'http://localhost:8888'
                });
                const res = await instance.post('/auth/register', {
                    firstName: this.name,
                    lastName: this.surname,
                    email: this.email,
                    password: this.password
                })
                const authRes = await instance.post('/auth/authenticate', {
                    email: this.email,
                    password: this.password
                })
                localStorage.token = authRes.data.token
                localStorage.id = authRes.data._id
                this.$router.push('/')
                console.log("authRes: ", authRes)
                // eslint-disable-next-line
                console.log("res: ", res)
                
            }
        },
        goToLogin() {
            this.$router.push('/login')
        }
    }
}
</script>
<style scoped>
</style>