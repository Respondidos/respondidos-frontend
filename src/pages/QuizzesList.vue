<template lang="pug">
    v-container
        v-dialog(v-model='dialog' max-width="700")
            template(v-slot:activator='{ on }')
                v-btn.primary(v-on='on' fixed fab bottom right)
                    v-icon add
            createQuiz()
        v-dialog(v-model="quizDialog" height="100%")
            quiz(:quiz="selectedQuiz")
        v-row
            v-col(cols="12")
                span.subtitle-1.font-weight-medium() Digite o código para entrar num quiz
            v-col(cols="12")
                v-text-field.mt-5(v-model="quizzCode" outlined dense hide-details)
            v-col(cols="12")
                v-btn.primary( @click="enterQuiz") Participar
        span.subtitle-1.font-weight-medium.mt-5() Quizzes que você participa
        v-list(two-line)
            div(v-for="(quiz, index) in quizzes" :key="index")
                v-list-item()
                    v-list-item-content
                        v-row.justify-space-between()
                            v-col(align-self="center")
                                v-list-item-title() {{quiz.info.name}}
                v-divider
</template>

<script>
import createQuiz from '../pages/CreateQuiz'
import Quiz from '../pages/Quiz'
import axios from 'axios'
export default {
    components: {
        createQuiz,
        Quiz
    },
    data () {
        return {
            dialog: false,
            quizDialog: false,
            quizzCode: '',
            selectedQuiz: {
                "_id":{"$oid":"5da0d038b49938474bb81042"},
                "info":{
                    "name":"Oi!!!",
                    "creator":{
                        "$oid":"5da0cebc50fc824676826630"
                    }
                    },
                "questions":[
                    {
                        "header":"Que aula é essa?",
                        "options":[
                            {
                                "text":"Arquitetura"
                            },
                            {
                                "text":"Engenharia de Software"
                            },
                            {
                                "text":"Metodologias ágeis"
                            },
                            {
                                "text":"Teoria da computação",
                                "isCorrect":true
                            }
                        ]
                    },
                    {
                        "header":"Qual o assunto dessa aula?",
                        "options":[
                            {
                                "text":"Maquina de turing",
                                "isCorrect":true
                            },
                            {
                                "text":"Dominó"
                            },
                            {
                                "text":"Varrer chão"
                            },
                            {
                                "text":"Como domar uma mosca"
                            }
                        ]
                    }
                ],
                "__v":{
                    "$numberInt":"0"
                }
            },
            quizzes: null
        }
    },
    methods: {
        enterQuiz (){
            this.quizDialog = true
        }
    },
    async created() {
        /* eslint-disable */
        const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2Q4ZmRjYTBjOGRjMDVkYjIzMzZiMiIsImlhdCI6MTU3Mzc1MjkyMiwiZXhwIjoxNTczODM5MzIyfQ.UN5lA6y0TDYM_xNPAHMVNzmL-H3Zvedb1zJRhry5fjI'}
        });
        const res = await instance.get('/quizzes')
        console.log("res: ", res)
        this.quizzes = res.data
    }
}
</script>