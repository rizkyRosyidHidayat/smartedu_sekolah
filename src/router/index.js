import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ReviewSoal from '../components/Soal/ReviewSoal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login/:user',
    name: 'login',
    component: () => import('../views/Login.vue'),
    props: true
  },
  {
    path: '/',
    component: Dashboard,
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
        path: '/soal-mapel',
        name: 'soal-mapel',
        component: () => import('../components/Soal/SoalMapel.vue')
      },
      {
        path: '/tambah-soal',
        name: 'tambah-soal',
        component: () => import('../components/Soal/SoalMapel/TambahSoalMapel.vue')
      },
      {
        path: '/tes',
        name: 'tes',
        component: () => import('../views/Tes.vue')
      }      
    ]
  },
  {
    path: '/review',
    name: 'review',
    component: ReviewSoal
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
