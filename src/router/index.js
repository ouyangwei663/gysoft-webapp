import Vue from 'vue'
import Router from 'vue-router'
// import Shouye from '@/components/shouye/shouye'
// import HelloWorld from '@/components/HelloWorld'
// import HelloWorldmore from '@/components/HelloWorldmore'
// import crash from '@/components/crash/crash'
// import datanote from '@/components/datanote/datanote'
// import money from '@/components/money/money'
// import find from '@/components/find/find'
// import register from '@/components/register/register'
// import vipcheck from '@/components/vipperson/vipperson'
// import operate from '@/components/operate/operate'
// import detailed from '@/components/detailed/detailed'
// import bank from '@/components/bank/bank'
// import bankcheck from '@/components/bank/bankcheck'
// import bankadd from '@/components/bank/bankadd/bankadd'
// import bankaddco from '@/components/bank/bankadd/bankaddco'
// import listcheck from '@/components/listcheck/listcheck'
// import vipbookdetail from '@/components/vipbook/vipbookdetail/vipbookdetail'
// import vipbookflow from '@/components/vipbook/vipbookflow/vipbookflow'
// import contscard from '@/components/contscard/contscard'
// import contscard_check from '@/components/contscard/contscard_check'
// import contscard_info from '@/components/contscard/contscard_info'
// import contscard_pay from '@/components/contscard/contscard_pay'
// import chart from '@/components/chart/chart'
// import chart_shop from '@/components/chart/chart_shop'
// import chart_work from '@/components/chart/chart_work'
// import chart_workmoney from '@/components/chart/chart_workmoney'
// import chart_route from '@/components/chart/chart_route'
// import worker_check from '@/components/worker/worker_check'
// import worker_push from '@/components/worker/worker_push'
// import worker_complete from '@/components/worker/worker_complete'
// import worker_info from '@/components/worker/work_info'
// import contscard_give from '@/components/contscard/contscard_give'
// import jug from '@/components/jug/jug'
// import qindan from '@/components/bank/bankadd/contact'
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'shouye',
      component: () => import('@/components/shouye/shouye')
    },
    {
      path: '/info',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld')
    }, {
      path: '/infomore',
      name: 'HelloWorldmore',
      component: () => import('@/components/HelloWorldmore')
    },
    {
      path: '/crash',
      name: 'crash',
      component: () => import('@/components/crash/crash')
    },
    {
      path: '/datanote',
      name: 'datanote',
      component: () => import('@/components/datanote/datanote')
    },
    {
      path: '/money',
      name: "money",
      component: () => import('@/components/money/money')
    },
    {
      path: '/find',
      name: find,
      component: () => import('@/components/find/find')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/components/register/register')
    }, 
    {
      path: '/vipcheck',
      name: 'vipcheck',
      component: () => import('@/components/vipperson/vipperson')
    },
     {
      path: '/operate',
      name: 'operate',
      component: () => import('@/components/operate/operate')
    },
    {
      path: '/detailed',
      name: 'detailed',
      component: () => import('@/components/detailed/detailed')
    }, {
      path: '/bank',
      name: 'bank',
      component: () => import('@/components/bank/bank')
    },
    {
      path: '/listcheck',
      name: 'listcheck',
      component: () => import('@/components/listcheck/listcheck')
    },
    {
      path: '/vipbookdetail',
      name: 'vipbookdetail',
      component: () => import('@/components/vipbook/vipbookdetail/vipbookdetail')
    },
    {
      path: '/vipbookflow',
      name: 'vipbookflow',
      component: () => import('@/components/vipbook/vipbookflow/vipbookflow')
    }, {
      path: '/qindan',
      name: 'qindan',
      component: () => import('@/components/bank/bankadd/contact')
    },
    {
      path: '/bankcheck',
      name: 'bankcheck',
      component: () => import('@/components/bank/bankcheck')
    },
    {
      path: '/bankadd',
      name: 'bankadd',
      component: () => import('@/components/bank/bankadd/bankadd')
    },
    {
      path: '/bankaddco',
      name: 'bankaddco',
      component: () => import('@/components/bank/bankadd/bankaddco')
    }, {
      path: '/chart',
      name: 'chart',
      component: () => import('@/components/chart/chart')
    }, {
      path: '/chart_shop',
      name: 'chart_shop',
      component: () => import('@/components/chart/chart_shop')
    }, {
      path: '/chart_work',
      name: 'chart_work',
      component: () => import('@/components/chart/chart_work')
    }, {
      path: '/chart_route',
      name: 'chart_route',
      component: () => import('@/components/chart/chart_route')
    }, {
      path: '/chart_workmoney',
      name: 'chart_workmoney',
      component: () => import('@/components/chart/chart_workmoney')
    },
    {
      path: '/contscard',
      name: 'contscard',
      component: () => import('@/components/contscard/contscard')
    },
    {
      path: '/contscard_check',
      name: 'contscard_check',
      component: () => import('@/components/contscard/contscard_check')
    }, {
      path: '/contscard_info',
      name: 'contscard_info',
      component: () => import('@/components/contscard/contscard_info')
    }, {
      path: '/contscard_pay',
      name: 'contscard_pay',
      component: () => import('@/components/contscard/contscard_pay')
    }, {
      path: '/contscard_give',
      name: 'contscard_give',
      component: () => import('@/components/contscard/contscard_give')
    }, {
      path: '/worker_check',
      name: 'worker_check',
      component: () => import('@/components/worker/worker_check')
    }, {
      path: '/worker_push',
      name: 'worker_push',
      component: () => import('@/components/worker/worker_push')
    }, {
      path: '/worker_complete',
      name: 'worker_complete',
      component: () => import('@/components/worker/worker_complete')
    },
    {
      path: '/worker_info',
      name: 'worker_info',
      component: () => import('@/components/worker/work_info')
      // '@/components/worker/work_info'
    }, {
      path: '/jug',
      name: 'jug',
      component: () => import('@/components/jug/jug')
    }
  ]
})
