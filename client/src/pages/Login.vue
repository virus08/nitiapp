<template>
  <div class="page-header clear-filter" filter-color="navy">
    <div class="page-header-image" style="background-image: url('img/login.jpg')"></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt />
            </div>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons users_circle-08"
              placeholder="Username"
              v-model="username"
            ></fg-input>

            <fg-input
              class="no-border input-lg"
              addon-left-icon="now-ui-icons ui-1_lock-circle-open"
              placeholder="Password"
              v-model="password"
              type="password"
            ></fg-input>

            <template slot="raw-content">
              <div class="card-footer text-center">
                <a class="btn btn-primary btn-round btn-lg btn-block" @click="login">Get Started</a>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
    <main-footer></main-footer>
  </div>
</template>
<script>
import VueJwtDecode from "vue-jwt-decode";
import { Card, Button, FormGroupInput } from "@/components";
import MainFooter from "@/layout/MainFooter";
import router from "@/router";
import axios from "axios";
var myStorage = window.localStorage;
const API = window.API;
export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    MainFooter,
    [Button.name]: Button,
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    getUserData(){
       let uid = myStorage.getItem('uid');
       if(uid){
         router.push("/landing");
       }
    },
    login() {
      let data = {
        email: this.username,
        password: this.password
      }
      axios
          .post("/api/login", data)
          .then(response => {
            if (response.data.accessToken) {
              myStorage.setItem("token", response.data.accessToken);
              let obj = VueJwtDecode.decode(response.data.accessToken);
              myStorage.setItem("username", obj.email);
              myStorage.setItem("uid", obj.sub);
              router.push("/landing");
            } else {
              router.push("/Login");
            }
          })
          .catch(errors => {
            console.log(errors);
          });
      }
    },
    mounted() {
    this.getUserData();
  }
};
</script>
<style></style>
