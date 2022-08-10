<!-- # src/App.vue -->
<template>
  <div class="mk-main">
    <el-dialog
      title="发布文章"
      :visible.sync="dialogVisible"
      width="50%">
      <div class="fl-upload-wrap">
        <div class="fl-upload-item fl-upload-cover">
          <span class="fl-upload-title">文章封面</span>
          <span>
            <el-radio-group v-model="upload.cover">
              <el-radio :label="0">无封面</el-radio>
              <el-radio :label="1">有封面</el-radio>
            </el-radio-group>
            <el-upload
              v-show="upload.cover == 1"
              class="avatar-uploader"
              action="http://localhost:3000/common/upload/img"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess">
              <img v-if="upload.coverUrl!=''" :src="upload.coverUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </span>
        </div>
        <div class="fl-upload-item fl-upload-type">
          <span class="fl-upload-title">文章摘要</span>
          <span >
            <el-input
              type="textarea"
              class="mk-extra-textarea"
              :autosize="{minRows:4}"
              resize="none"
              placeholder="请输入内容"
              @blur="saveArticle"
              v-model="article.digest">
            </el-input>
          </span>
          <button @click="createDiscription">生成摘要</button> 
        </div>
        <div class="fl-upload-item fl-upload-type">
          <span class="fl-upload-title">文章类型</span>
          <el-select class="fl-upload-input" v-model="upload.type" placeholder="请选择">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="fl-upload-item fl-upload-tags">
          <span class="fl-upload-title">文章标签</span>
          <div>
            <input class="fl-upload-input fl-tag-input" @keypress.enter="addTag" v-model="tagText"  type="text" placeholder="键入以自定义标签">
            <div class="fl-upload-selected fl-upload-input" v-show="selectTagList.length !=0">
              <el-tag v-for="(item,index) in selectTagList" :key="item" :disable-transitions="false"  closable @close="deleteTag(index,item)">{{item}}</el-tag>
            </div>
            <div class="fl-upload-select" v-show="tagList.length !=0">
              <el-tag type="info" v-for="(item,index) in tagList" :key="item.id" @click="selectTag(item,index)">{{item}}</el-tag>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadArticle">发 布</el-button>
      </span>
    </el-dialog>

    <div class="mk-header">
      <ul class="mk-header-left">
        <router-link to="/workspace"><li class="mk-li-home"><i class="el-icon-s-home"></i></li></router-link>
        <li class="mk-li-title">{{article.title===''?'无标题文档':article.title}}</li>
        <li class="mk-li-save" v-show="isSave">
          <svg class="mk-success" width="18" height="18" >
            <circle fill="none" cx="9" cy="9" r="8" class="circle animation-circle"/>
            <polyline fill="none" class="tick animation-tick" points="4,10 8,13 13,6"/>
          </svg>
          <span v-show="!save" class="mk-save-text">文章已保存</span>
          <span v-show="save " class="mk-save-text">已保存</span>
        </li>
      </ul>
      <ul class="mk-header-right">
        <li class="mk-li-user">
         <img @click="to('/user')" class="mk-user-avatar" :src="$store.state.user.avatar">
          <ul class="mk-user-select">
            <li @click="to('/index')" class="mk-select-item"><div><i class="el-icon-house"></i><span class="select-item-title">前往首页</span></div><i class="el-icon-arrow-right"></i></li>
            <li @click="to('/user')" class="mk-select-item"><div><i class="el-icon-user-solid"></i><span class="select-item-title">个人中心</span></div><i class="el-icon-arrow-right"></i></li>
            <li @click="to('/setting')" class="mk-select-item"><div><i class="el-icon-setting"></i><span class="select-item-title">账号设置</span></div><i class="el-icon-arrow-right"></i></li>
            <li @click="logout" class="mk-select-item"><div><i class="el-icon-switch-button"></i><span class="select-item-title">退出登录</span></div><i class="el-icon-arrow-right"></i></li>
          </ul>
        </li>
        <li style="margin-right: 4rem">
          <div class="fl-input-wrap" v-if="preview.flag">
            <button class="fl-button-upload" @click="getTypeList">发布文章</button>
            <button class="fl-button-output" @click="output">导出文章</button>
          </div>
           <div class="fl-input-wrap" v-else>
            <button class="fl-button-exitPreview" @click="$router.go(0)">退出预览</button>
          </div>
        </li>
      </ul>
    </div>
    <nav class="mk-nav">
      <Toolbar
        style="border-bottom: 1px solid #E8E8E8"
        :editor="editor"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
    </nav>
    
    <div class="mk-container">
      <div class="mk-catalog">
      </div>
      <div class="mk-content">
        <div class="mk-title">
          <input class="mk-title-input" placeholder="请输入标题"  maxlength="20" v-model="article.title" @blur="saveArticle"> 
          <button class="mk-title-button" @click="createTitle">生成标题</button>
        </div>
        <Editor
          class="mk-editor"
          v-model="html"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="onCreated"
        />
      </div>
      <div class="mk-extra">
        <div class="mk-extra-container">
          <div class="mk-extra-select">
            <button @click="selectChange($event.target,0)" class="active">文章校验</button>
            <button @click="selectChange($event.target,1)">文章摘要</button>
            <button @click="selectChange($event.target,2)">文章翻译</button>
            <button @click="selectChange($event.target,3)">词典查询</button>
            <button @click="selectChange($event.target,4)">文字识别</button>
            <button @click="selectChange($event.target,5)">历史版本</button>
          </div>
          <div class="mk-extra-option">
            <Check ref="check" :editor="editor" :set="setHtml" v-if="extraOption == 0"></Check>
            <Digest v-if="extraOption == 1" :article="article" :create="createDiscription" :save="saveArticle"></Digest>
            <Translate v-if="extraOption == 2" :editor="editor"></Translate>
            <Dictionary v-if="extraOption == 3"></Dictionary>
            <Ocr v-if="extraOption == 4" :editor="editor"></Ocr>
            <History 
             v-if="extraOption == 5" 
             ref="history"  
             :article="article" 
             :preview="preview" 
             :editor="editor" 
             :exit="exitPreview"
             :saveArticle="saveArticle"
             :save="saveVersion"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../assets/css/index.css'
