<template>
  <div class="history">
    <div class="fl-none" v-if="listData.length == 0">
      <div class="fl-image-container"><img src="../../assets/image/history.svg"></div>
      <div class="fl-hint-title">暂无历史版本</div>
    </div>
    <div class="fl-content" v-else>
      <el-timeline>
          <el-timeline-item v-for="(item,index) in listData" :key="item.id" :timestamp="item.time" placement="top">
            <el-card class="fl-version-item" >
              <h4 @click="previewVersion(item.id,index)" class="fl-version-title">{{item.name}}  时间:{{item.time}}</h4>
              <el-button v-if="index != 0" @click="returnVersion(item.id,index)" type="warning" size="small" round>还原</el-button>
              <span style="font-weight: 600;color:var(--fl-color-grey-content)" v-else>（当前版本）</span>
              <span style="font-weight: 600;color:var(--fl-color-grey-content)" v-show="item.id == currentPreview">（当前预览版本）</span>
            </el-card>
          </el-timeline-item>
      </el-timeline>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    article: Object,
    editor: Object,
    save: Function,
    exit: Function,
    preview: Object,
    saveArticle:Function
  },
  data() {
    return{
      currentPreview:'',
      truely:{},
      listData:[],
    }
  },
  created() {
    this.$apiFun.file.version.list(this.$route.query.id).then( res => {
      let list = res.data.articleVersionVOList;
      list.forEach( (item,index) => {
        this.listData.unshift({
          id: item.id,
          time: item.createTime,
          name:'第'+(index+1)+'版'
        })
      })
    })
  },
  methods: {
    returnVersion(id,index) {
      this.currentPreview = '';
      this.$apiFun.file.version.get(id).then( res=> {
        this.exit();
        this.$message( {
          type:'success',
          message:'还原成功'
        })
        this.article.title = res.data.title;
        this.article.digest = res.data.digest;
        this.editor.setHtml(res.data.html);
        this.save();
        this.saveArticle();
      });
    },
    previewVersion(id,index) {
      if(index == 0) {
        if(!this.preview.flag)this.exit();
        return ;
      }
      this.currentPreview = id;
      this.$apiFun.file.version.get(id).then( res=> {
        this.preview.flag = false;
        this.truely = this.article;
        this.$message( {
          type:'warning',
          message:'正处于预览模式（点击右上角按钮退出）'
        })
        this.article.title = res.data.title;
        this.article.digest = res.data.digest;
        this.editor.setHtml(res.data.html)
        this.editor.disable()
      });
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.el-timeline) {
  padding: 0;
}
.history {
  padding: 5rem;
}
.fl-none {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding: 8rem 0;
  
  img {
    width: 100%;
    height: 100%;
  }
  .fl-image-container {
    width: 100%;
    height: 32rem;
  }
  .fl-hint-title {
    margin: 3rem 0;
    font-size: 3.2rem;
    font-weight: 600;
    font-family: Microsoft Yahei;
    text-align: center;
  }
}
.fl-content {
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  padding: 1rem 3rem;
  width: 55rem;
  height: 60rem;
  overflow-y: auto;
}
.fl-version-item {
  border-radius: 1.6rem;
}
.fl-version-title {
  cursor: pointer;
  padding-left: .8rem
}

.fl-version-title:hover{ 
  color: var(--fl-color-theme);
}

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
  background-color: #f5f5f55f;
}
/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: var(--fl-color-grey);
}
</style>