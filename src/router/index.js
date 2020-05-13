import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ReviewSoal from '../components/Soal/ReviewSoal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    props: true
  },
  {
    path: '/',
    component: Dashboard,
    meta: { requiresAuth: true },    
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: '/siswa',
        name: 'siswa',
        component: () => import('../views/Siswa.vue')
      },
      {
        path: '/jurusan',
        name: 'jurusan',
        component: () => import('../views/Jurusan.vue')
      },
      {
        path: '/kelas',
        name: 'kelas',
        component: () => import('../views/Kelas.vue')
      },
      {
        path: '/ruang',
        name: 'ruang',
        component: () => import('../views/Ruang.vue')
      },
      {
        path: '/mapel',
        name: 'mapel',
        component: () => import('../views/Mapel.vue')
      },
      {
        path: '/soal',
        name: 'soal',
        component: () => import('../views/Soal.vue')
      },
      {
        path: '/soal-mapel/:id/:name',
        name: 'soal-mapel',
        component: () => import('../components/Soal/SoalMapel.vue'),
        props: true
      },
      {
        path: '/tambah-soal/:id/:name',
        name: 'tambah-soal',
        component: () => import('../components/Soal/SoalMapel/TambahSoalMapel.vue'),
        props: true
      },
      {
        path: '/edit-soal/:idSoal/:idMapel',
        name: 'edit-soal',
        component: () => import('../components/Soal/SoalMapel/EditSoalMapel.vue'),
        props: true
      },
      {
        path: '/tes',
        name: 'tes',
        component: () => import('../views/Tes.vue')
      },
      {
        path: '/profil',
        name: 'profil',
        component: () => import('../views/Profil.vue')
      },
      {
        path: '/nilai',
        component: () => import('../views/Assessment.vue'),
        children: [
          {
            path: '/nilai',
            component: () => import('../components/Assessment/RekapitulasiNilai/RekapitulasiNilai.vue'),
            name: 'nilai'
          },
          {
            path: '/peringkat',
            component: () => import('../components/Assessment/Peringkat/Peringkat.vue'),
            name: 'peringkat'
          }
        ]
      }      
    ]
  },
  {
    path: '/review/:id/:name',
    name: 'review',
    component: ReviewSoal,
    props: true
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const isLoggedIn = window.localStorage.getItem('token_sekolah')

  if (requiresAuth && !isLoggedIn){ 
    next({ name: 'login' })
  }else if(isLoggedIn && to.name === 'login') {
    next({ name: 'home' })
  }else if (requiresAuth && isLoggedIn) {
    next()
  }else {
    next()
  }
})

export default router
