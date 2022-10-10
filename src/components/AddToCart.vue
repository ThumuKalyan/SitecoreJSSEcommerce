<template>
  <div class="row">
    <div class="col-3">
      <label class="sr-only" for="inlineFormInputName2">{{ fieldsData.quantity.value }}</label>
      <input type="number" v-model="quantity" class="form-control mb-2 mr-sm-2" />
    </div>
    <button
      v-if="!isInCardProp"
      @click.stop="addCart({ product, quantity })"
      type="button"
      class="btn btn-primary btn-lg btn-block col-9"
    >
      {{ fieldsData.addtocart.value.text }}
    </button>
    <button
      v-else
      @click.stop="removeCart(product.id)"
      type="button"
      class="btn btn-primary btn-lg btn-block col-9"
    >
      REMOVE FROM CART
    </button>
  </div>
</template>

<script>
import { sendAddEvent } from '../lib/Sitecore-cdp.js';

export default {
  props: ['product', 'fieldsData'],
  data() {
    return {
      isInCardProp: false,
      quantity: 1,
      componentKey: 0,
    };
  },
  methods: {
    addCart(payload) {
      this.componentKey += 1;
      let cart = JSON.parse(JSON.stringify(this.$jss.store.state.cartData));
      sendAddEvent(
        'watch',
        payload.product.id,
        'INR',
        payload.quantity,
        payload.product.price * payload.quantity,
        payload.product.id,
        payload.product.name
      );
      let data = payload.product;
      data['quantity'] = payload.quantity;
      var purchaseDate = new Date();
      var formattedDate = purchaseDate.toISOString().split('T')[0];
      data['dateOfPurchase'] = formattedDate;
      cart.push(JSON.parse(JSON.stringify(data)));
      this.$jss.store.setCartData(cart);
      this.isInCart(payload.product.id);
      this.isInCardProp = true;
    },
    removeCart(id) {
      let cart = [];
      if (id) {
        for (let index = 0; index < this.$jss.store.state.cartData.length; index++) {
          const element = this.$jss.store.state.cartData[index];
          if (element.id !== id) {
            this.$jss.store.setCartData(cart);
          }
          this.isInCardProp = false;
        }
      }
      this.$jss.store.setCartData(cart);
      this.isInCardProp = false;
    },
    isInCart(id) {
      for (let index = 0; index < this.$jss.store.state.cartData.length; index++) {
        const element = this.$jss.store.state.cartData[index];
        if (element.id === id) {
          this.isInCardProp = true;
        }
      }
      this.$nextTick().then(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style></style>
