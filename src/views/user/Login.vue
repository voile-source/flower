<template>
  <div class="login">
    <img @click="to('/')" class="fl-logo" src="https://dd-static.jd.com/ddimg/jfs/t1/120151/25/23178/12267/62c8f757Ec74b3883/5ace6de47ce4aae6.png">
    <!-- 登录 -->
    <div class="fl-input fl-fadein" v-show="type==='login'">
      <div class="fl-input-title">登录你的账户</div>
      <div class="fl-input-help"><span>没有账户? <router-link to="/login?type=register">立即注册</router-link></span></div>
      <div style="margin-bottom: 2.5rem;">
        <span class="fl-input-type">
          <span :class="{'fl-select-block':true,'fl-select-change':by==='password'}" ></span>
          <button @click="changeLogin" :class="{'fl-input-select':true,'active':by==='code'}">验证码登录</button>
          <button @click="changeLogin" :class="{'fl-input-select':true,'active':by==='password'}">密码登录</button>
        </span>
      </div>
        <input class="fl-input-phone" type='text' v-model="inputData.phone" placeholder="请输入手机号"/>
        <div class="fl-input-item" v-if="by==='code'">
          <div class="fl-code-container">
            <input class="fl-input-code" v-model="inputData.code" placeholder="请输入验证码">
            <button v-if="codeClick" @click="sendLoginCode($event.target)" class="fl-button-code">获取验证码</button>
            <button v-else  class="fl-button-uncode">{{time}}s后重新获取</button>
          </div>
          <!-- <div class="fl-input-warning"><span>请输入手机号</span></div> -->
        </div>
        <input v-else class="fl-input-password" type="password" v-model="inputData.password" placeholder="请输入密码"/>
        <div v-show="type==='login'&&by==='password'" class="fl-password-forget fl-show"><span @click="to('/login?type=forget')">忘记密码?</span></div>
        <button class="fl-button" @click="login">登录</button>
      
      <span class="fl-login-other">其他登录方式</span>
      <div class="fl-other-button">
        <svg t="1654390153138" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1581" width="26" height="26"><path d="M347.729118 353.0242c-16.487119 0-29.776737 13.389539-29.776737 29.776737S331.241998 412.677596 347.729118 412.677596s29.776737-13.389539 29.776737-29.776737-13.289617-29.876659-29.776737-29.876659zM577.749415 511.800156c-13.689305 0-24.880562 11.091335-24.880563 24.880562 0 13.689305 11.091335 24.880562 24.880563 24.880562 13.689305 0 24.880562-11.191257 24.880562-24.880562s-11.191257-24.880562-24.880562-24.880562zM500.909446 412.677596c16.487119 0 29.776737-13.389539 29.776737-29.776737s-13.389539-29.776737-29.776737-29.776737c-16.487119 0-29.776737 13.389539-29.776737 29.776737s13.289617 29.776737 29.776737 29.776737zM698.455113 511.600312c-13.689305 0-24.880562 11.091335-24.880562 24.880562 0 13.689305 11.091335 24.880562 24.880562 24.880562 13.689305 0 24.880562-11.091335 24.880562-24.880562-0.099922-13.689305-11.191257-24.880562-24.880562-24.880562z" fill="#00C800" p-id="1582"></path><path d="M511.601093 0.799375C229.12178 0.799375 0.000781 229.820453 0.000781 512.399688s229.021077 511.600312 511.600312 511.600312 511.600312-229.021077 511.600312-511.600312S794.180328 0.799375 511.601093 0.799375z m-90.229508 634.504294c-27.37861 0-49.361436-5.595628-76.839969-10.991413l-76.640125 38.469945 21.882904-65.948477c-54.957065-38.370023-87.73146-87.831382-87.73146-148.084309 0-104.318501 98.722873-186.554254 219.32865-186.554255 107.815769 0 202.34192 65.648712 221.327088 153.979703-6.994536-0.799375-13.989071-1.298985-21.083529-1.298985-104.118657 0-186.454333 77.739266-186.454332 173.564403 0 15.98751 2.498048 31.275566 6.794692 45.964091-6.794692 0.599532-13.689305 0.899297-20.583919 0.899297z m323.547228 76.839969l16.48712 54.757221-60.153006-32.874317c-21.882904 5.495706-43.965652 10.991413-65.848555 10.991413-104.318501 0-186.554254-71.344262-186.554255-159.175644 0-87.631538 82.135831-159.175644 186.554255-159.175644 98.523029 0 186.254489 71.444184 186.254488 159.175644 0.099922 49.461358-32.774395 93.227166-76.740047 126.301327z" fill="#00C800" p-id="1583"></path></svg>
        <span>微信登录</span>
      </div>
    </div> 

    <!-- 注册 -->
    <div class="fl-input fl-fadein" v-show="type==='register'">
      <div class="fl-input-title">注册你的账户</div>
      <div class="fl-input-help"><span>已有账户? <router-link to="/login?type=login&by=code">立即登录</router-link></span></div>
      <input class="fl-input-phone" type='text' v-model="inputData.phone" placeholder="请输入手机号"/>
      <div class="fl-input-item">
        <div class="fl-code-container">
          <input class="fl-input-code" autocomplete="off" v-model="inputData.code" placeholder="请输入验证码">
          <button v-if="codeClick" @click="sendRegisterCode($event.target)" class="fl-button-code">获取验证码</button>
          <button v-else  class="fl-button-uncode">{{time}}s后重新获取</button>
        </div>
        <!-- <div class="fl-input-warning"><span>请输入手机号</span></div> -->
      </div>
      <input class="fl-input-password" type='text' v-model="inputData.username" placeholder="请输入用户名"/>
      <input class="fl-input-password" type="password" v-model="inputData.password" placeholder="请输入密码"/>
      <button class="fl-button" @click="register">注册</button>
    </div> 

    <!-- 重制密码 -->
    <div class="fl-input fl-fadein" v-show="type==='forget'">
      <div class="fl-input-title">重置密码</div>
      <div class="fl-input-help"><span>已有账户? <router-link to="/login?type=login&by=code">立即登录</router-link></span></div>
      <input class="fl-input-phone" type='text' v-model="inputData.phone" placeholder="请输入手机号"/>
      <div class="fl-input-item">
        <div class="fl-code-container">
          <input class="fl-input-code" v-model="inputData.code" placeholder="请输入验证码">
          <button v-if="codeClick" @click="wait($event.target)" class="fl-button-code">获取验证码</button>
          <button v-else  class="fl-button-uncode">{{time}}s后重新获取</button>
        </div>
        <!-- <div class="fl-input-warning"><span>请输入手机号</span></div> -->
      </div>
      <input class="fl-input-password" type="password" v-model="inputData.password" placeholder="请输入密码"/>
      <button class="fl-button" @click="reset">重置密码</button>
    </div> 

  </div>
