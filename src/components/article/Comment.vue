<template>
  <div class="comment">
    <div class="fl-commment-item">
      <div class="fl-comment-sender">
        <div class="fl-sender-inform">
          <img class="fl-sender-avatar" :src="comment.avatar">
          <span class="fl-sender-name">{{comment.username}}</span>
        </div>
        <span class="fl-sender-time">{{comment.createTime}}</span>
      </div>
      <div class="fl-comment-content">
        {{comment.content}}
      </div>
      <div class="fl-comment-option">
        <button @click="showInput('comment'+comment.id)">回复</button>
      </div>
      <div class="fl-textarea-common">
        <textarea class="fl-textarea" @blur="showInput('reply'+item.id)" :id="'comment'+comment.id" v-model="text" @keypress.enter="sendComment" placeholder="请输入一条友善的评论 (Enter键发送)"></textarea>
      </div>
      
      <div class="fl-reply-wrap fl-common" v-show="comment.reply.length!=0">
        
        <div class="fl-commment-item" v-for="item in comment.reply" :key="item">
          <div class="fl-comment-sender">
            <div class="fl-sender-inform">
              <img class="fl-sender-avatar-mini" :src="item.avatar">
              <span class="fl-sender-name ">{{item.username}}</span>
            </div>
            <span class="fl-sender-time">{{item.createTime}}</span>
          </div>
          <div class="fl-comment-content fl-mini">
            {{item.content}}
          </div>
          <div class="fl-comment-option fl-mini">
            <button @click="showInput('reply'+item.id)">回复</button>
          </div>
          <div class="fl-mini">
            <textarea class="fl-textarea" @blur="showInput('reply'+item.id)" :id="'reply'+item.id" v-model="reply" @keypress.enter="sendApply(item.id)" placeholder="请输入一条友善的评论 (Enter键发送)"></textarea>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object,
    sendReply: Function
  },
  mounted() {
    console.log(this.comment)
  },
  data() {
    return {
      text: '',
      reply:'',
    }
  },
  methods: {
    sendComment() {
      this.sendReply(this.comment,this.text);
      setTimeout(()=>{this.text = ''},100);
      this.hiddenInput();
    },
    sendApply(id) {
      this.sendReply(this.comment,this.reply,id);
      setTimeout(()=>{this.reply = ''},50);
      this.hiddenInput();
    },
    showInput(id) {
      let textareas = document.getElementsByClassName('fl-textarea');
      Array.prototype.forEach.call(textareas, function (element){
        element.style.display = '';
      });
      document.querySelector('#'+id).style.display = 'inline';
    },
    hiddenInput() {
      let textareas = document.getElementsByClassName('fl-textarea');
      Array.prototype.forEach.call(textareas, function (element){
        element.style.display = '';
      });
    }
  },
}
</script>

<style lang="less" scoped>
textarea {
   display: none;
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
 .comment {
  margin: 2rem 0;
 }
.fl-comment-item {
  display: flex;
  flex-flow: column;
  
}
.fl-comment-sender {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
}
.fl-sender-inform {
  display: flex;
  align-items: center;
}
.fl-sender-avatar {
  width: 5rem;
  height: 5rem;
}
.fl-sender-avatar-mini {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
}
.fl-sender-name {
  box-sizing: border-box;
  margin: 0 .5rem;
  font-size: 1.6rem;
  font-weight: 600;
}
.fl-sender-time {
  font-size: 1.5rem;
  color: var(--fl-color-grey-content);
}
.fl-comment-content {
  padding: 0 5.5rem;
  font-size: 1.5rem;
  color: var(--fl-color-grey-txt);
}
.fl-comment-option {
  padding: 0 5.5rem;
  margin: .1rem 0;
  button {
    padding: .5rem 0;
    background: transparent;
    border: 0;
    font-size: 1.4rem;
    cursor: pointer;
  }
}
.fl-reply-wrap {
  box-sizing: border-box;
  padding: 2rem 2.2rem;
  background-color: var(--fl-color-grey-light);
  border-radius: 1.6rem;
}
.fl-common {
  margin: 0 3.5rem 0 5.5rem;
}
.fl-textarea-common {
  padding: 0 5.5rem;
}
.fl-mini {
  padding: 0 4rem;
}
</style>