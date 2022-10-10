<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white">
    <!-- note: `$t` is a computed property on the Vue instance, defined by the vue-i18n plugin -->
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top border-bottom">
      <router-link to="/products" class="text-dark" v-if="user">
        <img :src="logoImg" alt="Sitecore" />
      </router-link>
      <router-link to="/" class="text-dark" v-if="!user">
        <img :src="logoImg" alt="Sitecore" />
      </router-link>
      <div class="ml-auto">
        <div v-if="user && user.photoURL">
          <router-link class="my-2 my-sm-0 p-4" to="/user">
            <img :src="user.photoURL" class="img-thumbnail profile-image" alt />
          </router-link>
          <router-link class="my-2 my-sm-0 p-4" to="/cart">
            <img
              src="https://pngimg.com/uploads/shopping_cart/shopping_cart_PNG38.png"
              width="50"
              alt="UserImage"
            />
            <span class="badge badge-danger badge-pill">{{
              $jss.store.state.cartData.length
            }}</span>
          </router-link>
          <a href="javascript:void(0)" class="p-2" @click="Logout()">
            <span>Log Out</span>
          </a>
        </div>
        <h3 v-else>Sitecore JSS ecommerce</h3>
      </div>
    </nav>
  </div>
</template>

<script>
import logo from './assets/sc_logo.svg';
import { logoutEvent } from './lib/Sitecore-cdp.js';

export default {
  name: 'Navigation',
  data() {
    return {
      contextButtonText: '',
      logoImg: logo,
      user: JSON.parse(JSON.stringify(this.$jss.store.state.userData)),
    };
  },
  methods: {
    Logout() {
      logoutEvent();
      setTimeout(() => {
         window.location.href = '/';
      },1000);     
    },
  },
};
</script>
<style>
.img-thumbnail {
  padding: 0.25rem;
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: 2.25rem;
  max-width: 100%;
  height: auto;
}
</style>
