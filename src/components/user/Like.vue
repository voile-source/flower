<template>
  <div class="collect">
    <ListVue :listData="listData"></ListVue>
  </div>
</template>

<script>
import ListVue from '../List.vue';
export default {
  components: {
    ListVue
  },  
  props: {

  },
  data() {
    return {
      listData:'',
    }
  },
  created() {
    this.init();
  },
  methods:{ 
    init() {
      this.$apiFun.material.like.list().then(res=> {
        this.listData = res.data.materialList;
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>