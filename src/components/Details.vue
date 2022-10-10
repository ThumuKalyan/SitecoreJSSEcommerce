<template>
  <div class="container-fluid" v-if="isLoaded">
    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <div class="card text-left shadow-md">
          <img class="card-img-top" :src="product.imageUrl" alt />
        </div>
      </div>
      <div class="col-6 text-left text-justify">
        <div class="display-3">{{ product.name }}</div>
        <p class="lead text-justify">{{ product.content }}</p>
        <div>
          <p class="h3">{{ fields.price.value }}</p>
          <p class="h2">₹{{ product.price }}</p>
        </div>
        <AddToCart
          :product="product"
          :fields-data="fields"
          v-if="user"
          :key="JSON.stringify(product)"
        />
      </div>
    </div>
    <div class="col-lg-12" v-html="fields.content.value"></div>
  </div>
</template>

<script>
import Axios from 'axios';
import AddToCart from '../components/AddToCart';

export default {
  data() {
    return {
      isInCardProp: false,
      product: null,
      isLoaded: false,
      user: null,
    };
  },
  props: {
    fields: {
      type: Object,
    },
  },
  components: { AddToCart },

  methods: {
    productDetails(pid) {
      var _this = this;
      let url =
        'https://my-json-server.typicode.com/ThumuKalyan/ecommerce-fake-jsonserver/products';
      Axios.get(url, { params: { id: pid } })
        .then((response) => {
          _this.product = JSON.parse(JSON.stringify(response.data[0]));
          _this.$jss.store.setProductsDetailsData(JSON.parse(JSON.stringify(_this.product)));
          _this.user = JSON.parse(JSON.stringify(_this.$jss.store.state.userData));
          _this.isLoaded = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
  mounted() {
    this.productDetails(this.$route.href.split('?')[1]);
  },
};
</script>

<style>
.container-fluid {
  padding: 30px;
}
.image-product {
  width: 100%;
}
.card * {
  max-height: 85vh;
}
</style>
