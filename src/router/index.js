import { createWebHistory, createRouter } from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import NotFound from '../views/NotFound.vue';
import TypingText from '../views/TypingText/index.vue';
import UploadFile from '../views/UploadFile/index.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'Home' },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: 'About' },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: 'Login' },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
    meta: { title: 'Sign Up' },
  },
  {
    path: '/typing-text',
    name: 'Typing-text',
    component: TypingText,
    meta: { title: 'Typing text' },
  },
  {
    path: '/upload-file',
    name: 'UploadFile',
    component: UploadFile,
    meta: { title: 'Upload File' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
