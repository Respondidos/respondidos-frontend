<template lang="pug">
  v-card
    v-card-title() Adicionar Pergunta
    v-card-text
      v-form(ref='form1' v-model="valid")
        v-row(justify='center')
          v-col
            span.subtitle-1.font-weight-medium Pergunta
            v-text-field(v-model="title" outlined dense single-line clearable hint='A pergunta')
            span.subtitle-1.font-weight-medium.success--text Alternativa correta
            v-text-field( v-model="altA" outlined dense single-line clearable hint='Alternativa a)')
            span.subtitle-1.font-weight-medium.error--text Alternativas erradas
            v-text-field(v-model="altB" outlined dense single-line clearable hint='Alternativa b)')
            v-text-field(v-model="altC" outlined dense single-line clearable hint='Alternativa c)')
            v-text-field(v-model="altD" outlined dense single-line clearable hint='Alternativa d)')
      v-spacer
      v-scale-transition
        v-row.justify-end.mr-2
          v-btn(@click="save" outlined color='primary') Salvar
</template>

<script>
import axios from 'axios'
export default {
  props: {
    questions: {
      type: Array
    }
  },
  data () {
    return {
      valid: true,
      title: '',
      altA: '',
      altB: '',
      altC: '',
      altD: ''
    }
  },
  async created () {
  },
  methods: {
    async save () {
      const random = Math.floor(Math.random() * 4)
      var obj = {}
      if (random === 0) {
        obj = {
        header: this.title,
        options: [
            {
              text: this.altA,
              isCorrect: true
            },
            {
              text: this.altB,
              isCorrect: false
            },
            {
              text: this.altC,
              isCorrect: false
            },
            {
              text: this.altD,
              isCorrect: false
            },
          ]
        }
      } else if (random === 1) {
        obj = {
        header: this.title,
        options: [
            {
              text: this.altB,
              isCorrect: false
            },
            {
              text: this.altA,
              isCorrect: true
            },
            {
              text: this.altC,
              isCorrect: false
            },
            {
              text: this.altD,
              isCorrect: false
            },
          ]
        }
      } else if (random === 2) {
        obj = {
        header: this.title,
        options: [
            {
              text: this.altB,
              isCorrect: false
            },
            {
              text: this.altC,
              isCorrect: false
            },
            {
              text: this.altA,
              isCorrect: true
            },
            {
              text: this.altD,
              isCorrect: false
            },
          ]
        }
      } else {
        obj = {
        header: this.title,
        options: [
            {
              text: this.altB,
              isCorrect: false
            },
            {
              text: this.altD,
              isCorrect: false
            },
            {
              text: this.altC,
              isCorrect: false
            },
            {
              text: this.altA,
              isCorrect: true
            },
          ]
        }
      }
      /* eslint-disable */
      const instance = axios.create({
            baseURL: 'http://localhost:8888',
            headers: {'authorization':  `Bearer ${localStorage.token}`}
        });
        const res = await instance.post('/questions', obj)
        this.questions.push(obj)
        this.altA = ''
        this.altB = ''
        this.altC = ''
        this.altD = ''
        this.title = ''
        this.$emit('emit', 'teste')
        console.log("res: ", res)
      // TODO: Method to save
    }
  }
}
</script>
