<template>
  <div class="user">
    <div class="fl-user-container"> 
        <div class="fl-information">
        <div class="fl-inform">
          <div class="fl-user">
            <img :src="user.avatar">
            <div class="fl-user-text">
              <span>{{user.username}}</span>
              <span class="fl-user-data">{{user.desc}}</span>
            </div>
          </div>
        <button class="fl-user-button" v-if="$route.query.id==undifind || $route.query.id == $store.state.user.id" @click="to('/setting')"><i class="el-icon-edit"></i><span>编辑个人信息</span></button>
        <button class="fl-unAttention" v-else-if="!attention" @click="addAttention"><i class="el-icon-plus"></i>关注</button>
        <button class="fl-attention" v-else @click="addAttention">取消关注</button>
        </div>
        <!-- <img class="fl-cloudImg" :src="url"> -->
      </div>
      <div class="fl-user-header">
        <div class="fl-user-nav">
          <ul>
            <li @click="changeActive($event.target,1)" :class="{'active':active==1}">作品</li>
            <li @click="changeActive($event.target,2)" :class="{'active':active==2}">点赞</li>
            <li @click="changeActive($event.target,3)" :class="{'active':active==3}">收藏</li>
            <li @click="changeActive($event.target,4)" :class="{'active':active==4}">关注</li>
          </ul>
        </div>
        <div class="fl-user-option"></div>
      </div>
      <div class="fl-user-content">
        <ArticleVue ref="article" v-if="active==1"></ArticleVue>
        <LikeVue v-else-if="active==2"></LikeVue>
        <CollectVue v-else-if="active==3"></CollectVue>
        <AttentionVue  v-else></AttentionVue>
      </div>
    </div>
  </div>
</template>

<script>
import {_to} from '../../util/util'
import ArticleVue from '@/components/user/Article.vue';
import CollectVue from '@/components/user/Collect.vue';
import LikeVue from '@/components/user/Like.vue';
import AttentionVue from '@/components/user/Attention.vue';
export default {
  components: {
    ArticleVue,
    CollectVue,
    LikeVue,
    AttentionVue
  },
  data() {
    return {
      active:3,
      id: '',
      url: '',
      user: {}
    }
  },
  created() {
    this.init();
    this.active = this.$route.query.option;
    if(this.active == undefined) this.active =1;
  },  
  watch: {
    // $route: {
    //   handler() {
    //     this.active = this.$route.query.option;
    //     if(this.$route.query.id != undefined) {
    //       this.id = this.$route.query.id; 
    //     } else {
    //       this.id = this.$store.state.user.userId;
    //     }
    //   }
    // }
  },

  methods: {
    init() {
      let id = this.$route.query.id;
      if(id==undefined) id = this.$store.state.user.id;
      console.log(id)
      this.$apiFun.user.get(id).then(res=> {
        this.user = res.data;
      })
      // this.$apiFun.user.imageCloud().then(res=> {
      //   this.url = res.data.url;
      // })
    },
    changeActive(item,index) {
      this.active = index;
      document.querySelector(".active").classList.remove("active");
      item.classList.add("active");
      this.to('/user',{option:index})
    },
    to(url,param) {
      _to(url,param);
    }
  },
}
</script>

<style lang="less" scoped>
//通用样式
ul,li {
  list-style: none;
  padding-left: 0;
}
.user {
  box-sizing: border-box;
  padding: 2rem 15rem;
  min-height: 100%;
  background: var(--fl-color-grey-light);
}
.fl-user-container{ 
  padding: 2rem 8rem 8rem 8rem;
  border-radius: .8rem;
  background: #fff;
}
.fl-information {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-flow: row nowrap;
  padding: 3rem 0;
  border-bottom: .1rem solid var(--fl-color-grey-def);
  .fl-user {
    display: flex;
    img {
      width: 8rem;
      height: 8rem;
      border-radius: 50%;
    }
    .fl-user-text {
      display: flex;
      flex-flow: column;
      justify-content: center;
      align-content: center;
      margin: 0 .5rem;
      font-size: 2.8rem;
      font-weight: 600;
      .fl-user-data {
        font-size: 1.5rem;
      }
    }
  }
  .fl-user-button {
    box-sizing: border-box;
    width: 18rem;
    height: 4.5rem;
    margin: 1.2rem 0;
    background-color: transparent;
    border: .1rem solid var(--fl-color-grey-def);
    border-radius: .8rem;
    font-size: 1.6rem;
    cursor: pointer;
    span {
      margin: 0 1rem;
    }
  }
}

.fl-unAttention {
      padding: .8rem 3rem;
      background-color: var(--fl-color-theme);
      border: .1rem solid var(--fl-color-theme-light);
      color: white;
      border-radius: 1.2rem;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
      i {
        margin-right: .2rem;
        font-size: 1.3rem;
        font-weight: 600;
      }
    }
    .fl-attention {
      padding: .8rem 3rem;
      background-color: var(--fl-color-theme-light);
      border: .1rem solid var(--fl-color-theme);
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      border-radius: 1.2rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--fl-color-theme);
      cursor: pointer;
    }
.fl-cloudImg {
  width: 15rem;
  height: 15rem;
  margin: 0 5rem;
}
.fl-user-header {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 0;
  .fl-user-nav {
    ul {
      display: flex;
    }
    li {
      margin-right: 4.5rem;
      font-size: 2.2rem;
      cursor: pointer;
    }
    .active {
      font-weight: 600;
    }
  }
}

</style>