import {_throttle,_to} from '../../util/util'
import { saveAs } from 'file-saver';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import htmlDocx from 'html-docx-js/dist/html-docx';
import Check from '../../components/article/Check'
import Digest from '../../components/article/Digest'
import Translate from '../../components/article/Translate'
import Dictionary from '../../components/article/Dictionary'
import Ocr from '../../components/article/Ocr'
import History from '../../components/article/History'


export default {
    components: { 
      Editor, 
      Toolbar,
      Check,
      Digest,
      Translate,
    Dictionary,
      Ocr,
      History
    },
    data() {
        return {
            editor: null,
            html: '',
            toolbarConfig: {
              excludeKeys: [
                'fullScreen',
                'todo',
                'emotion',
                'bgColor',
                'color',
                'sub',
                'sup'
              ],
              toolbarKeys: [
                'undo',
                'redo',
                'clearStyle',

                '|',

                {
                  key: 'group-insert', // 必填，要以 group 开头
                  title: '更多样式', // 必填
                  iconSvg: '<svg t="1652289587831" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4263" width="256" height="256"><path d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z" p-id="4264"></path><path d="M256 544a32 32 0 0 1 0-64h512a32 32 0 0 1 0 64H256z" p-id="4265"></path><path d="M480 256a32 32 0 0 1 64 0v512a32 32 0 0 1-64 0V256z" p-id="4266"></path></svg>', // 可选
                  menuKeys: ["uploadImage","insertTable","insertLink","code","divider"] // 下级菜单 key ，必填
                },

                '|',
                
                'headerSelect',
                'fontFamily',
                'fontSize',
                'bold',
                'italic',
                'underline',
                'through',
                'sub',
                'sup',
                'bgColor',
                'color',

                '|',

                'bulletedList',
                'numberedList',
                'indent',
                'delIndent',
                 {
                  key: 'group-align', // 必填，要以 group 开头
                  title: '对齐方式', // 必填
                  iconSvg: '<svg t="1652290362733" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5081" width="256" height="256"><path d="M96 128h832v96H96zM96 576h832v96H96zM96 352h576v96H96zM96 800h576v96H96z" p-id="5082"></path></svg>',
                  menuKeys: ["justifyLeft","justifyRight","justifyCenter","justifyJustify"] // 下级菜单 key ，必填
                },
                'lineHeight',
              ]
             },
            editorConfig: { 
              placeholder: '请输入内容...',
              MENU_CONF: {
                uploadImage : {
                  server:'http://10.251.9.214:8080/article/image',
                  fieldName: 'file',
                  customInsert(res, insertFn) {
                    // 从 res 中找到 url alt href ，然后插图图片
                    insertFn(res.data.url, res.data.alt, res.data.href)
                  },
                  onSuccess(file, res) {
                    this.saveArticle();
                  },
                }
              }
            },
            mode: 'default', // or 'simple'
            save: false,
            isSave: false,
            isAccess: false,
            timer: null,
            article: {},
            imageUrl:'',
            dialogVisible: false,
            typeList:[],
            selectTagList:[],
            tagList:[],
            tagText: '',
            upload: {
              cover:0,
              coverUrl:'',
              type:'',
              tags:[]
            },
            versionSave: true,
            saves: true,
            extraOption:'0',
            preview: {
              flag:true
            } 
        }
    },
    mounted() {
        // 模拟 ajax 请求，异步渲染编辑器
        // setTimeout(() => {
        //     this.html = '<p>模拟 Ajax 异步设置内容 HTML</p>'
        // }, 1500)
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
        this.saveVersion();
    },
    watch: {
      html: {
        handler(newValue, oldValue) {
          if(!this.saves || !this.preview.flag)return ;
          clearTimeout(this.timer);
          this.timer = setTimeout(()=> {
            this.saveArticle();
            clearTimeout(this.timer);
          },400)
        }
      },
      $route: {
        handler() {
          console.log(this.$route.query.id);
        }
      }
    },
    methods: {
        onCreated(editor) {
          this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错
          this.$apiFun.file.get(this.$route.query.id).then( res => {
            this.article = res.data;
            this.html = res.data.html;
          })
        },
        logout() {
           this.$apiFun.logout();
           this.$store.state.isLogin = false;
           this.$store.state.user = '';
           localStorage.removeItem('token')
           _to('/index')
        },
        //导出为word文件
        output() {
          let htmlStr = `
            <!DOCTYPE html>
            <html lang="en">
              <body style="font-family:方正仿宋_GBK;mso-ascii-font-family:'Times New Roman';">
                ${this.editor.getHtml}
              </body>
            </html>`;  //把获取到的html放入到原生的html中
          saveAs(
            htmlDocx.asBlob(htmlStr, { orientation: 'landscape' }),
            this.article.title+'.docx'
          ).then( ()=>{
            this.$message( {
              type:'success',
              message:'导出成功'
            })
          });  // 导出为word
        },
        exitPreview() {
          // this.article = this.$refs.history.truely;
          // this.editor.setHtml(this.article.html);
          this.editor.enable;
          this.preview.flag = true;
        },
        selectChange(select,id) {
          this.extraOption = id;
          let tags = document.getElementsByClassName('active');
          Array.prototype.forEach.call(tags, function (tag) {
            tag.classList.remove('active')
          });
          select.classList.add('active')
        },
        to(url,query) {
          let active = document.querySelector(".active");
          if(active != null) {
            active.classList.remove("active")
          }
          document.querySelector(".mk-user-select").style.visibility = 'hidden';
          _to(url,query);
          setTimeout(()=>{document.querySelector(".mk-user-select").style = '';
          },500);
        },
        beforeAvatarUpload(file) {
          // const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
          // const isLt2M = file.size / 1024 / 1024 < 2;

          // if (!isJPG) {
          //   this.$message.error('上传头像图片只能是 JPG 格式!');
          // }
          // if (!isLt2M) {
          //   this.$message.error('上传头像图片大小不能超过 2MB!');
          // }
          // return isJPG && isLt2M;
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = res.data;
          this.upload.coverUrl = URL.createObjectURL(file.raw);
        },
        getTypeList() {
          if(this.title == '') {
            this.$message.error('请输入标题');
            return ;
          }
          this.$apiFun.material.list().then( res=> {
            this.typeList = res.data.typeList;
            this.dialogVisible = true;
            // this.$apiFun.file.tagList(this.editor.getText()).then( res => {
            //   this.tagList = res.data;
              
            // })
          })
        },
        setHtml(html) {
          let data = `<span data-slate-leaf="true"><span data-slate-string="true" style="color: rgb(255, 77, 79);">${html}</span></span>`;
          this.editor.setHtml(this.html.replace(html,''))
        },
        addTag() {
          this.selectTagList.push(this.tagText);
          this.tagText = '';
        },
        deleteTag(index,name) {
          this.selectTagList.splice(index,1);
          this.tagList.push(name);
        },
        selectTag(name,index) {
          this.tagList.splice(index,1);
          this.selectTagList.push(name);
        },
        saveVersion() {
          //销毁页面时保存历史版本
          this.$apiFun.file.version.add({
            articleId: this.article.id,
            digest: this.article.id,
            html: this.editor.getHtml(),
            text: this.editor.getHtml(),
            title: this.article.title
          })
        },
        uploadArticle() {
         
          this.$apiFun.file.upload( {
            cover: this.imageUrl,
            digest: this.article.digest,
            html: this.editor.getHtml(),
            materialTypeId: this.upload.type,
            tagNameList: this.selectTagList,
            text: this.editor.getText(),
            title: this.article.title
          }).then( res => {
            if(res.code == 200) {
              this.$message( {
                message:"上传成功，请等待审核",
                type: "success"
              })
            } else {
              this.$message.error(res.message)
            }
            this.dialogVisible = false;
          });
        },
        
        /** 生成标题 */
      createTitle() {
          this.article.title = '大力弘扬企业家精神';
            console.log(this.article.title)
            this.saveArticle();
          // if(!this.preview.flag) {
          //   this.$messgae.error("当前正处于预览状态");
          //   return ;
          // }
          // this.$apiFun.file.create.title(this.editor.getText()).then( res => {
          //   console.log(res.data.title == '' )
          //   if(res.data.title == '') {
          //     this.$message( {
          //       message:'文章内容太少了，写多一点再来生成吧',
          //       type:'warning'
          //     })
          //     return ;
          //   }
          //   this.article.title = res.data.title;
          //   console.log(this.article.title)
          //   this.saveArticle();
          // });
        },
        /** 生成摘要 */
        createDiscription() {
          if(!this.preview.flag) {
            this.$messgae.error("当前正处于预览状态");
            return ;
          }
          this.$apiFun.file.create.digest(this.editor.getText()).then( res => {
            this.article.digest = res.data.digest;
            this.saveArticle();
          });
          
        },
        /** 保存文章 */
        saveArticle() {
          if(!this.isAccess) {
            this.isAccess = true;
            return ;
          } else {
            this.isSave = true;
          }
          let editor = this.editor;
          let text = editor.getText();
          let html = editor.getHtml();
          let circle = document.querySelector(".circle");
          let tick = document.querySelector(".tick");
          this.$apiFun.file.edit(this.$route.query.id,{
            digest: this.article.digest,
            html: html,
            text: text,
            title: this.article.title==''?'未命名的文件':this.article.title,
            loading: false
          }).then( res => {
            this.save = true;
            circle.classList.add("animation-circle");
            tick.classList.add("animation-tick");
            setTimeout(()=>{
              this.save = false;
              circle.classList.remove("animation-circle");
              tick.classList.remove("animation-tick");
              circle.style.strokeDashoffset = 100;
              tick.style.strokeDashoffset = 0;
            },500);
            // this.$apiFun.file.correct(text).then(res => {

            // })
            this.$refs.check.init();
          })
        },
    }
}
</script>

