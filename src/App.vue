<template>
  <div id="app"> 
    <router-view/>
  </div>
</template>

<script>
  import './assets/css/font.css'
  export default { 
    mounted() {
      if (localStorage.getItem('store')) {
        this.$store.replaceState(Object.assign({},this.$store.state, JSON.parse(localStorage.getItem('store'))))
      }
      // 在页面刷新时将store保存到localStorage里
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('store', JSON.stringify(this.$store.state))
      })
    }
  }
</script>

<style>
:root {
  --fl-color-red-error: #FF5733;
  --fl-color-black: #243042;
  --fl-color-black-option: #202020;
  --fl-color-grey: #A9ADB5;
  --fl-color-grey-content: #9197A0;
  --fl-color-grey-def: #DCDEE6;
  --fl-color-grey-title:#626C7A;
  --fl-color-grey-txt:#666E7B;
  --fl-color-grey-aside:#F7F8FA;
  --fl-color-grey-back:#F3F7FB;
  --fl-color-grey-light: #F9FAFB;
  --fl-color-desc: #405566;
  --fl-color-theme: #0EB0C9;
  --fl-color-theme-light: #0EB0C93f;
}
#app {
  font-family: OPPOSans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
body::-webkit-scrollbar {
    display:none;
  }
#nprogress .bar{
  z-index: 10000000 !important;
}
.zZindex {
  z-index:30000 !important;
}
.loading {
  color: #fff;
  z-index:30000 !important;
}
.loadingImg {
  background-image: url(./assets/image/logo1.png);
}
body,html {
  margin:0;
  height: 100%;
}

input {
  outline: none;
}
a {
  text-decoration: none;
}
button {
  cursor: pointer;
}

</style>
