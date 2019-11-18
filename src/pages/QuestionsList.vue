<template lang="pug">
    v-container
        v-dialog(v-model='dialog' max-width="700")
            template(v-slot:activator='{ on }')
                v-btn.primary(v-on='on' fixed fab bottom right)
                    v-icon add
            createQuestion()
        v-list(two-line)
            div(v-for="question in questions" :key="question.id")
                v-list-item()
                    v-list-item-content
                        v-row.justify-space-between()
                            v-col(align-self="center")
                                v-list-item-title() {{question.title}}
                v-divider
</template>

<script>
import createQuestion from '../pages/CreateQuestion'
import axios from 'axios'
export default {
    components: {
        createQuestion
    },
    data () {
        return {
            dialog: false,
            questions: [
              {
                id: 1,
                title: 'Por que Deus não me leva?'
              },
              {
                id: 2,
                title: 'Por que isso é um array?'
              },
              {
                id: 3,
                title: 'Qual o sentido da vida?'
              }
            ]
        }
    },
     async created() {
        /* eslint-disable */
        const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkY2RhZWM2MTQ4ZWZiMGEwZDAzNTUwZiIsImlhdCI6MTU3NDA5ODgzOCwiZXhwIjoxNTc0MTg1MjM4fQ.YlqfKuK_cKJR2u4vbYvalI6XfaRFSpBhu-IwbMqU20c'}
        });
        const res = await instance.get('/questions')
        console.log(res.data)
        this.questions = res.data
    }
}
</script>