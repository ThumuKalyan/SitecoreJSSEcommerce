<template v-if="isPageLoaded">
  <div v-if="orderHistoryData">
    <sc-text :field="fields.heading" />
    <div class="container mt-5">
      <div class="d-flex justify-content-center row">
        <div class="col-md-10">
          <div class="rounded">
            <div class="table-responsive table-borderless" v-if="!isEmpty">
              <table class="table">
                <thead>
                  <tr>
                    <th>{{ fields.Order.value }}</th>
                    <th>{{ fields.ProductImage.value }}</th>
                    <th>{{ fields.ProductName.value }}</th>
                    <th>{{ fields.Quantity.value }}</th>
                    <th>{{ fields.Total.value }}</th>
                    <th>{{ fields.PurchaseDate.value }}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody class="table-body">
                  <template v-for="(items, index) in orderHistoryData" :key="index">
                    <template v-for="(productItems, sindex) in items" :key="sindex">
                      <template v-for="(itemName, tindex) in productItems" :key="tindex">
                        <tr class="cell-1">
                          <td>{{ Math.random().toString(36) }}</td>
                          <td><img :src="itemName.imageUrl" width="60" height="60" /></td>
                          <td>{{ itemName.name }}</td>
                          <td>{{ itemName.quantity }}</td>
                          <td>{{ itemName.quantity * itemName.price }}₹</td>
                          <td>{{ itemName.dateOfPurchase }}</td>
                        </tr>
                      </template>
                    </template>
                  </template>
                </tbody>
              </table>
            </div>
            <div v-else>
              <h1>{{ fields.purchasHistory.value }}</h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-12" v-html="fields.disclaimer.value"></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { getDatabase, ref as refi, get, child } from 'firebase/database';

export default {
  name: 'OrderHistory',
  setup() {
    let orderHistoryData = ref({});
    let isPageLoaded = ref(false);
    let isEmpty = ref(true);
    return {
      orderHistoryData,
      isPageLoaded,
      isEmpty,
    };
  },
  props: {
    fields: {
      type: Object,
      default: () => ({}),
    },
  },
  created() {
    const db = getDatabase();
    const dbref = refi(db);
    const userId = this.$jss.store.state.userData.seed;
    get(child(dbref, 'PurchaseHistory/' + userId)).then((snapshot) => {
      if (snapshot.exists()) {
        var snapData = snapshot.val();
        var sampleData = { ...snapData };
        setTimeout(() => {
          this.orderHistoryData = JSON.parse(JSON.stringify(sampleData));
          this.isPageLoaded = true;
          if (this.orderHistoryData) {
            this.isEmpty = false;
          }
        }, 10);
      }
    });
  },
};
</script>
<style scoped>
.cell-1 {
  border-collapse: separate;
  border-spacing: 0 4em;
  background: #fff;
  border-bottom: 5px solid transparent;
  /*background-color: gold;*/
  background-clip: padding-box;
}

thead {
  background: #dddcdc;
}

.toggle-btn {
  width: 40px;
  height: 21px;
  background: grey;
  border-radius: 50px;
  padding: 3px;
  cursor: pointer;
  -webkit-transition: all 0.3s 0.1s ease-in-out;
  -moz-transition: all 0.3s 0.1s ease-in-out;
  -o-transition: all 0.3s 0.1s ease-in-out;
  transition: all 0.3s 0.1s ease-in-out;
}

.toggle-btn > .inner-circle {
  width: 15px;
  height: 15px;
  background: #fff;
  border-radius: 50%;
  -webkit-transition: all 0.3s 0.1s ease-in-out;
  -moz-transition: all 0.3s 0.1s ease-in-out;
  -o-transition: all 0.3s 0.1s ease-in-out;
  transition: all 0.3s 0.1s ease-in-out;
}

.toggle-btn.active {
  background: blue !important;
}

.toggle-btn.active > .inner-circle {
  margin-left: 19px;
}
</style>
