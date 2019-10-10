/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
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
			path: '/',
			name: 'base',
			component: Base,
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