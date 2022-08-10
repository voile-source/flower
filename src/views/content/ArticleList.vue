<template>
  <div class="workspace">
    <div class="fl-main">
      <div class="fl-title">
        <span>作品管理</span>
      </div>
      <div v-if="listData.length != 0" class="fl-option fl-options">
        <el-card class="fl-card" v-for="(item,index) in listData" :key="'card'+index">
          <div class="fl-article-content">
            <div class="fl-article-info">
              <div class="fl-article-cover"><el-image :src="item.cover" class="fl-cover"></el-image></div>
              <div class="fl-article-desc">
                <span class="fl-article-title">{{item.title}}</span>
                <span class="fl-article-tag">
                  <el-tag  style="margin-right: 1rem;" v-for="(items,index) in item.tags" :key="'tag'+index">{{items}}</el-tag>
                </span>
                <span class="fl-article-data">阅读 {{Math.floor(Math.random()*333)}} 点赞 {{item.likeNum}} 收藏 {{item.collectNum}} 评论{{Math.floor(Math.random()*10)}}</span>
                <span class="fl-article-time">{{item.createTime}}</span>
              </div>
            </div>
            <div class="fl-article-option">
              <el-button @click="to('/article',{id:item.materialId})" type="primary">预览</el-button>
              
              <el-button type="danger">删除</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <el-empty v-else  description="未发表作品"></el-empty>
    </div>
  </div>
</template>

<script>
import {_to} from '../../util/util'
import Folder from '../../components/folder/Folder'
import File from '../../components/folder/File'

export default {
  components: {
    Folder,
    File
  },
  data() {
    return {
      listData: {},
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$apiFun.user.materialList(this.id).then(res=> {
        this.listData = res.data.materialList;
      })
    },
    to(url, params) {
      _to(url, params);
    }
  },
}
</script>

<style lang="less" scoped>

// 通用样式
.el-dialog {
  border-radius: 1.6rem;
}
// 动画
// 布局样式
.workspace {
  display: flex;
  flex-flow: column nowrap;
  padding: 2rem 12rem;
}

.fl-card {
  border-radius: 8px;
  margin-bottom: 2rem;
}
/deep/ .el-image__inner{ 
  width: 24rem;
  height: 14rem;
  border-radius: 12px;
}
.fl-article-content {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
.fl-article-info {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.fl-article-desc {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  padding: 2rem 0;
  margin-left: 2rem;
  min-height: 100%;
  box-sizing: border-box;
}
.fl-article-title {
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: .5rem;
}
.fl-article-tag {
  font-weight: 600;
  margin-bottom: .5rem;
}
.fl-article-data {
  margin-bottom: .5rem;
  font-size: 1.5rem;
  color: var(--fl-color-grey-content);
}
.fl-article-time {
  font-size: 1.4rem;
  color: var(--fl-color-grey-content);
}
.fl-article-option {
  display: flex;
  justify-content: flex-end;
  width: 40%;

}
.fl-main {
  margin: 4rem 0 20rem 0;
  .fl-title {
    display: flex;
    flex-flow: row;
    align-items: center;
    padding: 2rem 1rem;
    font-size: 2.2rem;
    font-weight: 600;
  }
}


</style>