/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import SignUp from './pages/SignUp.vue'
import List from './pages/ClassList.vue'
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
			path: '/signup',
			name: 'signUp',
			component: SignUp
		},
		{
			path: '/',
			name: 'base',
			component: Base,
			redirect: '/list',
			children: [
				{
					path: '/list',
					name: 'list',
					component: List
				}
			]
		}
	]
})
router.beforeEach((to, from, next) => {
	if(to.path === '/') {
		next('/list')
	} else {
		next()
	}	
})
export default router