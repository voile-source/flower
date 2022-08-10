<template>
  <div class="fl-option-wrap fl-option-file">
          <div class="fl-option-image" @click="openFolder(item.id)">
            <i class="el-icon-folder"></i>
          </div>
          <div class="fl-option-button">
            <div style="display:flex;" @click="openFolder(item.id)">
              <i class="el-icon-folder fl-button-icon"></i>
              <div v-if="item.type === 0">
                <input :id="'input'+item.name" class="fl-newFile-input" @keypress.enter="saveFolder(item)" @blur="saveFolder(item)" v-model="newName" placeholder="键入名称">
              </div>
              <div class="fl-title" v-else>{{item.name}}</div>
            </div>
            <div class="fl-option-more"  @click="showSelect('folder'+item.id)">
              <div  class="fl-more-wrap"><i class="el-icon-more"></i></div>
              <div v-if="type==2" tabindex="1" :id="'folder'+item.id" class="fl-select" @blur="hiddenSelect('folder'+item.id)">
                <div @click="recycleFolder(item.id)" class="fl-select-item">复原</div>
                <div @click="deleteRecycleFolder(item.id)" class="fl-select-item">删除</div>
              </div>
              <div v-else tabindex="1" :id="'folder'+item.id" class="fl-select" @blur="hiddenSelect('folder'+item.id)">
                <div @click="openFolder(item.id)" class="fl-select-item">打开</div>
                <div @click="optionFolder = item, name = item.name, renameDialog = true;" class="fl-select-item">重命名</div>
                <div @click="optionFolder=item,activeFolderInit(),moveDialog = true" class="fl-select-item">移动</div>
                <div @click="deleteFolder(item.id,index)" class="fl-select-item">删除</div>
              </div>
              <!-- 重命名 -->
              <el-dialog
                title="重命名"
                :visible.sync="renameDialog"
                width="25%"
                :append-to-body="true">
                <input class="fl-input-rename" v-model="name">
                <span slot="footer" class="dialog-footer">
                  <el-button @click="renameDialog = false">取 消</el-button>
                  <el-button type="primary" @click="renameFolder(item)">确 定</el-button>
                </span>
              </el-dialog>
              <!-- 移动 -->
              <el-dialog
                title="移动"
                :visible.sync="moveDialog"
                width="45%"
                :append-to-body="true">
                <div class="fl-folder-select">
                  <div class="fl-select-wrap" v-if="folderData.length != 0">
                      <div class="fl-select-item" v-show="activeFolderId!=1" @click="returnUp">
                        <div class="fl-select-image">
                          <i class="el-icon-top"></i>
                        </div>
                        <span class="fl-select-name">返回上一级</span>
                      </div>
                      <div class="fl-select-item"  v-for="item in folderData" :id="'select'+index+item.id" :key="item.id" @click="changeActive(item.id)" @dblclick="activeFolderInit(item.id)">
                        <div class="fl-select-image">
                          <i class="el-icon-folder"></i>
                        </div>
                        <span class="fl-select-name">{{item.name}}</span>
                      </div>
                  </div>
                  <el-empty v-else description="无数据"></el-empty>
                </div>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="moveFolder()">选 择</el-button>
                  <el-button @click="moveDialog = false">取 消</el-button>
                </span>
              </el-dialog>
            </div>
          </div>
        </div>
</template>


