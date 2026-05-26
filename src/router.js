import { createRouter, createWebHistory } from 'vue-router'
import {
  force_reveal_in_element,
  schedule_reveal_animations,
  schedule_route_reveal_reset,
} from './application/reveal_scroll'
import HomePage from './pages/HomePage.vue'
import CompanyPage from './pages/CompanyPage.vue'
import CasePage from './pages/CasePage.vue'
import PlankitPage from './pages/PlankitPage.vue'
import PolicyPage from './pages/PolicyPage.vue'
import SolutionsPage from './pages/SolutionsPage.vue'

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/company', name: 'company', component: CompanyPage },
  { path: '/case', name: 'case', component: CasePage },
  { path: '/solutions', name: 'solutions', component: SolutionsPage },
  { path: '/plankit', name: 'plankit', component: PlankitPage },
  { path: '/policy', name: 'policy', component: PolicyPage },
]

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        requestAnimationFrame(() => {
          resolve({ el: to.hash, behavior: 'smooth', top: 80 })
          const hash = to.hash
          setTimeout(() => {
            force_reveal_in_element(hash)
            schedule_reveal_animations()
          }, 500)
          setTimeout(() => {
            force_reveal_in_element(hash)
            schedule_reveal_animations()
          }, 1100)
        })
      })
    }

    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.documentElement.classList.remove('reveal-ready')
  if (to.path !== '/plankit') {
    schedule_route_reveal_reset()
  }
})

