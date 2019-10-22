/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import ClassList from './pages/ClassList.vue'
import QuestionsList from './pages/QuestionsList.vue'
import Base from './pages/Base.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/',
			name: 'base',
			component: Base,
			redirect: '/turmas',
			children: [
				{
					path: '/turmas',
					name: 'classes',
					component: ClassList
				},
				{
					path: '/questoes',
					name: 'questions',
					component: QuestionsList
				}
			]
		}
	]
})