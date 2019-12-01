<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item v-if="role==item.role" v-for="item in items" :key="item.text" :to="item.url" link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item key="logout" link to="/logout">
            <v-list-item-action>
              <v-icon>exit_to_app</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">storefront</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">{{sitename}}</span>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
const ROLE = window.role;
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: false,
    sitename: "",
    items: [],
    role: ROLE
  }),
  created() {
    this.initialize();
    this.$vuetify.theme.dark = true;
  },
  methods: {
    initialize() {
      axios
        .get("/api/site")
        .then(response => (this.sitename = response.data.name));
      axios.get("/api/items").then(response => (this.items = response.data));
    }
  }
};
</script>