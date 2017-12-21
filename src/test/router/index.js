import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/test/components/HelloWorld'
import Counter from '@/test/components/Counter'

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
