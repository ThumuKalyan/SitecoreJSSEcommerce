<template>
  <section>
    <div class="row pt-5" v-if="isPageLoaded">
      <div class="col-lg-4">
        <div class="card mb-4">
          <div class="card-body text-center">
            <img
              :src="$jss.store.state.userData.photoURLLarge"
              alt="avatar"
              class="rounded-circle img-fluid"
              style="width: 150px"
            />
            <h5 class="my-3">{{ $jss.store.state.userData.displayName }}</h5>
            <p class="text-muted mb-1">Hoala, Bingo</p>
            <p class="text-muted mb-4">{{ $jss.store.state.userData.location }}</p>
          </div>
        </div>
      </div>
      <div class="card col-lg-8">
        <div class="card-body">
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.firstname.value }}</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $jss.store.state.userData.displayName }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.email.value }}</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $jss.store.state.userData.email }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.phone.value }}</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $jss.store.state.userData.phone }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.mobile.value }}</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $jss.store.state.userData.cell }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.address.value }}</p>
            </div>
            <div class="col-sm-9">
              <p class="text-muted mb-0">{{ $jss.store.state.userData.location }}</p>
            </div>
          </div>
          <hr />
          <div class="row">
            <div class="col-sm-3">
              <p class="mb-0">{{ fields.orderhistory.value }}</p>
            </div>
            <div class="col-sm-9">
              <router-link class="my-2 my-sm-0 p-4" to="/orderhistory"> Order History </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'User',
  props: {
    fields: {
      type: Object,
    },
  },
  data() {
    return {
      isPageLoaded: false,
    };
  },
  mounted() {
    if (!this.$jss.store.state.userData) {
      this.$router.replace({ path: '/' });
    } else {
      this.isPageLoaded = true;
    }
  },
};
</script>
