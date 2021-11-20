import { createWebHistory, createRouter } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import ChangePage from '../views/ChangePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
    meta: {
      title: 'Notes Page',
    },
    children: [
      {
        path: '/change/:id',
        name: 'Change',
        component: ChangePage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
