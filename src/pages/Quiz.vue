<template lang="pug">
    v-container(fluid)
        v-card()
            v-card.primary(width="100%" height="100") 
                v-row.justify-center.align-center(style="height: 100%;")
                    span.subtitle-1.font-weight-medium.white--text() {{question.header}}
                v-progress-linear(color="light-blue" height="10" :value="timerPercentage" striped)
            v-row.justify-center.align-center.mt-5
                v-col(cols="6" v-for="option in question.options" :key="option.text")
                    template(v-if="showingRight")
                        v-card.green.ml-3.mr-3(@click="response(option)" v-if="option.isCorrect") 
                            v-row.justify-center.align-center
                                span.subtitle-1.font-weight-medium() {{option.text}}
                        v-card.red.ml-3.mr-3(@click="response(option)" v-else) 
                            v-row.justify-center.align-center
                                span.subtitle-1.font-weight-medium() {{option.text}}
                    template(v-else)
                        v-card.ml-3.mr-3(@click="response(option)") 
                            v-row.justify-center.align-center
                                span.subtitle-1.font-weight-medium() {{option.text}}

</template>
<script>
import axios from 'axios'
export default {
    props: {
        quiz: Object,
        accessCode: String
    },
    data () {
        return {
            question: this.quiz.questions[0],
            showingRight: false,
            timer: 0,
            timerNext: 0,
            answeringQuestion: true,
            questionIndex: 0,
            bgAudio: undefined,
            coinAudio: undefined,
            score: 0,
            isFinished: false
        }
    },
    mounted() {
        /* eslint-disable */
        console.log(this.quiz)
        this.interval = setInterval(this.countTime, 100)
        this.playBackgroundMusic()
    },
    computed: {
        timerPercentage () {
            return this.timer * 5
        }
    },
    beforeDestroy() {
        this.stopMusic()
    },
    created() {
        console.log("teste quiz: ", this.quiz)
    },
    methods: {
        response (question) {
            if (this.showingRight === false) {
                console.log("question: ", question)
                this.showingRight = true
                this.answeringQuestion = false
                if (question.isCorrect === true) {
                    if (this.timer <= 5) {
                        this.score += 50
                    } else if (this.timer <= 10) {
                        this.score += 45
                    } else if (this.timer <= 15) {
                        this.score += 40
                    } else if (this.timer <= 17) {
                        this.score += 30
                    } else {
                        this.score += 25
                }
            }
            }
            this.coinAudio = new Audio(require('../assets/coins.mp3'))
            this.coinAudio.play()
        },
        countTime () {
            if (this.answeringQuestion && !this.isFinished) {
                this.timer = this.timer + 0.1
            } else {
                this.timerNext = this.timerNext + 0.1
            }
            if (this.timer >= 20 && !this.isFinished) {
                this.showingRight = true
                this.answeringQuestion = false
            }
            if (this.timerNext >= 4 && !this.isFinished) {
                this.questionIndex = this.questionIndex + 1
                console.log("index: ", this.questionIndex)
                console.log("lenght: ", this.quiz.questions.length)
                console.log("score: ", this.score)
                if (this.quiz.questions.length > this.questionIndex) {
                    console.log("entrou no if")
                    this.question = this.quiz.questions[this.questionIndex]
                    this.showingRight = false
                    this.timerNext = 0
                    this.timer = 0
                    this.answeringQuestion = true
                } else {
                    this.finishedTest()
                }
            }
        },


        
        playBackgroundMusic() {
            console.log('play')
            this.bgAudio = new Audio(require('../assets/quiz.mp3'))
            this.bgAudio.addEventListener('ended', function() {
                this.currentTime = 0;
                this.play();
            }, false)
            this.bgAudio.play()
        },
        stopMusic() {
            this.bgAudio.pause()
        },
        async finishedTest () {
            this.isFinished = true
            console.log("quiz: ", this.quiz)
            console.log("finalizou")
            const instance = axios.create({
                baseURL: 'http://localhost:8888',
                headers: {'authorization':  `Bearer ${localStorage.token}`}
                });
            const obj = {
                accessCode: this.quiz.accessCode,
                score: this.score
            }
            var res = await instance.post('/quizzes/addscore',obj)
            this.$emit('emit', 'teste')
            console.log(res)
        }
    }
}
</script>