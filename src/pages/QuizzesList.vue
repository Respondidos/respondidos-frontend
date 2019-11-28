<template lang="pug">
    v-container
        v-dialog(v-model='dialog' max-width="700")
            template(v-slot:activator='{ on }')
                v-btn.primary(v-on='on' fixed fab bottom right)
                    v-icon add
            createQuiz()
        v-dialog(v-model="quizDialog" height="100%")
            quiz(:quiz="selectedQuiz")
        v-dialog(v-model="rankingDialog" height="100%")
            Ranking(:quiz="selectedQuiz")
        v-row
            v-col(cols="12")
                span.subtitle-1.font-weight-medium() Digite o código para entrar num quiz
            v-col(cols="12")
                v-text-field.mt-5(v-model="quizzCode" outlined dense hide-details)
            v-col(cols="12")
                v-btn.primary( @click="enterQuiz") Participar
        span.subtitle-1.font-weight-medium.mt-5() Quizzes que você participa
        v-list(two-line)
            div(v-for="(quiz, index) in quizzesParticipating" :key="index")
                v-list-item(@click="showRanking(quiz)")
                    v-list-item-content
                        v-row.justify-space-between()
                            v-col(align-self="center")
                                v-list-item-title() {{quiz.info.name}}
                v-divider
        span.subtitle-1.font-weight-medium.mt-5() Quizzes que você criou
        v-list(two-line)
            div(v-for="(quiz, index) in quizzesOwn" :key="index")
                v-list-item(@click="showRanking(quiz)")
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
import Ranking from '../pages/Ranking'
export default {
    components: {
        createQuiz,
        Quiz,
        Ranking
    },
    data () {
        return {
            dialog: false,
            quizDialog: false,
            quizzCode: '',
            selectedQuiz: {},
            quizzesOwn: null,
            quizzesParticipating: null,
            rankingDialog: false
        }
    },
    methods: {
        async enterQuiz (){
            /* eslint-disable */ 
            const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  'Bearer ' + localStorage.token }
            });
            const res = await instance.get(`/quizzes/code/${this.quizzCode}`)
            console.log("quizz: ", res)
            this.selectedQuiz = res.data
            this.quizDialog = true
        },
        showRanking (quiz) {
            /* eslint-disable */
            console.log(quiz)
            this.selectedQuiz = quiz
            this.rankingDialog = true
        }
    },
    async created() {
        /* eslint-disable */
        const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  'Bearer ' + localStorage.token }
        });
        const res = await instance.get(`/user/quizzes/own`)
        console.log("res: ", res)
        this.quizzesOwn = res.data
        const response = await instance.get(`/user/quizzes/participating`)
        console.log("res: ", response)
        this.quizzesParticipating = response.data
    }
}
</script>