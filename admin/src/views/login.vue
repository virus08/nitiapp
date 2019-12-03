<template>
  <v-app id="inspire">
    <v-snackbar v-model="xerror" color="error" :timeout="3000" top>
      {{ errortext }}
      <v-btn dark text @click="xerror = false">Close</v-btn>
    </v-snackbar>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field v-model="user" label="Login" name="login" prepend-icon="person" type="text" />

                  <v-text-field
                    v-model="password"
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="login">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const API = window.api;
import VueJwtDecode from "vue-jwt-decode";
var myStorage = window.localStorage;
export default {
  props: {
    source: String
  },
  data: () => ({
    xerror: false,
    errortext: "ส่วนนี้ต้องมีการระบุตัวตนก่อนนะครับ",
    user:'',
    password:''
  }),
  methods: {
    login() {
      let data = {
        email: this.user,
        password: this.password
      }
      axios
        .post(API+"/api/login", data)
        .then(response => {
          if (response.data.accessToken) {
            myStorage.setItem("token", response.data.accessToken);
              let obj = VueJwtDecode.decode(response.data.accessToken);
              myStorage.setItem("username", obj.email);
              myStorage.setItem("uid", obj.sub);
            this.$router.replace({ name: this.$route.params.page });  
          } else {
              this.errortext = 'Login ไม่สำเร็จ'
              this.xerror = true;
            }
        })
        .catch(errors => {
          this.errortext = 'Error: Login ไม่สำเร็จ'

          // console.log(errors);
          this.xerror = true;
        });
      
    }
  },
  created() {
    this.$vuetify.theme.dark = false;
    if (!this.$route.params.page) {
      this.$route.params.page = "Home";
    } else {
      if(this.$route.params.error) this.errortext = this.$route.params.error

      this.xerror = true;
    }
  }
};
</script>