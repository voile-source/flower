<template>
  <div class="article">
    <div class="fl-article-wrap">
      <div class="fl-article-title">{{article.title}}</div>
      <div style="padding:1rem 0;"><span style="font-size:1.6rem">文章标签：</span><el-tag style="margin-right:.5rem" v-for="(item,index) in tagList" :key="'tag'+index">{{item}}</el-tag></div>
      <div class="fl-article-editor">
        <div class="fl-user">
          <img @click="to('/user',{id:article.userId})" :src="article.avatar">
          <div class="fl-user-inform">
            <span @click="to('/user',{id:article.userId})" class="fl-user-name">{{article.username}}</span>
            <span class="fl-user-data">{{article.createTime}} </span>
          </div>
        </div>
        <button class="fl-unAttention" v-if="!attention" @click="addAttention"><i class="el-icon-plus"></i>关注</button>
        <button class="fl-attention" v-else @click="addAttention">取消关注</button>
      </div>
      <div class="fl-article-content" v-html="article.html"></div>
      <div class="fl-title" id="comment">评论</div>
      <div class="fl-textarea-common">
        <textarea ref="" v-model="text" @keypress.enter="sendComment" placeholder="请输入一条友善的评论 (Enter键发送)"></textarea>
      </div>
      <div class="fl-comments-wrap">
        <Comment v-for="item in listData" :key="item.id" :comment="item" :sendReply="sendReply"></Comment>
      </div>
    </div>
    <div class="fl-data-wrap">
      <div class="fl-article-data hidden">
        <el-badge :value="article.likeNum" class="item"  v-if="!isLike">
          <button @click="like" >
            <img 
            @mouseover="likeHover($event.target)" 
            @mouseleave="likeMove($event.target)" 
            src="../../assets/image/like_grey.svg">
          </button>
        </el-badge>
        <el-badge :value="article.likeNum" class="item"  v-else>
          <button @click="like"><img src="../../assets/image/like_theme.svg"></button>
        </el-badge>
        <el-badge :value="article.collectNum" class="item" v-if="!isCollect">
          <button @click="dialogVisible = true" >
          <img 
          @mouseover="collectHover($event.target)" 
          @mouseleave="collectMove($event.target)" 
          src="../../assets/image/collect_grey.svg">
          </button>
        </el-badge>
        <el-badge :value="article.collectNum" class="item"  v-else>
          <button @click="collect"><img src="../../assets/image/collect_yellow.svg"></button>
        </el-badge>
        <el-badge :value="commentNum" class="item">
          <button @click="comment"><img src="../../assets/image/comment.svg"></button>
        </el-badge>
        <button class="fl-btn-collect" @click="canCollect">采集</button>
      </div>
    </div>
    <el-dialog
      title="收藏文章"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body=true
      :before-close="handleClose">
      <div class="fl-collect-wrap">
        <el-checkbox-group v-model="checkList">
          <div class="fl-collect-item" v-for="item in collectList" :key="item.id">
            <el-checkbox :label="item.id">{{item.name}}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="big" @click="collect">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="采集素材"
      :visible.sync="dialogCollect"
      width="30%"
      append-to-body=true
      :before-close="handleClose">
      <el-form>
        <el-form-item label="素材名称">
          <el-input v-model="name" placeholder="请输入素材名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogCollect = false">取 消</el-button>
        <el-button type="primary" size="big" @click="collectMaterial">采 集</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Comment from '../../components/article/Comment.vue'
