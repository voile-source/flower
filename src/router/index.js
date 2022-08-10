import NProgress from 'nprogress' // 引入nprogress插件
import 'nprogress/nprogress.css'  // 这个nprogress样式必须引入
import {Message} from 'element-ui'

const Home = r => require.ensure([],() => r(require('../views/Home.vue')), 'Home')
const Edit = r => require.ensure([],() => r(require('../views/content/Edit.vue')),'Edit')
const Index = r => require.ensure([],() => r(require('../views/Index.vue')), 'Index')
const Login = r => require.ensure([],() => r(require('../views/user/Login.vue')), 'Login')
const User = r => require.ensure([],() => r(require('../views/user/User.vue')), 'User')
const Setting = r => require.ensure([],() => r(require('../views/user/Setting.vue')), 'Setting')
const Manage = r => require.ensure([],() => r(require('../views/content/Manage.vue')), 'Manage')
const Workspace = r => require.ensure([],() => r(require('../views/content/Workspace.vue')), 'Workspace')
const Recent = r => require.ensure([],() => r(require('../views/content/Recent.vue')), 'Recent')
const Recycle = r => require.ensure([], () => r(require('../views/content/Recycle.vue')), 'Recycle')
const ArticleList = r => require.ensure([], () => r(require('../views/content/ArticleList.vue')), 'ArticleList')
const MaterialList = r => require.ensure([],() => r(require('../views/content/MaterialList.vue')), 'MaterialList')
const Square = r => require.ensure([],() => r(require('../views/show/Square.vue')), 'Squre')
const Article = r => require.ensure([],() => r(require('../views/show/Article.vue')), 'Article')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '/index',
        name: 'index',
        component: Index
      },
      {
        path: '/user',
        name: 'user',
        component: User
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting
      },
      {
        path: '/square',
        name: 'square',
        component: Square
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      },
    ]
  },
  {
    path: '/manage',
    name: '/manage',
    component: Manage,
    children: [
      {
        path: '/workspace',
        name: 'workspace',
        component: Workspace
      },
      {
        path: '/recent',
        name: 'recent',
        component: Recent
      },
      {
        path: '/recycle',
        name: 'recycle',
        component: Recycle
      },
      {
        path: '/articleList',
        name: 'articleList',
        component: ArticleList
      },
      {
        path: '/materialList',
        name: 'materialList',
        component: MaterialList
      },
      {
        path: '/recycle',
        name: 'recycle',
        component: Recycle
      }
    ]
  },
  {
    path: '/edit',
    name: 'edit',
    component: Edit
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next('/index')
  }
  else if(to.path !='/index' && to.path !='/square' && to.path !='/article' && to.path !='/login') {
    if(localStorage.getItem('token') == null) {
      Message.error('请先登录');
      next('/login?type=login&by=code')
    }else {
      NProgress.start()
      next()
    }
  }else {
    NProgress.start()
    next()
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
