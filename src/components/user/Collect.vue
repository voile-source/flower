<template>
  <div class="collect">
    
    <div class="fl-list-container">
      <ul class="fl-collect-list">
        <li><button @click="dialogVisible = true" class="fl-button-create"><i class="el-icon-circle-plus-outline"></i>新建文件夹</button></li>
        <li v-for="(item,index) in listData" :key="'collect'+index" @click="activeChange(index,item)" :class="['fl-list-item',{'active':index==active}]">
          <span >{{item.name}}</span>
          <span v-if="item.name != '默认'">
          <el-popover
            placement="right"
            width="200"
            trigger="click">
            <div>
              <el-input v-model="name" @blur="cancelEdit(item,index)" @keypress.enter="$event.target.blur()" placeholder="请输入文件名称"></el-input>
            </div>
            <i @click.stop="handelEdit(item,index)" slot="reference" class="el-icon-edit-outline"></i>
          </el-popover>
            
            <el-popover
              placement="top"
              width="160"
              v-model="item.status">
              <p>这是一段内容这是一段内容确定删除吗？</p>
              <div style="text-align: right; margin: 0">
                <el-button size="mini" type="text" @click="item.status = false">取消</el-button>
                <el-button type="primary" size="mini" @click="handleDelete(item,index)">确定</el-button>
              </div>
              <i slot="reference" @click.stop="" class="el-icon-delete"></i>
            </el-popover>
            
          </span>
        </li>
      </ul>
      <div class="fl-collect-content">
         <div class="fl-option" v-if="fileList.length">
          <div class="fl-option-wrap fl-option-file" v-for="item in fileList" :key="item.id" @click="openFile(item.materialId)">
              <div class="fl-option-image" >
                <i v-if="item.cover == null || item.cover==''" class="el-icon-document"></i>
                <el-image class="fl-image-item" v-else :src="item.cover" lazy/>
              </div>
            <div class="fl-option-header">
              <span class="fl-option-title">{{item.title}}</span>
              <div class="fl-option-show">
                <span class="fl-option-user">
                  <el-image class="fl-option-avater" :src="item.avatar" @click="to('/user',{id:item.userId})" lazy></el-image>
                  <span class="fl-user-name" @click="to('/user',{id:item.userId})">{{item.username}}</span>
                </span>
                <span class="fl-option-data">{{item.digest}}</span>
              </div>
            </div>
          </div>
        </div>
        <el-empty v-else description="暂无数据"></el-empty>
      </div>
    </div>
   <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body="true"
      :before-close="handleClose">
      <div style="padding:0 5rem">
        <span style="margin:1rem .5rem">文件夹名称</span>
        <el-input v-model="name" placeholder="请输入收藏文件夹名称"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="big" @click="create">确 定</el-button>
      </span>
    </el-dialog>
    
    
  </div>
 
</template>

<script>
import ListVue from '../List.vue';
import {_to} from '../../util/util'
export default {
  props: {

  },
  components:{ 
    ListVue,
  },
  data() {
    return {
      dialogVisible: false,
      name: '',
      active: 0,
      activeName:1,
      listData:[],
      fileList: [],
    }
  },
  created() {
    this.init();
  },
  methods:{ 
    init() {
      this.$apiFun.material.collect.list().then(res=> {
        this.listData = res.data.collectFolderList;
        this.activeName = this.listData[0].id;
        this.get();
      })
    },
    get() {
      this.fileList = [];
      this.$apiFun.material.collect.get(this.activeName).then(res => {
        res.data.materialList.forEach(item => {
          this.fileList.push(item.mediumMessage);
        })
        // this.fileList = res.data.materialList.mediumMessage;
      })
    },
     openFile(id) {
      _to('/article',{id:id});
    },
    to(url,params) {
      _to(url,params)
    },
    create() {
      this.$apiFun.material.collect.create(this.name).then(res => {
        this.listData.push( {
          id:res.data,
          name:this.name
        });
        this.dialogVisible = false;
      })
    },
    activeChange(index,item) {
      this.active = index;
      this.activeName = item.id;
      this.get();
    },
    handleClose(done) {
      this.name = '';
      done();
    },
    handleEdit(item,index) {
      this.name = item.name;
    },
    handleEnter(item) {
      item.blur();
    },
    cancelEdit(item, index) {
      if (this.name == '') { 
        this.$message.error("请输入收藏夹名称");
        return;
      }
      item.name = this.name;
      document.querySelector('#name' + index).style.display = 'inline';
      document.querySelector('#input' + index).style.display = 'none';
      this.$message({ 
        type: 'success',
        message: '修改成功'
      })
      this.name = '';
    },
    handleDelete(item,index) {
      item.status = false;
      this.listData.splice(index, 1);
    },
  }
}
</script>