import { _debounce, _throttle, _to } from '@/util/util'
export default {
  components: {
    Comment
  },
  data() {
    return {
      listData: [],
      collectList: [],
      text:'',
      article: {},
      attention: false,
      isLike:false,
      isCollect:false,
      commentNum: 0,
      dialogVisible: false,
      checkList: [],
      tagList: [],
      name: '',
      dialogCollect: false,
      collectData: ''
    }
  },
  watch:{
    $route: {
      handler() {
        console.log(this.$route.query.id);
      },
      handleClose(done) {
        this.name = '';
        done();
      }
    },
  },
  created() {
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener('mousewheel',this.handleScroll)||window.removeEventListener("DOMMouseScroll",this.handleScroll)
  },
  mounted() {
    window.addEventListener('mousewheel',this.handleScroll, true)
  },
  methods: {
    init() {
      this.$apiFun.material.get(this.$route.query.id). then( res => {
        this.article = res.data.mediumMessage;
        this.tagList = this.article.tags;
        this.listData = res.data.commentList;
        this.attention = this.article.isFollowed;
        this.isLike = this.article.isLiked;
        this.isCollect = this.article.isCollected;
        this.listData.forEach( item => {
          this.commentNum++;
          this.commentNum+=item.reply.length;
        })
      });
      this.$apiFun.material.collect.list().then(res=> {
        this.collectList = res.data.collectFolderList;
      })
    }, 
    canCollect() {
      let selectionObj = window.getSelection();
      let selectedText = selectionObj.toString();
      if (selectedText == '') {
        this.$message({
          type: 'warning',
          message: '请先选中文本'
        });
        return ;
      }
     
      this.collectData = selectedText;
      this.dialogCollect = true;
    },
    handleScroll: _debounce(function(e){
        let direction = e.deltaY > 0 ? 'down' : 'up'
        let nav = document.querySelector(".fl-article-data");
        if(direction == 'down') {
          nav.style.opacity=1;
        } else  {
          if(document.documentElement.scrollTop <= 150) {
            nav.style.opacity=0;
          }
        }
    },100),
    likeHover(like) {
      like.src=require('../../assets/image/like_black.svg')
    },
    likeMove(like) {
      like.src=require('../../assets/image/like_grey.svg')
    },
    collectHover(collect) {
      collect.src=require('../../assets/image/collect_black.svg')
    },
    collectMove(collect) {
      collect.src=require('../../assets/image/collect_grey.svg')
    },
    comment(){
      let comment = document.querySelector("#comment");
      window.scrollTo({
        top: comment.offsetTop,
        behavior: "smooth",
      });
    },  
    like(){
      if(!this.isLike) {
        this.$apiFun.material.like.add(this.article.materialId).then( res=> {
          this.isLike = true;
          this.article.likeNum++;
        })
      } else {
        this.$apiFun.material.like.remove(this.article.materialId).then( res=> {
          this.isLike = false;
          this.article.likeNum--;
        })
      }
    },
    collect() {
      if(!this.isCollect) {
        this.$apiFun.material.collect.add(this.article.materialId,this.checkList).then( res=> {
          this.$message( {
            type:'success',
            message:'收藏成功'
          })
          this.dialogVisible = false;
          this.isCollect = true;
          this.article.collectNum++;
        })
      } else {
        this.$apiFun.material.collect.remove(this.article.materialId).then( res=> {
          this.isCollect = false;
          this.article.collectNum--;
        })
      }
    },
    collectMaterial() {
      if (this.name == '') {
        this.$message.error('请输入素材名称');
        return;
      }
      this.$store.state.materialList.push({
        name: this.name,
        content: this.collectData
      });
       this.$message({
        type: 'success',
        message: '采集成功'
      })
      this.name = '';
      this.collectData = '';
      this.dialogCollect = false;
    },
    sendReply(comment,text,id=null) {
      this.$apiFun.material.send( {
        ancestorId:comment.id,
        content:text,
        materialId:this.$route.query.id,
        parentId:id==null?comment.id:id
      }).then( res => {
        comment.reply.push( {
          id: res.data.commentId,
          avatar: this.$store.state.user.avatar,
          username: this.$store.state.user.username,
          content: text,
          createTime: res.data.createTime,
        })
      })
    },
    addAttention() {
      if(!this.attention) {
        this.$apiFun.user.attention(this.article.userId).then( res => {
          this.attention = true;
          this.$notify({
            title: '关注成功',
            type: 'success',
            offset: 100
          });
        })
      } else {
        this.$apiFun.user.unAttention(this.article.userId).then( res => {
          this.attention = false;
          this.$notify({
            title: '取消关注成功',
            type: 'success',
            offset: 100
          });
        })
      }
    },
    sendComment() {
      this.$apiFun.material.send( {
        ancestorId:'',
        content:this.text,
        materialId:this.$route.query.id,
        parentId:''
      }).then( res => {
        this.commentNum ++;
        this.listData.push( {
          id: res.data.commentId,
          avatar: this.$store.state.user.avatar,
          username: this.$store.state.user.username,
          content: this.text,
          createTime: res.data.createTime,
          reply: []
        })
        setTimeout(()=>{this.text = ''},100);
      })
    },
    to(url,params) {
      _to(url,params);
    }
  },
}
</script>

