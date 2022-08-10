<template>
  <div class="workspace">
    <div class="fl-main">
      <div class="fl-title">
        <span>我的素材</span>
      </div>
      <div v-if="listData.length != 0" class="fl-option fl-options">
        <el-card class="fl-card" v-for="(item,index) in listData" :key="'card'+index">
          <div class="fl-card-content">
            <div style="display:flex;flex-flow: column nowrap;padding-right: 5rem;width: 120rem;">
              <div class="fl-collect-name">{{item.name}}</div>
              <div class="fl-collect-content">{{item.content}}</div>
            </div>
            <div class="fl-card-option">
              <el-button type="danger" @click="delect(item,index)">删除素材</el-button>
            </div>
          </div>
        </el-card>
      </div>
      <el-empty v-else  description="暂无素材，快去收集吧！"></el-empty>
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
      this.listData = this.$store.state.materialList;
      console.log(this.listData);
    },
    to(url, params) {
      _to(url, params);
    },
    delect(item, index) {
      this.listData.splice(index, 1);
      this.$store.state.materialList.splice(index, 1);
    }
  },
}
</script>

<style lang="less" scoped>
a {
  color: var(--fl-color-black);
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
.fl-card {
  display: flex;
  border-radius: 8px;
  padding: 0 2rem;
  margin-bottom: 2rem;
}
.fl-card-content {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
}

.fl-collect-name {
  margin-bottom: 1.2rem;
  font-size: 2rem;
  font-weight: 600;

}
.fl-collect-content {
  font-size: 1.6rem;
}

</style>