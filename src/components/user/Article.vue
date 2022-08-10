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
      id:'',
    }
  },
  watch: {
    $route: {
      handler() {
        if(this.$route.query.id) {
          this.id = this.$route.query.id;
        } else this.id = '';
      }
    },
  },
  created() {
    this.init();
  },
  methods:{ 
    init() {
      this.$apiFun.user.materialList(this.id).then(res=> {
        this.listData = res.data.materialList;
      })
    },
  }
}
</script>

<style lang="less" scoped>

</style>