<template>
  <div class="container" style="padding: 30px">
    <div class="row d-flex justify-content-center">
      <div class="list-group col-8">
        <router-link
          v-for="item in cart"
          :key="item.id"
          :to="`/details?` + item.id"
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <img :src="item.imageUrl" alt height="60" width="60" />
          <p class="h4">{{ item.name }}</p>
          <div class="row">
            <div class="mr-2">
              <p>Unique Price</p>
              <p>${{ item.price }}</p>
            </div>
            <div class="mr-2">
              <p>Total Price</p>
              <p>${{ item.price * item.quantity }}</p>
            </div>
            <div>
              <p>Quantity</p>
              <p>{{ item.quantity }}</p>
            </div>
          </div>
        </router-link>
        <div
          class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
        >
          <p class="h4">Total</p>
          <div>
            <p>Total Price</p>
            <p>${{ totalPrice }}</p>
          </div>
        </div>
        <button
          :disabled="isDisabled"
          @click="checkout()"
          type="button"
          class="btn btn-primary btn-lg btn-block mt-4"
        >
          Checkout
        </button>
      </div>
      <div class="col-lg-12" v-html="fields.disclaimer.value"></div>
    </div>
  </div>
</template>

<script>
import { getDatabase, ref, push } from 'firebase/database';
import { sendConfirmEvent, sentCheckoutEvent } from '../lib/Sitecore-cdp.js';

export default {
  name: 'Cart',
  props: {
    fields: {
      type: Object,
    },
  },
  data() {
    return {
      totalPrice: 0,
      isDisabled: false,
      user: JSON.parse(JSON.stringify(this.$jss.store.state.userData)),
      cart: JSON.parse(JSON.stringify(this.$jss.store.state.cartData)),
    };
  },
  methods: {
    calcPrice() {
      if (this.user) {
        this.cart.forEach((element) => {
          this.totalPrice += element.price * element.quantity;
        });
      } else {
        this.$router.replace({ path: '/products' });
      }
    },
    checkout() {
      sendConfirmEvent(this.$jss.store.state.cartData);
        sentCheckoutEvent();
      const vm = this;
      setTimeout(() => {
        this.insertIntoDb();        
        this.$jss.store.setCartData([]);
        alert('Purchase successful!');
        vm.$router.push('/products');
      }, 2000);
    },
    insertIntoDb() {
      const db = getDatabase();
      const values = this.$jss.store.state.userData.seed;
      push(ref(db, 'PurchaseHistory/' + values), {
        product: JSON.parse(JSON.stringify(this.$jss.store.state.cartData)),
      });
    },
  },
  mounted() {
    this.calcPrice();
    this.isDisabled = this.$jss.store.state.cartData.length === 0;
  },
};
</script>

<style></style>
