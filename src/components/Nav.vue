<template>
  <div class="nav-def">
    <div class="nav-left">
      <img @click="to('/index')" src="http://volit.top/image/717a81d0-9b5a-47f2-a392-7d028d3d3a69.png">
    </div>
    <div class="nav-center">
      <div class="nav-option" @click="optionChange($event.target,1)"><span class="nav-option-title">创作社区</span></div>
      <div class="nav-option" @click="optionChange($event.target)"><span class="nav-option-title">平台介绍</span></div>
      <div class="nav-option" @click="optionChange($event.target)"><span class="nav-option-title">帮助中心</span></div>
      <div class="nav-option" @click="optionChange($event.target)"><span class="nav-option-title">关于我们</span></div>
    </div>
    <div class="nav-right">
      <div v-if="$store.state.isLogin === false">
        <router-link to="/login?type=login&by=code"><button class="nav-button nav-login">登录</button></router-link>
        <router-link to="/login?type=register"><button class="nav-button nav-register">立即注册</button></router-link>
      </div>
      <div v-else>
        <ul class="fl-nav-user">
          <li class="fl-li-user">
            <div class="nav-button nav-user" @click="to('/workspace')"><img :src="$store.state.user.avatar"><span>进入工作台</span></div>
            <ul class="fl-user-select">
              <li @click="to('/index')" class="fl-select-item"><div><i class="el-icon-house"></i><span class="select-item-title">前往官网</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="to('/user')" class="fl-select-item"><div><i class="el-icon-user"></i><span class="select-item-title">个人中心</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="to('/setting')" class="fl-select-item"><div><i class="el-icon-setting"></i><span class="select-item-title">账号设置</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="logout" class="fl-select-item"><div><i class="el-icon-switch-button"></i><span class="select-item-title">退出登录</span></div><i class="el-icon-arrow-right"></i></li>
            </ul>
          </li>
        </ul>
        
      </div>
    </div>
  </div>
</template>

<script>
import { _debounce, _throttle, _to } from '@/util/util'
export default {
  data() {
    return {
    }
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel',this.handleScroll)||window.removeEventListener("DOMMouseScroll",this.handleScroll)
  },
  mounted(){
    window.addEventListener('mousewheel',this.handleScroll, true)||window.addEventListener("DOMMouseScroll",this.handleScroll,false)
  },
  methods:{
    handleScroll: _debounce(function(e){
        let direction = e.deltaY > 0 ? 'down' : 'up'
        let nav = document.querySelector(".nav-def");
        if(direction == 'down') {
          nav.classList.add('nav');
          nav.classList.remove('nav-close')
        } else  {
          if(document.body.scrollTop == 0) {
            nav.classList.add('nav-close');
            setTimeout(()=>{nav.classList.remove('nav')},300);
          }
        }
    },100),
    optionChange(div,index = 1) {
      let active = document.querySelector(".active");
      if(active != null) {
        active.classList.remove("active")
      }
      div.classList.add("active");
      if(index === 1) {
        _to('/square')
      }
    },
     logout() {
      this.$apiFun.logout();
      this.$store.state.isLogin = false;
      this.$store.state.user = '';
      localStorage.removeItem('token')
      this.to('/index')
    },
    to(url,query) {
      let active = document.querySelector(".active");
      if(active != null) {
        active.classList.remove("active")
      }
      document.querySelector(".fl-user-select").style.visibility = 'hidden';
      _to(url,query);
      setTimeout(()=>{document.querySelector(".fl-user-select").style = '';
      },500);
    },
  }
}
</script>

<style lang="less" scoped>
  // 通用样式

  //组件样式

  //布局样式
  .nav-def {
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height: 9.2rem;
    min-height: 7.2rem;
    max-height: 9.2rem;
    min-width: 140rem;
    padding: 0 2rem;
    background-color:#ffffff;
    z-index: 1000;
    transition: height .45s ease,background-color .45s ease;
  }
  .nav-left {
    display: flex;
    justify-content: flex-end;
    padding: .8rem;
    img {
      width: 6rem;
      height: 6rem;
      cursor: pointer;
    } 
  }
  .nav-center {
    box-sizing: border-box;
    display: flex;
    flex-flow: row nowrap;
    padding: 0 .5rem;
  }
  //属性样式
  .nav {
    height: 7.2rem;
    border-bottom: 1px solid #ECECEC;
    background-color:#ffffffef;
  }
  .nav-close {
    height: 9.2rem;
    background-color:#ffffff;
  }
  .nav-option {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 1rem 3.2rem;
    margin: 0 .25rem;
    border-radius: 2.4rem;
    font-size: 1.65rem;
    color: #66686D;
    cursor: pointer;
  }
  .nav-option:hover {
    color: #24272E;
    background: #F3F7FB;
  }
  .active {
    color: #24272E;
    font-weight: 600;
  }
  .nav-button {
    margin: .5rem;
    border: 0;
    background: white;
    padding: 1rem 2.2rem;
    border-radius: .8rem;
    box-shadow: rgba(0,0,0,0.08) 0px 4px 6px 0px,rgba(0,0,0,0.05) 0px 0px 0px 1px;
    font-size: 1.65rem;
    cursor: pointer;
  }
  @keyframes display {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  .fl-li-user {
    position: relative;
    display: flex;
    justify-content: center;
    flex-flow: column;
  }
  .nav-button:hover+.fl-user-select{
    animation: display .4s ease both;
  }
  .nav-button:hover+.fl-user-select,
  .fl-user-select:hover{
    visibility: visible;
  }
  .fl-user-select {
    box-sizing: border-box;
    position: absolute;
    top:7rem;
    width: 100%;
    visibility: hidden;
    transition: visibility .1s;
    padding: 1.5rem 1rem;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: .8rem;
    z-index: 100;
  }
  @keyframes unbg {
    0% {background: var(--fl-color-grey-def);}
    100% {background: #fff;}
  }
  .fl-select-item {
    display: flex;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
    padding: 1.2rem 1.8rem;
    border-radius: .8rem;
    font-size: 1.6rem;
    color: var(--fl-color-grey-txt);
    cursor: pointer;
    animation: unbg .2s ease both;
  }
  .fl-select-item:hover {
    background: var(--fl-color-grey-def);
    animation: bg .8s ease both;
  }
  .select-item-title {
    margin-left: .8rem
  }
  .nav-register {
    background-color: var(--fl-color-theme);
    color: #fff;
    font-weight: 600;
  }
  .nav-user {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1.7rem;
    font-weight: 600;
    color: var(--fl-color-theme);
    img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 50%;
      object-fit: cover;
      margin-right: .5rem;
    }
  }
 
</style>