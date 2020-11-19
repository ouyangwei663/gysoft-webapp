import Vue from 'vue'
import Router from 'vue-router'
import Shouye from '@/components/shouye/shouye'
import HelloWorld from '@/components/HelloWorld'
import HelloWorldmore from '@/components/HelloWorldmore'
import crash from '@/components/crash/crash'
import datanote from '@/components/datanote/datanote'
import money from '@/components/money/money'
import find from '@/components/find/find'
import register from '@/components/register/register'
import vipcheck from '@/components/vipperson/vipperson'
import operate from '@/components/operate/operate'
import detailed from '@/components/detailed/detailed'
import bank from '@/components/bank/bank'
import bankcheck from '@/components/bank/bankcheck'
import bankadd from '@/components/bank/bankadd/bankadd'
import bankaddco from '@/components/bank/bankadd/bankaddco'
import listcheck from '@/components/listcheck/listcheck'
import vipbookdetail from '@/components/vipbook/vipbookdetail/vipbookdetail'
import vipbookflow from '@/components/vipbook/vipbookflow/vipbookflow'
import contscard from '@/components/contscard/contscard'
import contscard_check from '@/components/contscard/contscard_check'
import contscard_info from '@/components/contscard/contscard_info'
import contscard_pay from '@/components/contscard/contscard_pay'
import chart from '@/components/chart/chart'
import chart_shop from '@/components/chart/chart_shop'
import chart_work from '@/components/chart/chart_work'
import chart_workmoney from '@/components/chart/chart_workmoney'
import chart_route from '@/components/chart/chart_route'
import worker_check from '@/components/worker/worker_check'
import worker_push from '@/components/worker/worker_push'
import worker_complete from '@/components/worker/worker_complete'
import contscard_give from '@/components/contscard/contscard_give'
import qindan from '@/components/bank/bankadd/contact'
Vue.use(Router)




export default new Router({
  routes: [{
      path: '/',
      name: 'shouye',
      component: Shouye
    },
    {
      path: '/info',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/infomore',
      name: 'HelloWorldmore',
      component: HelloWorldmore
    },
    {
      path: '/crash',
      name: 'crash',
      component: crash
    },
    {
      path: '/datanote',
      name: datanote,
      component: datanote
    },
    {
      path: '/money',
      name: "money",
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
      name: 'bank',
      component: bank
    },
    {
      path: '/listcheck',
      name: listcheck,
      component: listcheck
    }, {
      path: '/vipbookdetail',
      name: 'vipbookdetail',
      component: vipbookdetail
    }, {
      path: '/vipbookflow',
      name: 'vipbookflow',
      component: vipbookflow
    }, {
      path: '/qindan',
      name: 'qindan',
      component: qindan
    },
    {
      path: '/bankcheck',
      name: 'bankcheck',
      component: bankcheck
    },
    {
      path: '/bankadd',
      name: 'bankadd',
      component: bankadd
    },
    {
      path: '/bankaddco',
      name: 'bankaddco',
      component: bankaddco
    }, {
      path: '/chart',
      name: 'chart',
      component: chart
    }, {
      path: '/chart_shop',
      name: 'chart_shop',
      component: chart_shop
    }, {
      path: '/chart_work',
      name: 'chart_work',
      component: chart_work
    }, {
      path: '/chart_route',
      name: 'chart_route',
      component: chart_route
    }, {
      path: '/chart_workmoney',
      name: 'chart_workmoney',
      component: chart_workmoney
    },
    {
      path: '/contscard',
      name: 'contscard',
      component: contscard
    },
    {
      path: '/contscard_check',
      name: 'contscard_check',
      component: contscard_check
    }, {
      path: '/contscard_info',
      name: 'contscard_info',
      component: contscard_info
    }, {
      path: '/contscard_pay',
      name: 'contscard_pay',
      component: contscard_pay
    }, {
      path: '/contscard_give',
      name: 'contscard_give',
      component: contscard_give
    }, {
      path: '/worker_check',
      name: 'worker_check',
      component: worker_check
    }, {
      path: '/worker_push',
      name: 'worker_push',
      component: worker_push
    }, {
      path: '/worker_complete',
      name: 'worker_complete',
      component: worker_complete
    }
  ]
})
