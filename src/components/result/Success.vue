<template>
  <div class="success">
    <img src="../../assets/image/success.svg">
    <div>{{text}}</div>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 40rem;
    height: 20rem;
  }
</style>