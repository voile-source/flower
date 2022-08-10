<template>
  <div class="square">
    <div class="fl-search">
        <span class="fl-slogan">为创作者呈现</span>
        <ul class="fl-sort">
          <li @click="activeChange($event.target)" class="active">全部</li>
          <li @click="activeChange($event.target)">模板</li>
          <li @click="activeChange($event.target)">段落</li>
          <li @click="activeChange($event.target)">句子</li>
          <li @click="activeChange($event.target)">词语</li>
        </ul>
        <div class="fl-search-warp" @click="inputFocus">
          <input v-model="text" @blur="inputHidden" class="fl-search-input" type="text" @keypress.enter="search" placeholder="输入关键字搜索">
          <i class="el-icon-search" @click="search"></i>
        </div>
        <div class="fl-complete-wrap">
          <div class="fl-complete-item" v-for="item in completeList" :key="item +  Math.random()" @click="getText(item)">{{item}}</div>
        </div> 
        <div class="fl-image">
      <el-carousel trigger="click" :interval="4000" indicator-position="none" type="card" height="45vh">
        <el-carousel-item v-for="item in imageList" :key="item.id">
          <el-image fit="cover" class="fl-image-item" :src="item.url"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    </div>
    <div class="fl-main">
      <div class="fl-title" id="comment">
        推荐文章
      </div>
      <List :listData="listData"></List>
    </div>
  </div>
</template>

<script>
import {_to,_debounce} from '../../util/util'
import List from '../../components/List.vue'
export default {
  data() {
    return {
      searchData: {
        text:'',
        status:'',
        pageNum: 1,
        pageSize: 8
      },
      text:'',
      searchFlag: false,
      completeList:[],
      listData:[],
      imageList: [
        {id:'image1',url:'https://flower-write-image.oss-cn-hangzhou.aliyuncs.com/material-cover/4fa357fbc56646d9a5cd07a1c7712e4d26.png'},
        {id:'image2',url:'https://flower-write-image.oss-cn-hangzhou.aliyuncs.com/material-cover/b0894a0dffae40808f439351c2167a83pexels-evie-shaffer-11431628.jpg'},
        {id:'image3',url:'https://flower-write-image.oss-cn-hangzhou.aliyuncs.com/material-cover/71bfba64223b4e91af8cf4a89e4eaa29wallhaven-8oydyj_1920x1080.png'},
        {id:'image4',url:'https://flower-write-image.oss-cn-hangzhou.aliyuncs.com/material-cover/1a61bc1aac9e457eb325c8cf62cc7c1fwallhaven-l318qr_1920x1080.png'},
        {id:'image5',url:'https://flower-write-image.oss-cn-hangzhou.aliyuncs.com/material-cover/9abd59ca598f4898a64c121043acc84dwallhaven-o386z5_1920x1080.png'}
      ]
    }
  },
  components:{
    List,
  },
  watch: {
    text:{
      handler() {
        if(this.text == '')  {
          this.completeList = [];
          this.searchFlag = false;
          this.search();
          return;
        }
        if(this.searchFlag) {
          this.searchFlag = false;
          return ;
        }
        this.getComplete();
      }
    },
    $route: {
      handler() {
        if(this.$route.query.text != undefined) {
          this.$apiFun.material.search.search(this.$route.query.text).then(res => {
            this.listData = res.data.res;
          })
        } else {
          this.init();
        }
      }
    },
    completeList: {
      handler() {
        console.log(this.completeList.length)
        if(this.completeList.length !=0) {
          document.querySelector('.fl-complete-wrap').style.opacity = 1;
        } else {
          document.querySelector('.fl-complete-wrap').style.opacity = 0;
        }
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$apiFun.material.getList({
        keyword:this.searchData.text,
        status:this.searchData.status,
        pageNum:this.searchData.pageNum,
        pageSize:this.searchData.pageSize,
        loading: false
        }).then(res => {
          this.listData = res.data.materialList;
      });
    },
    getText(text) {
      document.querySelector('.fl-complete-wrap').style.opacity = 0;
      this.text = text;
      this.search(); 
    },  
    getComplete: _debounce(function() {
      this.$apiFun.material.search.recommed(this.text).then( res=> {
        this.completeList = res.data;
      })
    },500),
    activeChange(item) {
      let tags = document.querySelectorAll('.active');
      tags.forEach(tag => {
        tag.classList.remove('active')
      });
      item.classList.add('active')
    },
    search() {
      if(this.text == '') {
        _to('/square')
        this.init();
        return ;
      }
      this.searchFlag = true;
      document.querySelector('.fl-complete-wrap').style.opacity = 0;
      _to('/square',{text:this.text,loading:false});
      let comment = document.querySelector("#comment");
      window.scrollTo({
        top: comment.offsetTop,
        behavior: "smooth",
      });
    },
    inputFocus() {
      document.querySelector(".fl-search-input").focus();
    },
    inputHidden() {
      document.querySelector('.fl-complete-wrap').style.opacity = 0;
    }
  },
}
</script>

<style lang="less" scoped>
ul,li {
  list-style: none;
  padding: 0;
}
.square {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 5rem;
}
.fl-main {
  width: 85%;
  .fl-title {
    padding: 2rem 1rem;
    font-size: 2.2rem;
    font-weight: 600;
  }
}
 .fl-slogan {
    color: var(--fl-color-black);
    font-size: 4.2rem;
    font-weight: 600; 
    animation: fadein 1s ease;
  }
.fl-sort {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  margin: 2.2rem 0;
  li {
    margin: 0 3rem;
    font-size: 2.2rem;
    text-align: center;
    color: var(--fl-color-grey);
    cursor: pointer;
  }
  li:hover {
    color: var(--fl-color-grey-txt);
  }
  .active, .active:hover {
    color: var(--fl-color-black-option);
  }
}
.fl-search {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 7rem 0;
  background: url(https://st0.dancf.com/static/02/202112210800-f085.png);
  .fl-search-warp {
    display: flex;
    width: 30%;
    padding: 1.4rem 1.5rem 1.4rem 3rem;
    background: #fff;
    border-radius: 4.8rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    input {
      width: 100%;
      background-color: transparent;
      border: 0;
      font-size: 2rem;
    }
    i {
      box-sizing: border-box;
      padding: 1rem 3.2rem;
      border-radius: 4.8rem;
      font-size: 1.8rem;
      cursor: pointer;
    }
    i:active {
      background: var(--fl-color-grey-def);
    }
  }
}
.fl-complete-wrap {
  transition: opacity .35s ease-in-out;
  position: absolute;
  z-index: 4000;
  opacity: 0;
  top: 27rem;
  width: 31%;
  height: 32.5rem;
  overflow: hidden;
  margin: .5rem 0;
  padding: 1.2rem .8rem;
  background: white;
  border-radius: 1.6rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  .fl-complete-item {
    box-sizing: border-box;
    padding: 1rem 2rem;
    border-radius: .8rem;
    font-size: 1.6rem;
    cursor: pointer;
 }
  .fl-complete-item:hover {
    background-color: var(--fl-color-grey-def);
  } 
}
.fl-image {
  width: 90%;
  padding: 8rem 0;
  border-radius: 1.6rem;
  .fl-image-item {
    max-width: 100%;
    max-height: 100%;
    border-radius: 1.6rem;
  }
}
</style>