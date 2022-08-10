<template>
  <div class="setting">
    <div class="fl-setting">
      <div class="fl-title-main">账号设置</div>
      <div class="fl-title-slave">基本信息</div>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <div style="display:flex;flex-flow:row;align-items:center">
            <span class="fl-title-item">头像</span>
            <img :src="$store.state.user.avatar">
          </div>
          <span class="fl-setting-content">支持2M以内的.JPG.PNG图片格式</span>
        </div>
        <button class="fl-button" @click="avatarDialog = true">修改头像</button>
      </div>
      <el-dialog
        title="修改头像"
        :visible.sync="avatarDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="name">
        <span slot="footer" class="dialog-footer">
          <el-button @click="avatarDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateAvatar">确 定</el-button>
        </span>
      </el-dialog>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <span class="fl-title-item">昵称</span>
          <span class="fl-setting-content">{{$store.state.user.username}}</span>
        </div>
        <button class="fl-button" @click="renameDialog = true">修改昵称</button>
      </div>
      <el-dialog
        title="修改昵称"
        :visible.sync="renameDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="name">
        <span slot="footer" class="dialog-footer">
          <el-button @click="renameDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateName">确 定</el-button>
        </span>
      </el-dialog>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <span class="fl-title-item">个人简介</span>
          <span class="fl-setting-content" v-if="$store.state.user.desc != null">{{$store.state.user.desc}}</span>
          <span class="fl-setting-content" v-else>这个人很懒，还什么都没有写...</span>
        </div>
        <button class="fl-button" @click="descDialog = true">修改简介</button>
      </div>
      <el-dialog
        title="修改简介"
        :visible.sync="descDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="name">
        <span slot="footer" class="dialog-footer">
          <el-button @click="descDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateDesc">确 定</el-button>
        </span>
      </el-dialog>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <span class="fl-title-item">邮箱</span>
          <span class="fl-setting-content" v-if="$store.state.user.email != null">{{$store.state.user.email}}</span>
          <span class="fl-setting-content" v-else>暂未绑定</span>
        </div>
        <button v-if="$store.state.user.email == null" class="fl-button" @click="emailDialog = true">立即绑定</button>
        <div v-else>
          <button class="fl-button" @click="phoneDialog = true">更换邮箱</button>
          <button class="fl-button fl-button-error">解除绑定</button>
        </div>
      </div>
      <el-dialog
        title="修改邮箱"
        :visible.sync="emailDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="name">
        <span slot="footer" class="dialog-footer">
          <el-button @click="emailDialog = false">取 消</el-button>
          <el-button type="primary" @click="updateEmail">确 定</el-button>
        </span>
      </el-dialog>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <span class="fl-title-item">手机号</span>
          <span class="fl-setting-content">1867****211</span>
        </div>
        <div>
          <button class="fl-button" @click="phoneDialog = true">更换手机</button>
          <button class="fl-button fl-button-error">解除绑定</button>
        </div>
      </div>
      <el-dialog
        title="修改手机号"
        :visible.sync="phoneDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="name">
        <span slot="footer" class="dialog-footer">
          <el-button @click="phoneDialog = false">取 消</el-button>
          <el-button type="primary" @click="updatePhone">确 定</el-button>
        </span>
      </el-dialog>
      <div class="fl-setting-item">
        <div class="fl-setting-title">
          <span class="fl-title-item">密码</span>
          <span class="fl-setting-content">已设置</span>
        </div>
        <button class="fl-button" @click="passwordDialog = true">修改密码</button>
      </div>
      <el-dialog
        title="修改密码"
        :visible.sync="passwordDialog"
        width="25%"
        :append-to-body="true">
        <input class="fl-input-rename" v-model="password">
        <span slot="footer" class="dialog-footer">
          <el-button @click="passwordDialog = false">取 消</el-button>
          <el-button type="primary" @click="updatePassword">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  
  data() {
    return {
      avatarDialog: false,
      renameDialog: false,
      descDialog: false,
      emailDialog: false,
      phoneDialog: false,
      passwordDialog: false,
      name:'',
      password:'', 
    }
  },
  methods: {
    updateAvatar() {

    },
    updateName() {

    },
    updateDesc() {

    },
    updateEmail() {

    },
    updatePhone() {

    },
    updatePassword() {
      this.$apiFun.updatePassword(this.$store.state.user.id,md5(this.password));
    },
  }
}

</script>

<style lang="less" scoped>
.setting {
  padding: 1rem 30rem;
  min-width: 50rem;
  background: var(--fl-color-grey-light);
  color: var(--fl-color-black);
}
.fl-setting {
  padding: 5rem 5rem;
  background: #fff;
  border-radius: .8rem;
}
.fl-title-main {
  font-size: 3.2rem;
  font-weight: 600;
}
.fl-title-slave {
  font-size: 2.4rem;
  margin: 3.2rem 0;
}
.fl-setting-item {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 1.8rem 0;
  border-bottom: .1rem solid var(--fl-color-grey-def);
  img {
    width: 6.5rem;
    height: 6.5rem;
    margin-left: 1rem;
    border-radius: 50%;
  }
  .fl-setting-title {
    display: flex;
    flex-flow: column nowrap;
    font-size: 1.8rem;
    .fl-setting-content {
      margin-top: .8rem;
      font-size: 1.5rem;
      color: var(--fl-color-grey-content);
    }
  }
  .fl-button {
    padding: .8rem 1.6rem;
    background-color: transparent;
    border: .1rem solid var(--fl-color-grey);
    border-radius: .8rem;
    font-size: 1.5rem;
    cursor: pointer;
  }
   .fl-button-error {
    margin-left: 1rem;
    border: .1rem solid var(--fl-color-red-error);
    color: var(--fl-color-red-error);
  }
}

</style>