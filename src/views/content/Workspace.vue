<template>
  <div class="workspace">
    <div class="fl-option">
      <div class="fl-option-wrap" @click="addFolder">
        <div class="fl-option-button">
          <div style="display:flex;">
            <i class="el-icon-folder-add fl-button-icon"></i>
            <div>新建文件夹</div>
          </div>
          <div>
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <div class="fl-option-wrap" @click="addFile">
        <div class="fl-option-button">
          <div style="display:flex;">
            <i class="el-icon-document-add fl-button-icon"></i>
            <div>新建文章</div>
          </div>
          <div>
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
      <div class="fl-option-wrap" @click="inputFile">
        <div class="fl-option-button">
          <div style="display:flex;">
            <i class="el-icon-document-add fl-button-icon"></i>
            <div>导入文件</div>
          </div>
          <div>
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="fl-main">
      <div class="fl-title">
        <span>我的文件</span>
        <div class="fl-bread">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item v-for="item in listData.path" :key="'path'+item.id"><span @click="repalce(item.id)">{{item.name}}</span></el-breadcrumb-item>
          </el-breadcrumb>
          </div>
      </div>
      <div class="fl-option fl-options">
        <Folder v-for="(item,index) in listData.folder" 
        :key="'floders'+item.id" 
        :item = "item" 
        :ref="'newFolder'+item.id"
        :index="index" 
        :currentFolder="currentFolder"
        :listData="listData"/> 
        <File v-for="(item,index) in listData.file" 
        :key="'files'+item.id" 
        :item = "item" 
        :ref="'newFile'+item.id"
        :index="index" 
        :currentFolder="currentFolder"
        :listData="listData"/> 
      </div>
      <el-empty v-show="listData.folder.length==0 && listData.file.length==0" description="当前文件夹为空"></el-empty>
    </div>
  </div>
</template>

<script>
import {_to, _debounce,_throttle} from '../../util/util'
import Folder from '../../components/folder/Folder'
import File from '../../components/folder/File'

export default {
  components: {
    Folder,
    File
  },
  data() {
    return {
      blur: false,
      renameDialog: false,
      moveDialog: false,
      moveFileDialog: false,
      optionFolder: '',
      optionFile: '',
      activeFolderId: '',
      currentFolder: null,
      name:'',
      newName:'',
      listData: {},
      folderData: {},
    }
  },
  created() {
    this.activeFolderId = this.currentFolder = this.getQueryString('id');
    this.folderInit();
  },
  watch: {
    $route() {
      this.activeFolderId = this.currentFolder = this.$route.query.id;
      this.folderInit();
    }
  },
  methods: {
    getQueryString(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null)return unescape(r[2]); return null;
    },
    //阻止页面右击事件
    contextMenu(e) {
      e.preventDefault();
    },
    randomRange(min, max) { // min最小值，max最大值
      return Math.floor(Math.random() * (max - min)) + min;
    },
    getFolderName() {
      let num = 0;
      while(1) {
        let flag = true;
        this.listData.folder.forEach((item)=> {
          if(item.name==="新建文件夹"+num || item.name === "新建文件夹" && num === 0) {
            flag = false;
          }
        })
        if(flag) {
          return num===0?'新建文件夹':'新建文件夹'+num;
        }
        num++;
      }
      
    },
    //新建文件夹
    addFolder:_throttle(function() {
      let id = this.randomRange(0, 1000);
      let name = this.getFolderName();
      this.listData.folder.push({id:id,name:name,img:'',type:0,index: this.listData.folder.length});
      setTimeout(()=>{
        document.querySelector("#input"+name).focus();
      },50);
    },1000),
    folderInit() { 
      // 获取文件夹列表
      this.$apiFun.folder.get({folderId:this.currentFolder}).then( res => {
        this.listData = res.data;
      })
    },
    getFileName() {
      let num = 0;
      while(1) {
        let flag = true;
        this.listData.file.forEach((item)=> {
          if(item.title==="未命名的文章"+num || item.title === "未命名的文章" && num === 0) {
            flag = false;
          }
        })
        if(flag) {
          return num==0?'未命名的文章':'未命名的文章'+num;
        }
        num++;
      }
    },
    inputFile() {
      
    },
    //新建文章
    addFile:_throttle(function() {
      let name = this.getFileName();
      let id = this.randomRange(0, 1000);
      this.listData.file.push({id:id,title:name,img:'',type:0,index: this.listData.file.length});
      setTimeout(()=>{
        document.querySelector("#inputx"+id).focus();
      },50);
    },1000),
    repalce(id) {
      console.log(id);
      if(id===this.currentFolder)return;
      _to('/workspace',{id:id})
    }
  },
}
</script>

<style lang="less" scoped>
a {
  color: var(--fl-color-black);
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
  margin: 4rem 0 2rem 0;
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
// @media (max-width: 2000px) {
//   .fl-options {
//     height: 62rem;
//   }
// }
@media (min-width: 1400px) and (max-width: 1600px) {
  .fl-option {
    grid-template-columns: repeat(4,1fr);
  }
}
@media (max-width: 1400px) {
  .fl-option {
    grid-template-columns: repeat(3,1fr);
  }
  // .fl-options {
  //   height: 55rem;
  // }
}
@media (max-width: 1000px) {
  .fl-option {
    grid-template-columns: repeat(2,1fr);
  }
}
// 属性样式
</style>