<style lang="less" scoped>

ul,li {
  list-style: none;
  padding: 0;
  margin: 0;
}

.collect {

}

.fl-list-container {
  display: flex;
  flex-flow: row;
}
.fl-button-create {
  padding: 1.2rem 5rem;
  margin: 1rem 0 3rem 0;
  background: transparent;
  border: 1px solid var(--fl-color-theme);
  border-radius: .8rem;
  font-size: 1.8rem;
  font-weight: 600;
  color: var(--fl-color-black);
}
.fl-collect-list {
  display: flex;
  justify-content: center;
  flex-flow: column;
  min-width: 240px;
  height:100%;
  padding: 2rem 1.2rem;
  margin-right: 2rem;
  border-radius: 1.2rem;
  box-shadow: 0 0 6Px rgba(0, 0, 0, 0.12);
  box-sizing: border-box;
  .fl-list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem 1rem;
    font-size: 16px;
    border-radius: .8rem;
    box-sizing: border-box;
    margin-bottom: .5rem;
    transition: background .2s ease-in-out,color .1s ease-in-out;
    cursor: pointer;
    button {
      padding: 0 .2rem;
      background: transparent;
      border: 0;
    }
  }
  .fl-list-item:hover {
    background-color: var(--fl-color-theme);
    color: white;
  }
  .active {
    background-color: var(--fl-color-theme);
    color: white;
  }
}
.fl-collect-input {
  display: none;
  background: transparent;
  border: none;
  font-size: 1.6rem;
}
.fl-collect-content {
    padding: 0 3rem;
  }
i {
  margin-right: .5rem;
}
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
    justify-content: center;
    padding: 1rem 0 0 0;
    color: var(--fl-color-grey-txt);
    .fl-option-show {
      display: flex;
      flex-flow: row;
      align-items: center;
      margin-left: .2rem;
      margin-top: 1rem;
      .fl-option-data {
        margin: 0 0 0 1.2rem;
        font-size: 1.4rem;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
        -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
        -webkit-line-clamp: 3; /** 显示的行数 **/
        overflow: hidden;  /** 隐藏超出的内容 **/
      }
    }
    .fl-option-title {
      box-sizing: border-box;
      padding: 0 1rem;
      font-size: 1.8rem;
      font-weight: 600;
      text-align: center;
      max-width: 20rem;
      text-overflow: ellipsis;
      white-space:nowrap;
      overflow: hidden;
    }
    .fl-option-user {
      display: flex;
      align-items: center;
      .fl-option-avater {
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
      }
      .fl-user-name {
        min-width: 2.5rem;
      }
      span {
        font-size: 1.2rem;
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
    height: 15rem;
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
      object-fit: cover;
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
    -webkit-line-clamp: 2; /** 显示的行数 **/
    overflow: hidden;  /** 隐藏超出的内容 **/
  }
}

@media (min-width: 2000px) {
  .fl-option {
    grid-template-columns: repeat(6,1fr);
  }
}
@media (max-width: 1800px) {
  .fl-option {
    grid-template-columns: repeat(3,1fr);
  }
}

@media (max-width: 1500px) {
  .fl-option {
    grid-template-columns: repeat(2,1fr);
  }
}
@media (max-width: 1100px) {
  .fl-option {
    grid-template-columns: repeat(1,1fr);
  }
}
</style>