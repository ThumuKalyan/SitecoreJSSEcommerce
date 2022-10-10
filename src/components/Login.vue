<template>
  <div>
    <div class="container" style="padding-top: 10%">
      <div class="row d-flex justify-content-center">
        <div class="col-5 text-left login-form-container">
          <div class="d-flex justify-content-center">
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
              width="150"
              alt=""
            />
          </div>
          <div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <small id="emailHelp" class="form-text text-muted"
                >We'll never share your email with anyone else.</small
              >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button
              @click="login()"
              type="submit"
              :disabled="isDisabled"
              class="btn btn-primary btn-block"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
import { loginEvent } from '../lib/Sitecore-cdp.js';

export default {
  name: 'Login',
  data() {
    return {
      isDisabled: false,
    };
  },
  mounted() {
    this.$jss.store.setCartData([]);
    this.$jss.store.setProductsData({});
    this.$jss.store.setProductsDetailsData([]);
    this.$jss.store.setUserData(null);
  },
  methods: {
    login() {
      this.isDisabled = true;
      var _this = this;
      let url = 'https://randomuser.me/api/?seed=foobar';
      Axios.get(url)
        .then(function (response) {
          let userData = {
            displayName: response.data.results[0].name.first,
            email: response.data.results[0].email,
            photoURL: response.data.results[0].picture.thumbnail,
            photoURLLarge: response.data.results[0].picture.large,
            uid: response.data.results[0].login.uuid,
            cell: response.data.results[0].cell,
            phone: response.data.results[0].phone,
            seed: response.data.info.seed,
            location:
              response.data.results[0].location.city +
              ' ' +
              response.data.results[0].location.state +
              ' ' +
              response.data.results[0].location.country,
          };
          loginEvent();
          _this.$jss.store.setUserData(userData);

          _this.$router.replace({ path: '/products' });
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  },
};
</script>

<style>
.form-control {
  border-radius: 0%;
  height: 50px;
}
.login-form-container {
  padding: 20px;
  box-shadow: 0px 2px 5px 2px #888888;
}
.btn {
  border-radius: 0%;
  font-weight: bold;
  background: teal;
  border: teal;
}
.btn:hover {
  background: #00b4b4;
}
.btn:focus {
  background: teal;
}
</style>
