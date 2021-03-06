import Vue from 'vue'
import Router from 'vue-router'

import AppView from '@/components/app-view'
import Home from '@/pages/home'

Vue.use(Router)

const page = name => () => import('@/pages/' + name)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: AppView,
      children: [
        {path: '/', name: 'home', component: Home},
        {path: '/button', name: 'c-button', component: page('c-button')},
        {path: '/switch', name: 'c-switch', component: page('c-switch')},
        {path: '/checkbox', name: 'c-checkbox', component: page('c-checkbox')},
        {path: '/alert', name: 'c-alert', component: page('c-alert')},
        {path: '/input', name: 'c-input', component: page('c-input')},
        {path: '/keyboard', name: 'c-keyboard', component: page('c-keyboard')},
        {path: '/loading', name: 'c-loading', component: page('c-loading')},
        {path: '/data-table', name: 'p-data-table', component: page('table')},
        {path: '/dropdown', name: 'c-dropdown', component: page('c-dropdown')},
        {path: '/navbar', name: 'c-navbar', component: page('c-navbar')},
        {path: '/container', name: 'c-container', component: page('c-container')},
        {path: '/demo', name: 'demo', component: page('demo')},
        {path: '/404', name: '404', component: page('404')},
        {path: '/500', name: '500', component: page('500')},
        // 开始
        {path: '/user', name: 'user', component: page('user')},
        {path: '/dept', name: 'dept', component: page('dept')},
        {path: '/caseHistory', name: 'caseHistory', component: page('caseHistory')},
        {path: '/medicine', name: 'medicine', component: page('medicine')},
        {path: '/disease', name: 'disease', component: page('disease')},
        {path: '/addadmin', name: 'addadmin', component: page('addadmin')},
        {path: '/admin', name: 'admin', component: page('admin')},
        {path: '/disease', name: 'disease', component: page('disease')},
        {path: '/bed', name: 'bed', component: page('bed')},
        {path: '/appointment', name: 'appointment', component: page('appointment')},
        {path: '/appointmentBed', name: 'appointmentBed', component: page('appointmentBed')},
        {path: '/order', name: 'order', component: page('order')}
      ]
    },
    {path: '/login', name: 'login', component: page('login')},
    {path: '/cnode', name: 'cnode', component: page('cnode')},
    // pages
    {path: '/keyboard', name: 'p-keyboard', component: page('c-keyboard')},
    {path: '*', redirect: {name: '404'}}
  ]
})
