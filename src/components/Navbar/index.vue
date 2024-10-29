<template>
  <nav
    id="nav"
    class="navbar navbar-expand-lg container-fluid fixed-top bg-white"
  >
    <div class="container">
      <router-link to="/">
        <img
          class="logo router-link"
          src="/src/assets/aha_mcq_logo.png"
          alt=""
        />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item mx-3">
            <router-link to="/" class="nav-link router-link">Home</router-link>
          </li>
          <li class="nav-item mx-3">
            <router-link to="/about" class="nav-link router-link"
              >About</router-link
            >
          </li>
          <li class="nav-item dropdown mx-3">
            <span
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Option
            </span>
            <ul class="dropdown-menu">
              <li>
                <router-link class="dropdown-item router-link" to="/typing-text"
                  ><i class="fa-regular fa-keyboard"></i> Type your
                  content</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item router-link" to="/upload-file"
                  ><i class="fa-regular fa-file-pdf"></i> Upload your
                  file</router-link
                >
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <router-link to="/login"
            ><span class="btn btn-outline-primary mx-2 router-link">
              Login
            </span></router-link
          >
          <router-link to="/signup"
            ><button class="btn btn-primary router-link">
              Sign up
            </button></router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  mounted() {
    // Gán sự kiện click cho các router-link
    $('.router-link').on('click', () => {
      $('#navbarSupportedContent').collapse('hide');
    });
  },
  beforeDestroy() {
    $('.router-link').off('click');
  },
};
</script>

<style scoped>
.logo {
  height: 4em;
}
#nav {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.296);
}

.nav-link,
button {
  font-weight: bolder;
}

.nav-link {
  color: rgb(67, 67, 67);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}

.nav-link:hover {
  color: #4f8ffd;
}

.active {
  font-weight: bolder;
}
</style>
