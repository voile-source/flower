<template>
  <div class="home">
    <!-- 导航栏 -->
    <nav class="fl-nav">
      <Nav></Nav>
    </nav>
    <!-- 内容 -->
    <main class="fl-main">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
  export default {
    components: {
      Nav
    },
    data() {
      return {
        
      }
    }
  }
</script>

<style lang="less" scoped>
  body {
    margin: 0;
    overflow-x: hidden;
    overflow-y: hidden;
    
    /* margin-top: -20px; */
  }
  .home {
    display: flex;
    flex-flow: column;

    height: 100%;
  }
  .home::-webkit-scrollbar {
    display:none;
    
  }
  .fl-nav {
    min-height: 9.2rem;
  }
  .fl-main {
    box-sizing: border-box;
    height: 100%;
    z-index: 1;
  }
</style>