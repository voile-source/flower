<template>
  <div class="check">
    <div class="fl-none" v-if="errorNum==0">
      <div class="fl-image-container"><img src="../../assets/image/success.svg"></div>
      <div class="fl-hint-title">检查完毕，没有发现问题</div>
    </div>
    <div class="fl-content" v-else> 
      <div class="fl-image-container"><img src="../../assets/image/error.svg"></div>
      <div class="fl-hint-title">共发现{{errorNum}}处敏感词</div>
      <button @click="clear"> 立即清除 </button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    editor: Object,
    set: Function
  },
  data() {
    return{
      errorNum: 0,
      errorData: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.errorNum = 0;
      // this.$apiFun.file.match(this.editor.getText()).then( res => {
      // let data = res.data.matchWords;
      // this.errorData = data;
      // Object.keys(data).forEach((key)=> {
      //   this.errorNum += data[key];
      //   })
      // })
    },
    clear() {
      Object.keys(this.errorData).forEach((key)=> {
        for(let i=0;i<this.errorData[key];i++) {
          this.set(key);
        }
      });
      this.$message({message:'清除成功',type:'success'})
    }
  }
  
}
</script>

<style lang="less" scoped>
.fl-none,.fl-content {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 12rem 0;
  
}

button {
    margin: 0 auto;
    padding: 1rem 12rem;
    background-color: var(--fl-color-theme);
    border: none;
    border-radius: 4.8rem;
    font-size: 2.2rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
  }

.fl-hint-title {
  margin: 3rem 0;
  font-size: 3.2rem;
  font-weight: 600;
  font-family: Microsoft Yahei;
  text-align: center;
  }
  .fl-image-container {
    width: 100%;
    height: 35rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
</style>