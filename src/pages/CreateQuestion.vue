<template lang="pug">
  v-card
    v-card-title() Adicionar Pergunta
    v-card-text
      v-form(ref='form1' v-model="valid")
        v-row(justify='center')
          v-col
            span.subtitle-1.font-weight-medium Pergunta
            v-text-field(outlined dense single-line clearable hint='A pergunta')
            span.subtitle-1.font-weight-medium.success--text Alternativa correta
            v-text-field(outlined dense single-line clearable hint='Alternativa a)')
            span.subtitle-1.font-weight-medium.error--text Alternativas erradas
            v-text-field(outlined dense single-line clearable hint='Alternativa b)')
            v-text-field(outlined dense single-line clearable hint='Alternativa c)')
            v-text-field(outlined dense single-line clearable hint='Alternativa d)')
      v-spacer
      v-scale-transition
        v-row.justify-end.mr-2
          v-btn(@click="save" outlined color='primary') Salvar
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      formData: {
        title: '',
        type: null,
        subtitle: '',
        icon: ''
      },
    }
  },
  async created () {
  },
  methods: {
    async save () {
      // TODO: Method to save
    }
  }
}
</script>
