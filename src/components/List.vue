<template>
  <div class="list">
      <div class="fl-option" v-if="listData.length">
        <div class="fl-option-wrap fl-option-file" v-for="item in listData" :key="item.id" @click="openFile(item.materialId)">
            <div class="fl-option-image" >
              <i v-if="item.cover == null || item.cover==''" class="el-icon-document"></i>
              <el-image class="fl-image-item" v-else :src="item.cover" lazy/>
            </div>
          <div class="fl-option-header">
            <span class="fl-option-title">{{item.title}}</span>
            <div class="fl-option-show">
              <span class="fl-option-user">
                <el-image class="fl-option-avater" :src="item.avatar" @click="to('/user',{id:item.userId})" lazy></el-image>
                <span @click="to('/user',{id:item.userId})">{{item.username}}</span>
              </span>
              <span class="fl-option-data">阅读{{Math.floor(Math.random()*343)}} 点赞{{item.likeNum}} 收藏{{item.collectNum}} 评论{{ Math.floor(Math.random() * 34)}}</span>
            </div>
          </div>
          <div class="fl-option-content">
            {{item.digest}}
          </div>
        </div>
      </div>
      <el-empty v-else description="暂无数据"></el-empty>
    </div>
</template>
                            
<script>
import {_to} from '../util/util'
export default {
  props: {
    listData: Array,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
    openFile(id) {
      _to('/article',{id:id});
    },
    to(url,params) {
      _to(url,params)
    }
  },
}
</script>

<style lang="less" scoped>

.fl-option {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 2.5rem;
  .fl-option-wrap {
    border: .1rem solid var(--fl-color-grey-def);
    padding: 1.2rem 1.2rem;
    border-radius: .8rem;
    cursor: pointer;
  }
  .fl-option-wrap:hover {
    border: .1rem solid var(--fl-color-theme);
  }
  .fl-option-header {
    display: flex;
    flex-flow: column nowrap;
    padding: 1rem 0 0 0;
    color: var(--fl-color-grey-txt);
    .fl-option-show {
      display: flex;
      flex-flow: row;
      align-items: center;
      .fl-option-data {
        margin: 0 0 0 1.2rem;
        font-size: 1.6rem;
      }
    }
    .fl-option-title {
      box-sizing: border-box;
      padding: 0 1rem;
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      max-width: 26rem;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow: hidden;
    }
    .fl-option-user {
      display: flex;
      margin-left: .8rem;
      align-items: center;
      .fl-option-avater {
        width: 3.6rem;
        height: 3.6rem;
        margin-right: .5rem;
        border-radius: 50%;
      }
      span {
        font-size: 1.6rem;
        font-weight: 600;
      }
      span:hover {
        color: var(--fl-color-black)
      }
    }
  }
  .fl-option-image {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 19rem;
    background-color: var(--fl-color-grey-back);
    border-radius: .4rem;
    i {
      margin: 4rem;
      font-size: 4rem;
      color: var(--fl-color-grey-txt);
    }
    .fl-image-item {
      width: 100%;
      height: 100%;
      border: 0;
      border-radius: .4rem;
    }
  }

  .fl-option-content {
    box-sizing: border-box;
    width: 100%;
    margin: 1rem 0 0 0; 
    padding: 0 1rem 0 1rem;
    font-size: 1.6rem;
    // font-weight: 600;
    color: var(--fl-color-grey-txt);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    -webkit-line-clamp: 3; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
}

@media (min-width: 2000px) {
  .fl-option {
    grid-template-columns: repeat(5,1fr);
  }
}
@media (max-width: 1800px) {
  .fl-option {
    grid-template-columns: repeat(4,1fr);
  }
}

@media (max-width: 1800px) {
  .fl-option {
    grid-template-columns: repeat(3,1fr);
  }
}
@media (max-width: 1300px) {
  .fl-option {
    grid-template-columns: repeat(2,1fr);
  }
}
@media (max-width: 400px) {
  .fl-option {
    grid-template-columns: repeat(1,1fr);
  }
}
</style>