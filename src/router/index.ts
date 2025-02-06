import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '@/views/NotesView.vue'
import TodoView from '@/views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:name?',
      component: HomeView,
      children: [
        {
          path: 'notes',
          component: NotesView,
        },
        {
          path: 'todo',
          component: TodoView,
        },
      ],
    },
  ],
})

export default router
