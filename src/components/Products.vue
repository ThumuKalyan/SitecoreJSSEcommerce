<template>
  <div style="padding: 25px">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <h1>{{ fields.heading.value }}</h1>
          <p>{{ fields.content.value }}</p>
        </div>
        <div class="col-md-4" v-for="product in products" :key="product.id">
          <ProductCard :product="product" />
        </div>
        <div class="col-lg-12" v-html="fields.disclaimer.value"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import ProductCard from '../components/ProductCard';
export default {
  data() {
    return {
      products: JSON.parse(JSON.stringify(this.$jss.store.state.productData)),
    };
  },
  props: {
    fields: {
      type: Object,
    },
  },
  components: { ProductCard },
  mounted() {
    this.getProducts();
  },
  methods: {
    getProducts() {
      if (JSON.parse(JSON.stringify(this.$jss.store.state.productData))) {
        var _this = this;
        let url =
          'https://my-json-server.typicode.com/ThumuKalyan/ecommerce-fake-jsonserver/products';
        Axios.get(url)
          .then((response) => {
            this.products = response.data;
            _this.$jss.store.setProductsData(this.products);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>

<style></style>
