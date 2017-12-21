import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/about/components/HelloWorld'
import Counter from '@/about/components/Counter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/counter',
      name: 'Counter',
      component: Counter
    }
  ]
})
