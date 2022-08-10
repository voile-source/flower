<template>
  <div class="digest">
    <div class="fl-main" v-if="article.digest == ''">
      <div class="fl-image-container"><img src="../../assets/image/wait.svg"></div>
      <div class="fl-hint-title">点击按钮，生成摘要</div>
      <button @click="create"> 生成摘要 </button>
    </div>
    <div class="fl-content" v-else>
      <textarea rows="22" v-model="article.digest" @blur="save"></textarea>
      <button @click="create"> 生成摘要 </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    article: Object,
    create: Function,
    save: Function
  },
  data() {
    return{

    }
  }
}
</script>

<style lang="less" scoped>
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
.fl-main{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10rem 0;

  
  img {
    width: 100%;
    height: 100%;
  }
  .fl-image-container {
    width: 100%;
    height: 35rem;
  }
  .fl-hint-title {
    width: 100%;
    margin: 3rem 0;
    font-size: 3.2rem;
    font-weight: 600;
    font-family: Microsoft Yahei;
    text-align: center;
  }
}
.fl-content {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  padding: 3rem 0;
  textarea {
    width: 42rem;
    border: none;
    font-size: 2rem;
    font-family: OPPOSans;
    outline: none;
    resize: none;
  }
}
</style>