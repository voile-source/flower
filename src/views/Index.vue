<template>
  <div class="index">
    <div class="fl-header-container">
      <div class="fl-header">
        <div class="fl-slogan-container">
          <span class="fl-slogan">智能协助，即时创作</span>
          <span class="fl-slogan-desc">可根据文章内容即时生成文章标题和摘要，为专注内容的创作者设计。</span>
          <div class="fl-register-container" v-if="$store.state.isLogin == false">
            <i class="el-icon-mobile-phone"></i>
            <input v-model="$store.state.register.phone"  maxlength="11" placeholder="输入手机号注册">
            <button @click="to('/login',{type:'register'})">立即注册</button>
          </div>
          <div v-else class="nav-button nav-user" @click="to('/workspace')"><img :src="$store.state.user.avatar"><span>进入工作台</span></div>
        </div>
        <div class="fl-show"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { _debounce, _throttle, _to } from '@/util/util'

  export default {
    data() {
      return {
        roll: 0,
        count:0
      }
    },
    created() {
      //给鼠标滚轮添加监听事件
      window.addEventListener('mousewheel', this.handleScroll, true)||window.addEventListener("DOMMouseScroll",this.handleScroll,false)
    },
    beforeDestroy() {
      // 移除事件监听
      window.removeEventListener('mousewheel',this.handleScroll,true)
    },
    methods: {
      /**
       * 滑动滚轮事件
       */
      handleScroll: _debounce(function(e){
        let direction = e.deltaY > 0 ? 'down' : 'up'
        if(direction === 'down') {
          document.querySelector(".fl-slogan-container").classList.add("fl-hidden");
          this.roll++;
        } else {
          if(this.roll)this.roll--;
          else return;
          if(document.body.scrollTop == 0) {
            this.roll = 0;
            document.querySelector(".fl-slogan-container").classList.add("fl-display")
            setTimeout(()=> {
              document.querySelector(".fl-slogan-container").classList.remove("fl-hidden")
            },300)
          }
        }
      }, 100),
      to(url,params) { 
        _to(url,params)
      },
      addCount() {
        this.count++;
      }
    },
  }
</script>

<style lang="less" scoped>
  // 组件样式
  //动画
  
  .index::-webkit-scrollbar {
    display:none;
  }
  .fl-display {
    animation: fadedown .75s ease both;
  }
  .fl-hidden {
    animation: fadeout .75s ease  both;
  }
  // 布局样式
  .fl-header-container {
    box-sizing: border-box; 
    padding:.6rem 2rem;
    position: relative;
    opacity: 1;
    transition: opacity .75s ease-in-out;
  }
  .fl-slogan-container {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    transition: height .75 ease;
  }
  .fl-show {
    background-color: #fff;
    background-image: url(https://dd-static.jd.com/ddimg/jfs/t1/8973/19/17643/17657/62c8ed69E542bddaa/3e9d7c52954ceecf.png);
    background-size: fit;
    background-repeat: no-repeat;
    background-position: center top;
    height: 70vh;
    width: 60%;
    margin-top: 12rem;
    border-radius: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 4px rgba(0, 0, 0, .04);
    animation: fadein 1s .6s ease both;  
  }
  // 属性样式
  .fl-header {
    box-sizing: border-box;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 100vh-12rem;
    width: 100%;
    border-radius: 1.2rem;
    background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    padding-top: 8rem;
  }
  .fl-slogan {
    color: var(--fl-color-black);
    font-size: 4.8rem;
    font-weight: 600; 
    animation: fadein 1s ease;
  }
  .fl-slogan-desc {
    padding: 1.5rem 0 3.5rem 0;
    color: var(--fl-color-desc);
    font-size: 1.6rem;
    opacity: 0;
    animation: fadein 1s .35s ease both;    
  }
  .fl-register-container {
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50rem;
    padding: 1rem 1.6rem;
    background-color: #fff;
    border-radius: 1rem;
    margin-bottom: 12rem;
    opacity: 0;
    animation: fadein 1s .5s ease both; 
    i {
      color: var(--fl-color-grey);
      font-size: 2.8rem;
    }
    input {
      box-sizing: border-box;
      width: 80%;
      height: 100%;
      padding: 1.2rem .8rem;
      border:0;
      font-size: 1.8rem;
    }
    button {
      width: 50%;
      height: 100%;
      border: 0;
      border-radius: .8rem;
      background: var(--fl-color-theme);
      color: #fff;
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
.nav-user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-weight: 600;
    color: var(--fl-color-theme);
    img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      object-fit: cover;
      margin-right: .5rem;
    }
  }
.nav-button {
    border: 0;
    background: white;
    margin-top: 5rem;
    margin-bottom: 10rem;
    padding: 1.5rem 5.2rem;
    border-radius: .8rem;
    box-shadow: rgba(0,0,0,0.08) 0px 4px 6px 0px,rgba(0,0,0,0.05) 0px 0px 0px 1px;
    font-size: 2.2rem;
    cursor: pointer;
  }

 @keyframes fadein {
    0% {
      opacity: 0;
      margin-top: 4rem;
    }
    100% {
      opacity: 1;
      margin-top: 0rem;
    }
  }
  @keyframes fadeout {
    0% {
      opacity: 1;
      height: 100%;
      margin-top: 0;
    }
    60% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      height: 60rem;
      margin-top: -65rem;
    }
  }
  @keyframes fadedown {
    0% {
      margin-top: -10rem;
      opacity: 0;
    }
    100% {
      margin-top: 0;
      opacity: 1;
    }
  }
</style>