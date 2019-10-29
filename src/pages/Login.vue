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
                                            v-text-field(label="Senha" placeholder="Digite a Senha" v-model="password" outline :rules="[rules.passwordRequired]")
                                        v-btn.primary(text block @click="login") Login
                                        v-btn.primary.mt-5(text block @click="goToSignUp") Cadastro 
</template>
<script>
export default {
    data () {
        return {
            email: '',
            password: '',
            valid: true,
            rules: {
                userRequired: value => !!value || 'Preencha o email.',
                passwordRequired: value => !!value || 'Preencha a senha.',
            },
        }
    },
    methods: {
        login() {
            if (this.valid) {
                this.$router.push({path: '/list'})
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