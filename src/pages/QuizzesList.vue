<template lang="pug">
    v-container
        v-dialog(v-model='dialog' max-width="700")
            template(v-slot:activator='{ on }')
                v-btn.primary(v-on='on' fixed fab bottom right)
                    v-icon add
            createQuiz(v-on:emit="dialog=false")
        v-dialog(v-model="quizDialog" v-if="quizDialog" height="100%")
            quiz(:quiz="selectedQuiz" v-on:emit="quizDialog=false")
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
                                v-list-item-title()
                                    v-row(justify="space-between")
                                        v-col(cols="auto")
                                            span {{quiz.info.name}}
                                        v-col(cols="2" xs="4" sm="3" md="3" lg="2" xl="2")
                                            span.secondary--text {{quiz.accessCode}}
                v-divider
        v-snackbar(v-model="snackbar") Você já participou desse quiz
            v-btn(color="pink" text @click="snackbar = false") Close
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
            bgAudio: undefined,
            quizzCode: '',
            selectedQuiz: {},
            quizzesOwn: null,
            quizzesParticipating: null,
            rankingDialog: false,
            snackbar: false
        }
    },
    beforeDestroy() {
        this.stopMusic()
    },
    watch: {
        quizDialog: function (val) {
            /* eslint-disable */
            if (val === true) {
                console.log("entrou aqui com valor: ", val)
                this.bgAudio.pause()
            } else {
                this.playBackgroundMusic()
            }
        }
    },
    methods: {
        async enterQuiz (){
            /* eslint-disable */ 
            try {
                const instance = axios.create({
                baseURL: 'http://localhost:8888',
                headers: {'authorization':  'Bearer ' + localStorage.token }
                });
                const res = await instance.get(`/quizzes/code/${this.quizzCode}`)
                console.log("res: ", res)
                this.selectedQuiz = res.data
                console.log("quiz: ", this.selectedQuiz)
                this.quizDialog = true
            } catch(err) {
                if (err.response.status === 412) {
                    this.snackbar = true
                }
            }
        },
        showRanking (quiz) {
            /* eslint-disable */
            console.log(quiz)
            this.selectedQuiz = quiz
            this.rankingDialog = true
        },
        playBackgroundMusic() {
            this.bgAudio = new Audio(require('../assets/background.mp3'))
            this.bgAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false)
            this.bgAudio.play()
        },
        stopMusic() {
            /* eslint-disable */
            console.log("deveria parar ")
            this.bgAudio.pause()
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
        this.playBackgroundMusic()
    }
}
</script>