<template>
  <div class="translate">
    <div class="fl-main" v-if="translateText == ''">
      <div class="fl-image-container"><img src="../../assets/image/change.svg"></div>
      <div class="fl-hint-title">翻译选中的文本</div>
      <div class="fl-select">
        <el-dropdown @command="handleFromCommand" placement="bottom">
            <span>
              <button class="mk-extra-button">{{fromlang.name}}</button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in langs" :command="index" :key="'lang'+item.value">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i class="el-icon-right" style="margin-right:1rem;font-size: 1.8rem;"> </i>
          <el-dropdown @command="handleToCommand" placement="bottom">
            <span>
              <button class="mk-extra-button">{{tolang.name}}</button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item,index) in langs" :command="index" :key="'lang'+item.value">{{item.name}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown> 
      </div>
      <button class="fl-button-main" @click="translate"> 翻译 </button>
    </div>
    <div class="fl-content" v-else>
      <textarea v-model="translateText" rows="22"></textarea>
      <button class="fl-button-main" @click="translate"> 翻译 </button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    editor: Object,
  },
  data() {
    return{
      langs: [],
      fromlang:{value:'zh',name:'简体中文'},
      tolang:{value:'en',name:'英文'},
      translateText:'',
    }
  },
  created() {
    this.$apiFun.translate.langs().then( res => {
      this.langs = res.data.langs;
    });
  },
  methods: {
    handleFromCommand(command) {
      console.log(this.langs[command]);
      this.fromlang = this.langs[command];
    }, 
    handleToCommand(command) {
      console.log(this.langs[command]);
      this.tolang = this.langs[command];
    },
    translate() {
      if(this.editor.getSelectionText() === '') {
        this.$message.error("未选中任何文本");
        return ;
      }
      this.$apiFun.translate.translate({
        from:this.fromlang.value,
        to:this.tolang.value,
        content:this.editor.getSelectionText(),
        loading: false
        }).then( res => {
        this.translateText = res.data;
      })
    },
  },
}
</script>

<style lang="less" scoped>
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
    height: 32rem;
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
.fl-select {
  box-sizing: border-box;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 0 2rem;
  margin-bottom: 3rem;
  button {
    padding: 1rem 6.5rem;
    background-color: transparent;
    border: .1rem solid var(--fl-color-theme);
    border-radius: 4.8rem;
    font-size: 1.8rem;
    font-weight: 600;
    color: var(--fl-color-theme);
  }
}
.fl-button-main {
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
</style>