<template>
  <div class="workspace">
    <div class="fl-main">
      <div class="fl-title">
        <span>回收站</span>
      </div>
      <div class="fl-option fl-options">
         <Folder v-for="(item,index) in listData.folder" 
        :key="'floders'+item.id" 
        :item = "item" 
        :index=index
        :type=2
        :listData="listData"/> 
        <File v-for="(item,index) in listData.file" 
        :key="'files'+item.id" 
        :item = "item" 
        :type=2
        :index=index
        :listData="listData"/> 
      </div>
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
      listData: {}
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$apiFun.file.recycle.list().then(res => {
        this.listData = res.data;
      })
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
  padding: 2rem 4rem;
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
.fl-options {
  height: 100rem;
  overflow-y: auto;
  padding: 0 1.5rem;
}
.fl-option {
  display: grid;
  grid-template-columns: repeat(5,1fr);
  gap: 2.5rem;
  .fl-option-wrap {
    max-height: 29rem;
    border: .1rem solid var(--fl-color-grey-def);
    padding: 0 1.2rem;
    border-radius: .8rem;
    cursor: pointer;
  }
  .fl-option-wrap:hover {
    border: .1rem solid var(--fl-color-theme);
  }
  .fl-option-button { 
    display: flex;
    flex-flow: row; 
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2.5rem;
    font-size: 1.7rem;
    font-weight: 600;
    .fl-button-icon {
      margin-right: .6rem;
      font-size: 2.5rem;
      color: var(--fl-color-theme);
    }
    .fl-newFile-input {
      box-sizing: border-box;
      width: 10rem;
      height: 3rem;
      padding-left: .8rem;
      border: .1rem solid var(--fl-color-grey-def);
      border-radius: .4rem;
      font-size: 1.6rem;

    }
  }
}

.fl-bread {
  margin-left: 2rem;
  font-size: 1.8rem;
  :deep(.el-breadcrumb__inner) {
    cursor: pointer;
  }
}
@media (max-width: 2000px) {
  .fl-options {
    height: 62rem;
  }
}
@media (min-width: 1400px) and (max-width: 1600px) {
  .fl-option {
    grid-template-columns: repeat(4,1fr);
  }
}
@media (max-width: 1400px) {
  .fl-option {
    grid-template-columns: repeat(3,1fr);
  }
  .fl-options {
    height: 55rem;
  }
}
@media (max-width: 1000px) {
  .fl-option {
    grid-template-columns: repeat(2,1fr);
  }
}
// 属性样式
</style>