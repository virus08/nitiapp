<template>
  <v-app id="inspire">
    <router-view name="header" />
    <v-content>
      <v-container fluid fill-height>
        <v-layout child-flex>
          <router-view />
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
window.api = "https://fbackend.azurewebsites.net";
window.role = "admin"
export default {
  name: "App",
  data: () => ({
    //
  }),
  created() {}
};
</script>
