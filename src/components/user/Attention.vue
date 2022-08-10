<template>
  <div class="collect">
   <div class="fl-collect-item" v-for="(item,index) in listData" :key="item.id">
    <div class="fl-user">
      <div class="fl-user-avatar">
        <img :src="item.avatar">
      </div>
      <div class="fl-user-inform">
        <span class="fl-user-name">{{item.username}}</span>
        <span class="fl-user-desc">{{item.desc}}</span>
      </div>
    </div>
    <div class="fl-option">
      <button @click="unAttention(item.id,)" class="fl-option-button">取消关注</button>
    </div>
   </div>
  </div>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      listData:'',
    }
  },
  created() {
    this.init();
  },
  methods:{ 
    init() {
      this.$apiFun.user.attentionList().then(res=> {
        this.listData = res.data.userList;
      })
    },
  unAttention(id,index) {
    this.$apiFun.user.unAttention(id).then( res => {
      this.listData.splice(index,1);
    })
    
  }
  }
}
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  flex-flow: column;
  justify-content: center;
}
.fl-collect-item {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}
.fl-user {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.fl-user-avatar {
  img {
    width: 5rem;
    height: 5rem;
  }
}
.fl-user-inform {
  display: flex;
  flex-flow: column;
  margin: 0 .6rem;
  .fl-user-name {
    font-size: 1.8rem;
    font-weight: 600;
  }
  .fl-user-desc {
    font-size: 1.4rem;
    color: var(--fl-color-grey-content);
  }
}
.fl-option-button {
  padding: .8rem 3rem;
  background-color: var(--fl-color-theme-light);
  border: .1rem solid var(--fl-color-theme-light);
  border-radius: 4.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--fl-color-theme);
}
</style>