<style lang="less" scoped>
 .avatar-uploader :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin: 2rem 0 2rem 20rem;
    height: 13.5rem;
    width: 24rem;
  }
  .avatar-uploader :deep(.el-upload):hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 24rem;
    height: 13.5rem;
    line-height: 13.5rem;
    text-align: center;
  }
  .avatar {
    display: block;
    object-fit: scale-down;
    height: 13.5rem;
    width: 24rem;
  }
.circle {
  stroke: var(--fl-color-grey-txt);
  stroke-width: 1;
  stroke-linecap: round;
  transform: rotate(-90 9 9);
  stroke-dasharray: 50;
  stroke-dashoffset: 50;
}
.animation-circle {
  animation: circle .6s ease-in-out;
  animation-fill-mode: both;
}
.tick {
  stroke: var(--fl-color-grey-txt);
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: 25;
  stroke-dashoffset: 25;
}
.animation-tick {
  animation: tick .5s ease-out;
  animation-fill-mode: both;
  animation-delay: .55s;
}
@keyframes circle {
  from {
    stroke-dashoffset: 50;
  }
  to {
    stroke-dashoffset: 100;
  }
}

@keyframes tick {
  from {
    stroke-dashoffset: 25;
  }
  to {
    stroke-dashoffset: 0;
  }
}

