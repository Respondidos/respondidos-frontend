/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import SignUp from './pages/SignUp.vue'
import QuizzesList from './pages/QuizzesList.vue'
import QuestionsList from './pages/QuestionsList.vue'
import Base from './pages/Base.vue'

Vue.use(Router)

var router = new Router({
	mode: 'history',
	routes: [
		{
			path: '/login',
			name: 'login',
			component: Login
		},
		{
			path: '/signup',
			name: 'signUp',
			component: SignUp
		},
		{
			path: '/',
			name: 'base',
			component: Base,
			redirect: '/quizzes',
			children: [
				{
					path: '/quizzes',
					name: 'questions',
					component: QuizzesList
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
router.beforeEach((to, from, next) => {
	if(to.path === '/') {
		next('/quizzes')
	} else {
		next()
	}	
})
export default router