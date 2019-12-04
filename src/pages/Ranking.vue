<template lang="pug">
    v-container(fluid)
        v-card()
            v-card-title Ranking de "{{quiz.info.name}}"
            v-list()
                div(v-for="(ranking, index) in quiz.ranking" :key="index")
                    v-list-item()
                        v-list-item-content
                            v-alert.white--text(:color="typeByIndex(index)")
                                v-row.justify-end()
                                    v-col(cols="11")
                                        v-list-item-title.ml-5() {{ranking.student.firstName}} {{ranking.student.lastName}}
                                    v-col(cols="1")
                                        v-row.justify-end()
                                            v-list-item-title() {{ranking.points}}
</template>
<script>
export default {
    props: {
        quiz: {
            type: Object
        }
    },
    created () {
        /* eslint-disable */ 
    },
    methods: {
        typeByIndex(index) {
            if (index === 0) return 'success'
            if (index === 1) return 'info'
            else {
                return 'info'
            }
        }
    }
}
</script>
<style scoped>
</style>