<script>
import {_to} from '../../util/util'
export default {
  props: {
    item: Object,
    index: Number,
    listData: Object,
    currentFolder: String,
    type: Number
  },
  data() {
    return {
      blur: false,
      renameDialog: false,
      moveDialog: false,
      moveFileDialog: true,
      optionFolder: '',
      optionFile: '',
      activeFolderId: '',
      name:'',
      newName:'',
      folderData: {},
      path: [],
    }
  },
  created() {
    this.activeFolderId = this.$route.query.id;
  },
  methods: {
     //保存文件夹
    saveFolder(folder) {
      this.$apiFun.folder.create({folderName:this.newName===''?folder.name:this.newName,parentId:this.$route.query.id,writeGroupId:''}).then(res => {
        this.listData.folder.splice(folder.index,1);
        this.listData.folder.push( {
          id:res.data.folderId,
          name: this.newName == ''? folder.name:this.newName
        })
      });
    },
    //打开文件夹
    openFolder(id) {  
      if(this.item.type == 0)return;  
      this.folderInit();
      _to('/workspace',{id:id});
    },
    //重命名文件夹
    renameFolder() {
      this.$apiFun.folder.rename(this.optionFolder.id,this.name).then( res => {
        if(res.code == 200) {
          this.optionFolder.name = this.name;
          this.renameDialog = false;
        } else  {
          this.$message.error(res.message);
        }
      })
      
    },
    //返回上一级
    returnUp() {
      console.log(this.activeFolderId)
      if(this.activeFolderId == 1)return;
      this.activeFolderId = this.path[this.path.length-2].id;
      this.activeFolderInit();
      
    },
    //移动文件夹
    moveFolder() {
      this.$apiFun.folder.move(this.item.id,this.activeFolderId).then( res => {
        _to('/workspace',{id:this.activeFolderId});
        this.moveDialog = false;
      })
    },
    recycleFolder(id) {
      this.$apiFun.folder.recycle.recover(id).then(res=>{
        this.$message( {
          message:'复原成功',
          type:'success'
        })
        this.listData.folder.splice(this.index,1);
      })
    },
    deleteRecycleFolder(id) {

    },
    //删除文件夹
    deleteFolder(id,index) {
      this.$apiFun.folder.delete(id).then( res => {
        this.$message( {
          type: 'success',
          message: '删除成功'
        })
        this.listData.folder.splice(index,1);
      })
      
    },
    folderInit() { 
      // 获取文件夹列表
      _to('/workspace',{id:this.$route.query.id});
    },
    activeFolderInit() { 
      // 获取文件夹列表
      this.$apiFun.folder.get({folderId:this.activeFolderId}).then( res => {
        this.folderData = res.data.folder;
        this.path = res.data.path
      })
    },
    changeActive(id) {
      let active = document.querySelector(".active-folder");
      if(active)active.classList.remove("active-folder");
      document.querySelector("#select"+this.index+id).classList.add("active-folder");
      this.activeFolderId = id;
    },
    //显示文件操作选项
    showSelect(id) {
      let display = document.querySelector('#'+id);
      if(display.style.display === '') {
        display.style.display = 'inline';
        display.focus();
      } else {
        display.blur();
      }
    },
    //隐藏文件选项
    hiddenSelect(id) {
      setTimeout(() => {
        let display = document.querySelector('#'+id);
        display.style.display = '';
      },150)
    }
  },
}
</script>

<style lang="less" scoped>
  .fl-option-wrap {
    border: .1rem solid var(--fl-color-grey-def);
    padding: 0 1.2rem;
    border-radius: .8rem;
    cursor: pointer;
  }
  .fl-option-wrap:hover {
    border: .1rem solid var(--fl-color-theme);
  }
  .fl-option-image {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--fl-color-grey-back);
    height: 20rem;
    margin-top: 1rem;
    border-radius: .4rem;
    i {
      font-size: 6rem;
      color: var(--fl-color-theme);
    }
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
    .fl-title {
      width: 11rem;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space:nowrap;
    }
  }
 .fl-option-more {
    position: relative;
  }

  .fl-more-wrap {
    padding: .8rem;
    border-radius: .8rem;
  }
  .fl-more-wrap:hover {
    background-color: var(--fl-color-grey-def);
  }
 
  .fl-select {
    position: absolute;
    display: none;
    min-width: 8rem;
    padding: 1.2rem .8rem;
    border-radius: .8rem;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    font-weight: 500;
    background: #fff;
    outline: none;
    .fl-select-item {
      padding: .5rem .8rem;
      border-radius: .4rem;
      user-select:none;
    }
    .fl-select-item:hover {
      background: var(--fl-color-grey-def);
    }
  }
.fl-input-rename {
   padding: .2rem 1.2rem;
   width: 80%;
   height: 4.2rem;
   border: .1rem solid var(--fl-color-grey-def);
   border-radius: .8rem;
   font-size: 1.8rem;
   color: var(--fl-color-grey-txt);
 }
.fl-folder-select {
  padding: 1rem;
}
.fl-select-wrap {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 1rem;
  padding: 2rem;
  border: .1rem solid var(--fl-color-grey);
  border-radius: 1.2rem;
}

.fl-select-item {
  box-sizing: border-box;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding: 1rem;
  border: .1rem solid transparent;
  border-radius: .8rem;
  cursor: pointer;
}
.fl-select-item:hover {
  background-color: var(--fl-color-grey-light);
}
.active-folder,.active-folder:hover {
  background-color: var(--fl-color-grey-back);
  border: .1rem solid var(--fl-color-theme);
}
.fl-select-image {
  display: flex;
  justify-content: center;
  i {
    font-size: 10rem;
  }
}
.fl-select-name {
  padding: 1rem 2rem;
  font-size: 1.7rem;
  font-weight: 600;
  text-align: center;
}
</style>