/* 组件样式 */
input { 
  outline: none;
}
ul,li {
  list-style: none;
}
.mk-main {
  min-width: 120rem;
}
.mk-header {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #E8E8E8;
  height: 55px;
  z-index: 2000;
}
.mk-nav {
  width: 100%;
  min-width: 150rem;
  position: fixed;
  top: 56px;
  left: 0;
  background: #fff;
  z-index: 1000;
}
.mk-container {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: #F5F5F5;
  min-height: 100vh;
  padding: 9rem 0 2rem 0;
}
.mk-content {
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  margin-top: 2rem;
  padding: 3rem;
  background-color: #fff;
}

.mk-editor {
  min-height: 70rem;
  width: 850px; 
  margin-top: 20px;
  overflow-y: hidden;
}
.mk-title {
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #E8E8E8;
}
.mk-title-input{
  height: 42px;
  border: none;
  font-size: 30px;
  width: 70rem;
}
.mk-title-button {
  background: transparent;
  border: 0;
  border-bottom: .1rem solid var(--fl-color-grey-title);
  font-size: 2.6rem;
  padding: .4rem ;
  color: var(--fl-color-grey-title);
  cursor: pointer;
}
.mk-header-left, .mk-header-right {
  display: flex;
  flex-flow: row;
  align-items: center;
}
.mk-li-home {
  color: #5A5E66;
  font-size: 24px;
  cursor: pointer;
}
.mk-li-title {
  width: 12rem;
  margin-left: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: left;
  text-overflow:ellipsis;
	overflow:hidden;
	white-space:nowrap;
}
.mk-li-save {
  box-sizing: border-box;
  margin-left: 3rem;
  display: flex;
  align-items: center;
  padding-top: .2rem;
}
.mk-save-text {
  margin: 0 .6rem;
  font-size: 1.5rem;
  color: var(--fl-color-grey-txt);
}
.mk-li-user {
  display: flex;
  justify-content: center;
  flex-flow: column;
  width: 20rem;
}
@keyframes init_avatar {
  0% { width: 96px;height: 96px;margin-top: 60px;}
  100% {width: 40px;height: 40px;margin-top:0;}
}
.mk-user-avatar {
  margin: 0 0 0 12rem;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 8000;
}
@keyframes display {
  0% {opacity: 0;}
  100% {opacity: 1;}
}
.mk-user-avatar:hover+.mk-user-select{
  animation: display .4s ease both;
}
.mk-user-avatar:hover+.mk-user-select,
.mk-user-select:hover{
  visibility: visible;
}
.mk-user-select {
  box-sizing: border-box;
  position: absolute;
  top:5rem;
  margin-left: 4rem;
  width: 20rem;
  visibility: hidden;
  transition: visibility .2s;
  padding: 15px 10px;
  background: white;
  border: 1px solid #E8E8E8;
  border-radius: 8px;
  z-index: 6000;
}
@keyframes unbg {
  0% {background: #F3F5F7;}
  100% {background: #fff;}
}
.mk-select-item {
  height: 42px;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  border-radius: 8px;
  line-height: 42px;
  font-size: 16px;
  color: #61666D;
  cursor: pointer;
  animation: unbg .6s ease both;
}
@keyframes bg {
  0% {background: #fff;}
  100% {background: #F3F5F7;}
}
.mk-select-item:hover {
  background: #F3F5F7;
  animation: bg .4s ease both;
}
.select-item-title {
  margin-left: 12px;
}
.mk-catalog {
  width: 100%;
}
.mk-extra {
  box-sizing: border-box;
  width: 100%;
  min-width: 66rem;
  padding: 3rem 3rem;
}
.mk-extra-container {
  // position: fixed;
}

.fl-input-wrap {
  display: flex;
  justify-content: space-around;
  width: 25rem;
  button {
    width: 45%;
    height: 3.8rem;
    background: var(--fl-color-theme);
    border: 0;
    border-radius: 4.8rem;
    font-size: 1.6rem;

    color: #fff;
    cursor: pointer;
  }
  button:not(:first-child) {
    background-color: transparent;
    color: var(--fl-color-theme);
    border: .1rem solid var(--fl-color-theme); 
  }
}
.fl-upload-wrap {
  padding: 2rem;
  border: .1rem solid var(--fl-color-grey);
  border-radius: 1.6rem;
}
.fl-upload-item {
  margin: 2.4rem 0 ;
}
.fl-upload-title {
  margin-left: 10rem;
  margin-right: 3rem;
  font-size: 1.6rem;
}
.fl-upload-input {
  width: 32rem;
}
.fl-tag-input{  
  box-sizing: border-box;
  height: 3.6rem;
  padding-left: 1.5rem;
  border: .1rem solid #DCDFE6;
  border-radius: .4rem;
}
.fl-tag-input::-webkit-input-placeholder {
  color: #CACDD4;
}
.fl-upload-type {
  display: flex;
  flex-flow: row ;
  align-items: center;
  button {
   margin: 0 2rem;
   background-color: transparent;
   border: 0;
   border-bottom: .1rem solid var(--fl-color-grey-txt);
   font-size: 1.6rem;
   color: var(--fl-color-grey-txt);
   cursor: pointer;
  }
  :deep(.el-textarea__inner) {
    width: 32rem;
    font-size: 1.6rem;
    font-family: Microsoft Yahei;
  }
}
.fl-upload-tags {
  display: flex;
  flex-flow: row;
  .fl-upload-title {
    margin-top: .5rem;
  }
  .fl-upload-select {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 1rem;
    padding: 1rem;
    margin: 1rem 0;
    border: .1rem solid #DCDFE6;
    border-radius: .4rem;
    :deep(.el-tag) {
      cursor:pointer;
    }
  }
  .fl-upload-selected {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 1rem;
    margin: 1rem 0;
    padding: 1rem;
    background: var(--fl-color-grey-back);
    border-radius: .4rem;
  }
}
.mk-extra-select {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
  
  margin-bottom: 1.5rem;
  button {
    padding: .5rem 0;
    background: none;
    border: none;
    font-size: 1.8rem;
    cursor: pointer;
  }
  .active {
    font-weight: 600;
    border-bottom: .2rem solid var(--fl-color-theme);
  }
}
.mk-extra-option {
  display: flex;
  justify-content: center;
  height: 73rem;
  min-width: 49rem;
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
}
</style>