<template lang="pug">
    div
        v-container(v-if="showingTurmas")
            v-dialog(v-model='addDialog' max-width="700")
                template(v-slot:activator='{ on }')
                    v-btn.primary(v-on='on' fixed fab bottom right)
                        v-icon add
                CreateQuiz()
            v-list(two-line)
                div(v-for="turma in classes" :key="turma.code")
                    v-list-item(@click="selectedTurma(turma)")
                        v-list-item-content
                            v-row.justify-space-between()
                                v-col(align-self="center")
                                    v-list-item-title() {{turma.name}}
                                    v-list-item-subtitle {{turma.code}}
                                v-col(justify-self="center" align-self="center")
                                    v-row.justify-end()
                                        v-col(cols="2")
                                            v-list-item-title() {{turma.qtdUsers}}
        v-container(v-else)
            v-tabs(v-model="tab" grow centered)
                v-tab() Alunos
                v-tab() Quizes
            v-tabs-items(v-model="tab")
                v-tab-item
                    v-list(two-line)
                        div(v-for="student in students" :key="students.name")
                            v-list-item()
                                v-list-item-content
                                    v-row.justify-start()
                                        v-col(align-self="center" cols="auto")
                                            v-avatar(size="40")
                                                v-img(:src="student.image")
                                        v-col(align-self="center" cols="auto")
                                            v-list-item-title() {{student.name}}
                                        v-spacer
                                        v-col(justify-self="center" align-self="center" cols="auto")
                                            v-list-item-title.mr-5() {{student.score}}
                v-tab-item()
                    v-list(two-line)
                        div(v-for="quiz in quizes" :key="quizes.name")
                            v-list-item()
                                v-list-item-content
                                    v-row.justify-start()
                                        v-col(align-self="center" cols="auto")
                                            v-list-item-title() {{quiz.name}}
                                        v-spacer
                                        v-col(justify-self="center" align-self="center" cols="auto")
                                            v-list-item-title.mr-5() {{quiz.numberOfQuestions}}
</template>
<script>
import createClass from '../pages/CreateClass'
import CreateQuiz from '../pages/CreateQuiz'
export default {
    components: {
        createClass,
        CreateQuiz
    },
    data () {
        return {
            addDialog: false,
            showingTurmas: true,
            tab: null,
            quizes: [
                {
                    name: 'Historia do Brasil',
                    isDone: true,
                    numberOfQuestions: 10
                },
                {
                    name: 'Revolução Francesa',
                    isDone: true,
                    numberOfQuestions: 12
                },
                {
                    name: 'Segunda Guerra Mundial',
                    isDone: false,
                    numberOfQuestions: 8
                },
                {
                    name: 'Guerra do Vietnam',
                    isDone: false,
                    numberOfQuestions: 15
                },
                {
                    name: 'Ditadura Militar',
                    isDone: false,
                    numberOfQuestions: 20
                },
            ],
            students: [
                {
                    name: 'João luiz',
                    score: 90,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'João Guilherme',
                    score: 87,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'Pedro',
                    score: 82,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'Carlos Alberto',
                    score: 75,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'Eduardo Leite',
                    score: 69,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'Carlos Eduardo',
                    score: 65,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
                {
                    name: 'David Gomes',
                    score: 50,
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIuTD4xUsica59OdZcazWe6BGK89X-uIVMySA7ELGNxsY9mu8p'
                },
            ],
            classes: [
                {
                    name: 'Turma 1',
                    code: '#Respondidos12321',
                    qtdUsers: 20
                },
                {
                    name: 'Turma 2',
                    code: '#Respondidos1255321',
                    qtdUsers: 22
                },
                {
                    name: 'Turma 3',
                    code: '#Respondidos1233321',
                    qtdUsers: 25
                },
                {
                    name: 'Turma 4',
                    code: '#Respondidos122221',
                    qtdUsers: 15
                },
                {
                    name: 'Turma 5',
                    code: '#Respondidos1232333',
                    qtdUsers: 5
                },
            ]
        }
    },
    methods: {
        selectedTurma() {
            this.showingTurmas = false
        },
        itemColor(isDone) {
            return isDone ? 'done':'notDone'
        }
    },
}
</script>
<style scoped>
</style>