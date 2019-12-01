<template>
</template>
<script>
var mystorage = window.localStorage;
export default {
  props: {
    source: String
  },
  created() {
    mystorage.clear();
    this.$router.replace({ name:'Home' });
  },
}
</script>
