<template>
  <header>
    <Navbar></Navbar>
  </header>

  <main class="container-fluid mt-5 pt-5">
    <div class="pt-5">
      <router-view></router-view>
    </div>
  </main>

  <footer>
    <Footer></Footer>
  </footer>
</template>

<script>
import Navbar from './components/Navbar/index.vue';
import Footer from './components/Footer/index.vue';

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>
