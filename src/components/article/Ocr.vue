<template>
  <div class="history">
    <div class="fl-none" v-if="data == ''">
      <div class="fl-image-container"><img src="../../assets/image/ocr.svg"></div>
      <div class="fl-hint-title">上传图片，识别内容</div>
      <el-upload
      class="upload-demo"
      :show-file-list="false"
      :on-success="ocrSuccess"
      action="http://192.168.12.136:8000/ocr">
        <button>点击上传</button>
      </el-upload>

    </div>
    <div class="fl-content" v-else>
       <textarea v-model="data" rows="22"></textarea>
       <button @click="data = ''">返回</button>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    editor: Object
  },
  data() {
    return{
      data: '',
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
    ocrSuccess(res) {
      let arr = res.data;
      let str = "";
      arr.forEach(item => {
        str += item;
      })
      console.log(str);
      this.data = str;
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
button {
    margin: 0 auto;
    padding: 1rem 12rem;
    background-color: var(--fl-color-theme);
    border: none;
    border-radius: 4.8rem;
    font-size: 2.2rem;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
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
  textarea {
    width: 42rem;
    border: none;
    font-size: 2rem;
    font-family: OPPOSans;
    outline: none;
    resize: none;
  }
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