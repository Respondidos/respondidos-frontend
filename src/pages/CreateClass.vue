<template lang="pug">
  v-card
    v-card-title() Adicionar Turma
    v-card-text
      v-form(ref='form1' v-model="valid")
        v-row(justify='center')
          v-col(sm=10)
            span.subtitle-1.font-weight-medium Nome
            v-text-field(outlined single-line clearable :rules='[rules.required]' hint='O titulo, em contato seria o nome da pessoa')
            span.subtitle-1.font-weight-medium Perguntas
            v-autocomplete( :items="questions" outlined multiple small-chips clearable)
      v-spacer
      v-scale-transition
        v-row.justify-end.mr-2
          v-btn(@click="add" outlined color='primary' :loading="loading" v-if="!index") Concluir cadastro
          v-btn(@click="save" outlined color='primary' :loading="loading" v-else) Salvar
      v-snackbar( v-model="snackbar.enable" :timeout="6000" top right ) {{ snackbar.text }}
        v-btn( color="pink" text @click="snackbar.enable = false" ) Fechar
</template>

<script> 
export default {
  data () {
    return {
      valid: true,
      snackbar: {
        enable: false,
        text: ''
      },
      questions: [" qual a cor do cavalo branco de napoleão", "qual o nome do segundo presidente do brasil", "Quem descobriu o brasil (nao foi o pedro)","Qual o nome do presidente que criou brasilia","Testando perguntas","ghfdsghjkdfhsgjkdfshgjkfdhgfdjksghdsfhgfjkdshcbxzv","eruewqeiuqweiwqueiqwueiquweiuqweiuwqeiuq"],
      loading: false,
      formContact: Object.assign({}, this.contacts),
      isSocialMedia: this.showingSocialMedia,
      formData: {
        title: '',
        type: null,
        subtitle: '',
        icon: ''
      },
      rules: {
        required: value => !!value || 'Campo obrigatório.',
        passwordRequired: value => !!value || 'Preencha a senha.',
        radio: (value) => {
          return !!value || 'Campo obrigatório'
        }
      },
      email: value => {
        if (value && value.length > 0) {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        } else {
          return true
        }
      }
    }
  },
  async created () {
  },
  methods: {
    async add () {
    //   console.log('form: ', this.formData)
    //   console.log('contacts: ', this.contacts)
    //   if (this.valid) {
    //     this.loading = true
    //     if (this.isSocialMedia) {
    //       this.contacts.socialNetworks.push(this.formData)
    //     } else {
    //       this.contacts.contacts.push(this.formData)
    //     }
    //     try {
    //       var res = await post.create(JSON.stringify(this.contacts))
    //       console.log('res: ', res)
    //       this.$emit('close-dialog')
    //       console.log(this.contacts)
    //       this.loading = false
    //     } catch (err) {
    //       console.log(err)
    //       this.snackbar.text = 'Ocorreu um erro ao registrar'
    //       this.snackbar.enable = true
    //       this.loading = false
    //     }
    //   } else {
    //     this.snackbar.text = 'Por favor preencha todos os campos'
    //     this.snackbar.enable = true
    //   }
    },
    // async save () {
    //   console.log(this.formContact)
    //   if (this.valid) {
    //     this.loading = true
    //     try {
    //       var res = await post.create(JSON.stringify(this.formContact))
    //       console.log('res: ', res)
    //       this.$emit('close-dialog')
    //       this.loading = false
    //       this.contacts = this.formContact
    //     } catch (err) {
    //       this.snackbar.text = 'Ocorreu um erro ao registrar'
    //       this.snackbar.enable = true
    //       console.log(err)
    //       this.loading = false
    //     }
    //   } else {
    //     this.snackbar.text = 'Por favor preencha todos os campos'
    //     this.snackbar.enable = true
    //   }
    // }
  }
}
</script>
