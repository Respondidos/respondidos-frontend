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
                                span Turma
                                v-select(v-model='selectedClass' placeholder='Selecione a turma desejada' outlined :items='listedClasses' :rules='[newRules.obrigatorio]')
                                span Perguntas
                                v-select(v-model='selectedQuestions' placeholder='Escolha as perguntas para este quiz.' outlined :items='listedQuestions' :rules='[newRules.vetorObrigatorio]' multiple chips)
                    v-row
                        v-spacer
                        v-btn.primary(@click='saveQuiz' text outlined color='white') Salvar
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
           listedQuestions: ["Quem criou o Brasil?","De quem é a música K.O?", "Quantos Grammys Katy Perry já ganhou?", "Qual o nome da filha de Beyoncé?"],
           listedClasses: ["1º Ano", "2º Ano", "3º Ano", "4º Ano"],
           formQuizValid: false,
           newRules: {
               obrigatorio: value => !!value || 'Campo obrigatório.',
               caracteres:  value => (value || '').length <= 50 || 'Max 50 caracteres',
               vetorObrigatorio: value => value.length >= 1|| 'Selecione no minímo uma pergunta.'
           }
        }
    },
    methods: {
        async saveQuiz() {
            if (this.formQuizValid) {
                    const instance = axios.create({
                    baseURL: 'http://localhost:8888',
                    headers: {'authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkYjIwNTZiOTY4NzdlMTY3MDJmMTUzMCIsImlhdCI6MTU3MTk0Nzg4NCwiZXhwIjoxNTcyMDM0Mjg0fQ.Y7CkHyGokd0PjsMTmzlnssBbBHmR2ilgh-r0xdIVCuQ'}
                    });

                    var objeto = {
                        info: {
                            name: this.quizName
                        },
                        questions: [
                            { 
                            header: 'quem descobriu o brasil',
                            options: [
                                {
                                text: 'bolsonaro',
                                isCorrect: 'false'
                                },
                                {
                                text: 'cabral',
                                isCorrect: 'true'
                                },
                                {
                                text: 'lula livre',
                                isCorrect: 'false'
                                },
                                {
                                text: 'machado de assis',
                                isCorrect: 'false'
                                }
                            ]
                            },
                            { 
                                header: 'eh o papa?',
                                options: [
                                {
                                    text: 'nao sei',
                                    isCorrect: 'false'
                                },
                                {
                                    text: 'o argentino',
                                    isCorrect: 'true'
                                },
                                {
                                    text: 'lula',
                                    isCorrect: 'false'
                                },
                                {
                                    text: 'padre fabio de melo',
                                    isCorrect: 'false'
                                }
                                ]
                            }
                        ]
                        }

                    var res = await instance.post('/quizzes/',objeto)
                    console.log(res);
                }
            }
        }
    }
</script>

<style scoped>
</style>