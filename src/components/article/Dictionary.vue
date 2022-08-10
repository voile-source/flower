<template>
  <div class="dictionary">
    <div style="display:flex;justify-content:center;width: 100%;height:5rem">
      <input v-model="searchText"  @keypress.enter="searchDictionary" placeholder="请输入要查询的词语（Enter键确认）">
    </div><div class="fl-main" v-if="dirctionaryData == ''">
      <div class="fl-image-container"><img src="../../assets/image/search.svg"></div>
      <div class="fl-hint-title">按下Enter键进行查询</div>
    </div>
    <div class="fl-content" v-else>
     <div class="mk-extra-content" v-show="dirctionaryData != ''">
       <div class="fl-dirctionary-container">
          <div class="fl-dirctionary-basic">
            <div class="fl-dirctionary-word">{{dirctionaryData.word}}</div>
            <div class="fl-dirctionary-inform">
              <div class="fl-dirctionary-pinyin">拼音:{{dirctionaryData.pinyin}}</div>
              <div class="fl-dirctionary-pinyin">笔画:{{dirctionaryData.strokes}}</div>
              <div class="fl-dirctionary-pinyin">部首:{{dirctionaryData.radicals}}</div>
            </div>
          </div>
          <div class="fl-dirctionary-explanation"><span style="font-weight:600">释义:</span>{{dirctionaryData.explanation}}</div>
        </div>
      </div>
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
      searchText:'',
      dirctionaryData:''
    }
  },
  watch: {
    searchText: {
      handler() {
        if(this.searchText == '') {
          setTimeout(()=>this.dirctionaryData = '',250)
        }
      }
    }
  },
  methods: {
    searchDictionary() {
      this.$apiFun.search.dictionary(this.searchText).then( res => {
        this.dirctionaryData = res.data;
      })
    }
  },
}
</script>

<style lang="less" scoped>
input {
  width: 38rem;
  height: 4.7rem;
  padding: 0 0 0 3rem;
  border: .1rem solid var(--fl-color-theme);
  border-radius: 4.8rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--fl-color-gery-content);
}
.dictionary {
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 5rem 0;
}
.fl-main{
  display: flex;
  flex-flow: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2.5rem 0 10rem 0;
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
  textarea {
    width: 42rem;
    border: none;
    font-size: 2rem;
    font-family: OPPOSans;
    outline: none;
    resize: none;
  }
}

.fl-dirctionary-container{
  box-sizing: border-box;
  padding: 2.5rem 5.5rem;
  background: #fff;
  font-size: 1.8rem;
  color: var(--fl-color-grey-txt);
}
.fl-dirctionary-basic {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}
.fl-dirctionary-word {
  padding: 1rem;
  font-size: 6.5rem;
  font-family: 楷体;
  color: var(--fl-color-black);
  background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTS0yIDQwaDgyTTQwLTJ2ODIiIHN0cm9rZS1kYXNoYXJyYXk9IjQsNCIgc3Ryb2tlPSIjNjY2IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTEgMWg3OHY3OEgxeiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2U9IiMxMTEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=) no-repeat;
  background-size: contain;
  background-position: center;
}
.fl-dirctionary-inform{ 
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  margin-left: 4.2rem;
  font-size: 2rem;
  font-weight: 600;
}
.fl-dirctionary-explanation {
  margin-top: 2rem;
  padding: .5rem;
}
</style>