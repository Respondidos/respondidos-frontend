<template lang="pug">
    v-container
        v-dialog(v-model='addDialog' max-width="700")
            template(v-slot:activator='{ on }')
                v-btn.primary(v-on='on' fixed fab bottom right)
                    v-icon +
            createClass()
        v-list(two-line)
            div(v-for="turma in classes" :key="turma.code")
                v-list-item()
                    v-list-item-content
                        v-row.justify-space-between()
                            v-col(align-self="center")
                                v-list-item-title() {{turma.name}}
                                v-list-item-subtitle {{turma.code}}
                            v-col(justify-self="center" align-self="center")
                                v-row.justify-end()
                                    v-col(cols="2")
                                        v-list-title() {{turma.qtdUsers}}
                v-divider
</template>
<script>
import createClass from '../pages/CreateClass'
export default {
    components: {
        createClass
    },
    data () {
        return {
            addDialog: false,
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
    }
}
</script>
<style scoped>
</style>