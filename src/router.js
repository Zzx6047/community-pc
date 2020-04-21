import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
const Login = () => import(/* webpackChunkName: 'login' */ './views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ './views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */ './views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'index' */ './views/channels/Index.vue')
const Template1 = () => import(/* webpackChunkName: 'template1' */ './views/channels/Template1.vue')
const User = () => import(/* webpackChunkName: 'user' */ './views/User.vue')
const Center = () => import(/* webpackChunkName: 'center' */ './views/Center.vue')
const UserCenter = () => import(/* webpackChunkName: 'usercenter' */ './components/user/Center.vue')
const Settings = () => import(/* webpackChunkName: 'Settings' */ './components/user/Settings.vue')
const Posts = () => import(/* webpackChunkName: 'Settings' */ './components/user/Posts.vue')
const Msg = () => import(/* webpackChunkName: 'Settings' */ './components/user/Msg.vue')
const Others = () => import(/* webpackChunkName: 'Settings' */ './components/user/Others.vue')

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'layui-this',
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'index',
          component: Index
        },
        {
          path: '/index/:catalog',
          name: 'catalog',
          component: Template1
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/reg',
      name: 'reg',
      component: Reg,
      beforeEnter: (to, from, next) => {
        if (from.name === 'login') {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      path: '/forget',
      name: 'forget',
      component: Forget
    },
    {
      path: '/user/:uid',
      name: 'home',
      props: true,
      component: User
    },
    {
      path: '/center',
      component: Center,
      linkActiveClass: 'layui-this',
      children: [
        {
          path: '',
          name: 'center',
          component: UserCenter
        },
        {
          path: 'set',
          name: 'set',
          component: Settings
        },
        {
          path: 'posts',
          name: 'posts',
          component: Posts
        },
        {
          path: 'msg',
          name: 'msg',
          component: Msg
        },
        {
          path: 'others',
          name: 'others',
          component: Others
        }
      ]
    }
  ]
})