</template>

<script>
import {_to} from '../../util/util'
import md5 from 'js-md5'
export default {
  data() {
    return {
      codeClick: true,
      time: 60,
      timer:'',
      type:'',
      by:'',
      inputData: {
        username:'',
        phone:'',
        password:'',
        enterPassword:'',
        code:'',
      }
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.by = this.$route.query.by;
    if(this.$store.state.register.phone != '') {
      this.inputData.phone = this.$store.state.register.phone;
    }
  },
  watch: {
   $route(){   
    this.init();
    this.type = this.$route.query.type;
    this.by = this.$route.query.by;
    this.time = 60;
    this.codeClick = true;
    clearInterval(this.timer); 
   },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  methods: {
    wait(button) {
      this.codeClick = false;
      this.timer = setInterval(()=> {
        if(this.time) {
          this.time--;
        }else {
          this.codeClick = true;
          this.time = 60;
          return ;
        }
      },1000);
    },
    sendLoginCode(button) {
      this.$apiFun.sendLoginCode(this.inputData.phone);
      this.wait(button);
    },
    sendRegisterCode(button) {
      this.$apiFun.sendRegisterCode(this.inputData.phone);
      this.wait(button);
    },
    sendFindPasswordCode(button) {

    },
    changeLogin() {
      if(this.by==='password') {
        _to('/login?type=login&by=code');
      }else  {
        _to('/login?type=login&by=password');
      }
    },
    init() {
      this.inputData = this.$options.data().inputData;
    },
    to(url,query) {
      _to(url,query);
    },
    login() {
      console.log(md5(this.inputData.password))
      if(this.by==='code') {
        this.$apiFun.loginCode({phone:this.inputData.phone,code:this.inputData.code}).then(res => {
          if(res.code == 200) {
            this.$store.state.user = res.data;
            localStorage.setItem('token',res.data.token);
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$store.state.isLogin = true;
            this.to('/workspace');
          } 
        }).catch()
      }else  {
        this.$apiFun.loginPassword(
          {phone:this.inputData.phone,password:md5(this.inputData.password)}).then(res => {
          if(res.code == 200) {
            this.$store.state.user = res.data;
            localStorage.setItem('token',res.data.token);
            this.$message({
              message: '登录成功',
              type: 'success'
            });
            this.$store.state.isLogin = true;
            this.to('/workspace');
          }
        });
      }
    },
    register() {
      this.$apiFun.register({phone:this.inputData.phone,password:md5(this.inputData.password),code:this.inputData.code,username:this.inputData.username}).then( res=> {
        this.$message({
          type:'success',
          message:'注册成功'  
        });
        this.to('/login',{type:'login',by:'password'});
      })
    },
    reset() {

    }

  }
  
}
</script>

<style lang="less" scoped>
.fl-logo {
  position: absolute;
  top: 2.2rem;
  left: 19.5rem;
  height: 4.8rem;
  cursor: pointer;
}
//通用样式
.fl-input-item {
  .fl-input-warning {
    text-align: left;
    color: red;
    font-size: 1.4rem;
    animation: showWarn .5s ease;
  }
}
//动画
@keyframes show {
  0% {
    opacity: 0;
    height: 0;
  }
  100% {
    height: 100%;
    opacity: 1;
  }
}
@keyframes fadein {
  0% {
    margin-top:40rem;
    opacity: 0;
  }
  100% {
    margin-top: 0;
  }
}
.fl-show {
  animation: show .75s ease ;
}
.fl-fadein {
  animation: fadein .75s ease ;
}
//布局样式
@media screen and( max-width: 80rem) {
  .fl-slogan-container {
    display: none;
  }
  .fl-input-container{
    width: 100%;
  }
}

.login {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  min-width: 80rem;
  background-image: linear-gradient(125deg, #a8edea 0%, #fed6e3 100%);
}
.fl-input {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  padding: 6rem 5rem;
  min-width: 42rem;
  max-width: 42rem;
  border-radius: .8rem;
  background: #fff;
  transition: height .75s ease;
  .input {
    height: 4.5rem;
    padding-left: 1.2rem;
    font-size: 1.6rem;
    border: 1px solid var(--fl-color-grey-def);
    border-radius: .8rem;
  }
  .input-hidden {
    border: 0;
    background: transparent;
    font-size: 1.6rem;
  }
  .fl-input-phone, .fl-input-password{
    .input();
  }
  .fl-input-password {
    margin-top: 1.4rem;
  }
  .fl-code-container {
    width: 100%;
    height: 4.7rem;
    display: flex;
    justify-content: space-between;
    margin-top: 1.4rem;
    border: 1px solid var(--fl-color-grey-def);
    border-radius: .8rem;
    .fl-input-code {
      width: 45%;
      padding-left: 1.2rem;
      .input-hidden();
    }  
    .fl-button-code {
      margin-right: 1.2rem;
      width: 12.5rem;
      color: var(--fl-color-theme);
      cursor: pointer;
      .input-hidden();
    }
    .fl-button-uncode {
      margin-right: 1.2rem;
      background: transparent;
      color: var(--fl-color-theme);
      cursor: text;
      .input-hidden();
    }
  }
}
//属性样式 
.fl-input-title {
  font-size: 3.6rem;
  font-weight: 600;
  margin-bottom: 1rem;
} 
.fl-input-help {
  margin-bottom: 4rem;
  font-size: 1.6rem;
  color: var(--fl-color-grey-txt);
  a {
    color: var(--fl-color-theme)
  }
}
.fl-input-type {
  position: relative;
  padding: 2.2rem .6rem;
  border-radius: 1.2rem;
  background: var(--fl-color-grey-back);
  .fl-input-select{
    position: relative;
    font-size: 1.6rem;
    padding: 1rem;
    border:0;
    color: var(--fl-color-grey-title);
    background: transparent;
    cursor: pointer;
    z-index: 10;
  }
  .fl-input-select:first-child {
    margin-right: .8rem;
  }
  .active {
    color: var(--fl-color-black);
  }
}
.fl-select-block {
  position: absolute;
  top:.8rem;
  left: .6rem;
  width: 50%;
  height: 4rem;
  border-radius: .8rem;
  background-color: #ffffff8f;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  z-index: 1;
  transition: left .35s ease,right .35s ease,width .35s ease;
}
.fl-select-change {
  width: 8.2rem;
  left: 10.8rem;
  right: .6rem;
}
.fl-button {
    width: 100%;
    height: 4.5rem;
    border: 0;
    border-radius: .8rem;
    margin-top: 1.4rem;
    background-color: var(--fl-color-theme);
    color: #fff;
    font-size: 1.8rem;
    font-weight: 600;
    cursor: pointer;
}
.fl-login-other {
  margin-top: 3rem;
  font-size: 1.5rem;
  text-align: center;
  color: var(--fl-color-grey-title);
}
.fl-other-button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 40%;
  margin: 0 auto;
  margin-top: 1.5rem;
  cursor: pointer;
  border-radius: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  padding: 1rem 0;
  span {
    margin-left: .4rem;
    font-size: 1.6rem;
  }
}
.fl-password-forget {
  margin-top: .8rem;
  font-size: 1.5rem;
  text-align: right;
  color: var(--fl-color-grey-title);
  cursor: pointer;
  span:hover {
    color: var(--fl-color-theme);
  }
}

</style>