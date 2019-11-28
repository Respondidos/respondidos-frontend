<template lang="pug">
    v-container(fluid)
        v-card()
            v-card.primary(width="100%" height="100") 
                v-row.justify-center.align-center(style="height: 100%;")
                    span.subtitle-1.font-weight-medium.white--text() {{question.header}}
                v-progress-linear(color="light-blue" height="10" :value="timer" striped)
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
export default {
    props: {
        quiz: Object
    },
    data () {
        return {
            question: this.quiz.questions[0],
            showingRight: false,
            timer: 0,
            timerNext: 0,
            answeringQuestion: true,
            questionIndex: 0
        }
    },
    created() {
        /* eslint-disable */
        console.log(this.quiz)
        this.interval = setInterval(this.countTime, 100)
    },
    methods: {
        response (question) {
            console.log("question: ", question)
            this.showingRight = true
            this.answeringQuestion = false
        },
        countTime () {
            if (this.answeringQuestion) {
                this.timer = this.timer + 0.5
            } else {
                console.log("entrou em not answering")
                this.timerNext = this.timerNext + 1
            }
            if (this.timerNext === 20) {
                console.log("entrou em timerNext")
                this.questionIndex = this.questionIndex + 1
                console.log("index: ", this.questionIndex)
                console.log("lenght: ", this.quiz.questions.length)
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
        finishedTest () {
            console.log("finalizou")
        }
    }
}
</script>