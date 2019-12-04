<template lang="pug">
    v-container
        v-card
            v-card-title Criar Quiz
            v-card-text
                v-container
                    v-row
                        v-col(xs=8)
                            v-form(v-model='formQuizValid')
                                span Nome
                                v-text-field(v-model='quizName' placeholder='Insira aqui o nome do seu novo quiz!' outlined :rules='[newRules.obrigatorio,newRules.caracteres]')
                                span Perguntas
                                v-select(v-model='selectedQuestions' placeholder='Escolha as perguntas para este quiz.' outlined multiple chips :items='listedQuestions' item-value="id" item-text="title")
                    v-row
                        v-spacer
                        v-btn.primary(@click='saveQuiz' text outlined color='white') Salvar
        v-snackbar(v-model="snackbarquiz") {{snackBarText}}
            v-btn(color="pink" text @click="snackbar = false") Close
</template>

<script>
/* eslint-disable */
import createClass from '../pages/CreateClass'
import axios from 'axios'
export default {
    components: {
        createClass
    },
    data () {
        return {
           quizName: "",
           selectedClass: "",
           selectedQuestions: [],
           listedQuestions: [],
           formQuizValid: false,
           newRules: {
               obrigatorio: value => !!value || 'Campo obrigatório.',
               caracteres:  value => (value || '').length <= 50 || 'Max 50 caracteres',
               vetorObrigatorio: value => value.length >= 1|| 'Selecione no minímo uma pergunta.'
           },
           snackBarText: '',
           snackbarquiz: false
        }
    },
    methods: {
        async saveQuiz() {
            if (this.formQuizValid) {
                const instance = axios.create({
                baseURL: 'http://localhost:8888',
                headers: {'authorization':  `Bearer ${localStorage.token}`}
                });

                var objeto = {
                    "info": {
                    "name": this.quizName
                    },
                    "questions": this.selectedQuestions
                }
                var res = await instance.post('/quizzes/',objeto)
                this.snackBarText = res.data.accessCode
                this.snackbarquiz = true
                this.$emit('emit', 'teste')
                console.log(res);
            }
        }

    },
    async created() {
        const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  `Bearer ${localStorage.token}`}
        });
        const res = await instance.get('/questions')
        console.log("data: ", res.data)
        const response = res.data
        for(let question of response ) {
            const obj = {
                title: question.header,
                id: question._id
            }
            this.listedQuestions.push(obj)
        }
    }
    }
</script>

<style scoped>
</style>