<style lang="less" scoped>

textarea {
   box-sizing: border-box;
   width: 100%;
   padding: 1rem;
   margin: .8rem 0;
   border: .1rem solid var(--fl-color-grey);
   border-radius: .4rem;
   font-size: 1.6rem;
   font-family: Mircosoft Yahei;
   outline: none;
   resize: none;
 }
textarea:focus {
  border: .1rem solid var(--fl-color-theme);
  outline: var(--fl-color-theme) solid .1rem;
}
.article {
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 3rem 0;
  background-color: var(--fl-color-grey-light);
}
.fl-article-wrap {
  display: flex;
  flex-flow: column;
  min-width: 85rem;
  max-width: 85rem;
  padding: 6rem 4rem;
  border-radius: 1.6rem;
  box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
  background: #fff;
  .fl-article-title {
    font-size: 3rem;
    font-weight: 600;
  }
  .fl-article-editor {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    .fl-unAttention {
      padding: .8rem 3rem;
      background-color: var(--fl-color-theme);
      border: .1rem solid var(--fl-color-theme-light);
      color: white;
      border-radius: 1.2rem;
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      font-size: 1.8rem;
      font-weight: 600;
      cursor: pointer;
      i {
        margin-right: .2rem;
        font-size: 1.3rem;
        font-weight: 600;
      }
    }
    .fl-attention {
      padding: .8rem 3rem;
      background-color: var(--fl-color-theme-light);
      border: .1rem solid var(--fl-color-theme);
      box-shadow: 0 2px 10px rgb(0 0 0 / 12%);
      border-radius: 1.2rem;
      font-size: 1.8rem;
      font-weight: 600;
      color: var(--fl-color-theme);
      cursor: pointer;
    }
    .fl-user {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      img {
        width: 6rem;
        height: 6rem;
        border-radius: 50%;
        cursor: pointer;
      }
      .fl-user-inform {
        margin: 3rem .4rem;
        display: flex;
        flex-flow: column;
        .fl-user-name {
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--fl-color-grey-title);
          cursor: pointer;
        }
        .fl-user-name:hover {
          color: var(--fl-color-black);
        }
        .fl-user-data { 
          margin: .5rem 0 0 0;
          font-size: 1.5rem;
          color: var(--fl-color-grey-content);
        }
      }
    }
  }
  
  .fl-title{
    margin: 1rem 0;
    font-size: 2.4rem;
  }
  .fl-article-content {
    font-size: 1.8rem;
    img {
      width: 60rem !important;
      height: 40rem !important;
    }
  }
}

.fl-article-data {
    opacity: 0;
    transition: opacity .65s ease-in-out;
    display: flex;
    flex-flow: column;
    position: fixed;
    padding: 2rem 3rem;
    margin: 9rem 0;
    button {
      box-sizing: border-box;
      margin-bottom: 2.5rem;
      padding: 1.4rem;
      width: 6rem;
      height: 6rem;
      background: #fff;
      border-radius: 50%;
      border: none;
      box-shadow: rgba(0,0,0,0.08) 0px 4px 6px 0px,rgba(0,0,0,0.05) 0px 0px 0px 1px;
      font-size: 1.6rem;
      cursor: pointer;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
.fl-collect-wrap {
  height: 25rem;
  overflow-y: auto;
  padding:0 1rem
}
.fl-collect-item {
  padding:0 1.5rem;
  margin-bottom: 2rem;
}
:deep(.el-checkbox__label) {
  font-size: 1.6rem;
}
:deep(.el-checkbox__inner) {
  width: 2rem;
  height: 2rem;
}
:deep(.el-checkbox__inner)::after {
  width: .5rem;
  height: 1.2rem;
  left: .5rem;
  top: 0;
}
.fl-btn-collect {
  background: var(--fl-color-theme) !important;
  font-weight: 900;
  color: #fff;    
}
</style>