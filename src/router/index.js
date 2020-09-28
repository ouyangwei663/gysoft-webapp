import Vue from 'vue'
import Router from 'vue-router'
import Shouye from '@/components/shouye/shouye'
import HelloWorld from '@/components/HelloWorld'
import crash from '@/components/crash/crash'
import datanote from '@/components/datanote/datanote'
import money from '@/components/money/money'
import find from '@/components/find/find'
import register from '@/components/register/register'
import vipcheck from '@/components/vipperson/vipperson'
import operate from '@/components/operate/operate'
import detailed from '@/components/detailed/detailed'
import bank from '@/components/bank/bank'
import listcheck from '@/components/listcheck/listcheck'
import vipbookdetail from '@/components/vipbook/vipbookdetail/vipbookdetail'
import vipbookflow from '@/components/vipbook/vipbookflow/vipbookflow'






Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'shouye',
      component: Shouye
    },
    {
      path: '/info',
      name: HelloWorld,
      component: HelloWorld
    },
    {
      path: '/crash',
      name: crash,
      component: crash
    },
    {
      path: '/datanote',
      name: datanote,
      component: datanote
    },
    {
      path: '/money',
      name: money,
      component: money
    },
    {
      path: '/find',
      name: find,
      component: find
    }, {
      path: '/register',
      name: register,
      component: register
    }, {
      path: '/vipcheck',
      name: vipcheck,
      component: vipcheck
    }, {
      path: '/operate',
      name: operate,
      component: operate
    }, {
      path: '/detailed',
      name: 'detailed',
      component: detailed
    }, {
      path: '/bank',
      name: bank,
      component: bank
    },
    {
      path: '/listcheck',
      name: listcheck,
      component: listcheck
    }, {
      path: '/vipbookdetail',
      name: vipbookdetail,
      component: vipbookdetail
    }, {
      path: '/vipbookflow',
      name: 'vipbookflow',
      component: vipbookflow
    }



  ]
})
