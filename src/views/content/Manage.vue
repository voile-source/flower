<template>
  <div class="manage">
    <div class="fl-aside">
      <div class="fl-logo">
        <img @click="to('/index')" src="https://s1.ax1x.com/2022/06/02/XYIuff.png">
      </div>
      <div class="fl-aside-option">
        <div @click="to('/recent')" :class="{'fl-option-item':true,'active':$route.name==='recent'}"><i class="el-icon-time"></i><span>最近</span></div>
        <div @click="to('/workspace')" :class="{'fl-option-item':true,'active':$route.name==='workspace'}"><i class="el-icon-document"></i><span>我的文件</span></div>
        <div @click="to('/recycle')" :class="{'fl-option-item':true,'active':$route.name==='recycle'}"><i class="el-icon-delete"></i><span>回收站</span></div>
      </div>
      <span class="fl-aside-line"></span>
      <div class="fl-aside-option" style="margin-top:2.4rem">
        <div @click="to('/articleList')" :class="{'fl-option-item':true,'active':$route.name==='articleList'}"><i class="el-icon-odometer"></i><span>作品管理</span></div>
        <div @click="to('/materialList')" :class="{'fl-option-item':true,'active':$route.name==='materialList'}"><i class="el-icon-bangzhu"></i><span>我的素材</span></div>
      </div>
    </div>
    <div class="fl-main">
      <div class="fl-nav">
        <div class="fl-nav-search"><i class="el-icon-search"></i><input v-model="searchText" placeholder="搜索..." @keyup.enter="search"></div>
        <ul class="fl-nav-user">
          <li class="fl-li-user">
            <img class="fl-user-avatar" :src="$store.state.user.avatar">
            <ul class="fl-user-select">
              <li @click="to('/index')" class="fl-select-item"><div><i class="el-icon-house"></i><span class="select-item-title">前往官网</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="to('/user')" class="fl-select-item"><div><i class="el-icon-user"></i><span class="select-item-title">个人中心</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="to('/setting')" class="fl-select-item"><div><i class="el-icon-setting"></i><span class="select-item-title">账号设置</span></div><i class="el-icon-arrow-right"></i></li>
              <li @click="logout" class="fl-select-item"><div><i class="el-icon-switch-button"></i><span class="select-item-title">退出登录</span></div><i class="el-icon-arrow-right"></i></li>
            </ul>
          </li>
        </ul>
      </div>
      <div class="fl-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import {_to} from '../../util/util'
export default {
  data() {
    return {
      searchText:'',
    }
  },
  methods: {
    to(url,query) {
      _to(url,query);
    },
    search() {
      this.to('/workspace',{text:this.searchText});
    },
    logout() {
      this.$apiFun.logout();
      this.$store.state.isLogin = false;
      this.$store.state.user = '';
      localStorage.removeItem('token')
      this.to('/index')
    }
  },
}
</script>

<style lang="less" scoped>
// 通用属性
//动画
@keyframes bg {
  0% {background: #fff;}
  100% {background: #F3F5F7;}
}
@keyframes init_avatar {
  0% { width: 96px;height: 96px;margin-top: 60px;}
  100% {width: 40px;height: 40px;margin-top:0;}
}
@keyframes display {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
//布局样式
.manage {
  display: flex;
  overflow: hidden;
}
.fl-aside {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  min-width: 25rem; 
  min-height: 100vh;
  padding: 0 1rem;
  background-color: var(--fl-color-grey-aside);
}
.fl-main {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap; 
  width: 100%;
  .fl-nav{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8rem 0 4rem;
    height: 6.4rem;
    width: 100%;
    border-bottom: 1px solid var(--fl-color-grey-def);
  }
  .fl-nav-user {
    display: flex;
    flex-flow: row;
    align-items: center;
  }
}
//属性样式
.fl-logo {
  display: flex;
  justify-content: center;
  margin: 2.8rem 0;
  img {
    width: 13rem;
    height: 5.8rem;
    cursor: pointer;
  }
}
.fl-aside-option {
  margin-bottom: 2rem;
  .fl-option-item {
    padding: 1rem 2.4rem;
    border-radius: .8rem;
    font-size: 1.5rem;
    color: var(--fl-color-black-option);
    cursor: pointer;
    i {
      font-size: 1.6rem;
    }
    span {
      margin-left: .5rem;
    }
  }
  .fl-option-item:not(:first-child) {
    margin-top: .5rem;
  }
  .fl-option-item:hover {
    background-color: var(--fl-color-grey-def);
  }
  .active {
    background-color: var(--fl-color-theme);
    color: #fff;
  }
  .active:hover {
    background-color: var(--fl-color-theme);
    color: #fff;
  }
}
.fl-aside-line {
  height: .1rem;
  background-color: var(--fl-color-grey-def);
  width: 100%;
}
.fl-nav-search {
  display: flex;
  align-items: center;
  height: 3.2rem;
  padding: 0 1rem;
  border: .1rem solid var(--fl-color-grey-def);
  border-radius: .8rem;
  color: var(--fl-color-grey-txt);
  i {
    font-size: 1.5rem;
  }
  input {
    height: 80%;
    padding: 0 .5rem;
    border:0;
    border-radius: .8rem;
    color: var(--fl-color-grey-txt);
  }
}
.fl-li-user {
  position: relative;
  display: flex;
  justify-content: center;
  flex-flow: column;
  width: 18rem;
}
.fl-user-avatar {
  margin: 0 auto;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 8000;
}
.fl-user-avatar:hover+.fl-user-select{
  animation: display .4s ease both;
}
.fl-user-avatar:hover+.fl-user-select,
.fl-user-select:hover{
  visibility: visible;
}
.fl-user-select {
  box-sizing: border-box;
  position: absolute;
  top:4.8rem;
  width: 100%;
  visibility: hidden;
  transition: visibility .2s;
  padding: 1.5rem 1rem;
  background: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: .8rem;
  z-index: 6000;
}
@keyframes unbg {
  0% {background: var(--fl-color-grey-aside);}
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
  animation: unbg .6s ease both;
}
.fl-select-item:hover {
  background: var(--fl-color-grey-aside);
  animation: bg .8s ease both;
}
.select-item-title {
  margin-left: .8rem
}

.fl-content {
  overflow: auto;
  height: 100vh-7rem;
}

/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f5f5f5;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #c8c8c8;
}
</style>