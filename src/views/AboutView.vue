<template>
    <div class="cs-main">
      <div class="cs-container">
        <div class="cs-title"></div>
        <ul class="cs-content">
          <li class="cs-content-item">起始页已上线 1683 天</li>
          <li class="cs-content-item">最后更新：2022.5.11</li>
          <li class="cs-content-item" v-for="(item,key) in logs" :key="key" >
            <div class="cs-time">{{item.time}}</div>
            <span :class="{'cs-tag':true,'cs-repair':item.type==0,'cs-improve':item.type==1}">{{item.type==0?'修复':'改进'}}</span><span class="cs-desc">{{item.description}}</span>
          </li>
        </ul>
      </div>
        
    </div>
</template>
<script>
// import request from '@/util/request'
    export default {
        name:"app",
        data(){
            return {
                logs:[
                  {
                      type:0,
                      description:"数据库迁移到服务器",
                      time:"2022-05-11 21:01:36"
                  },
                   {
                      type:1,
                      description:"数据库迁移到服务器",
                      time:"2022-05-11 21:01:36"
                  },
                   {
                      type:1,
                      description:"数据库迁移到服务器",
                      time:"2022-05-11 21:01:36"
                  },
                   {
                      type:0,
                      description:"数据库迁移到服务器",
                      time:"2022-05-11 21:01:36"
                  },
                ]
            }
        },
        created(){
            
            // const _this = this
            // request.get('/log/allLog').then(function(resp) {
            //     _this.logs = resp.data.logList;
            // })
        }

    }
</script>
<style scoped>
ul,li {
  list-style: none;
}
.cs-main{ 
  width: 100%;
  height: 900px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F3F5F7;
}
.cs-container {
  width: 600px;
  height: 500px;
  background: white;
  padding: 20px 30px;
  border-radius: 12px;
}
.cs-title {
  padding: 52px 10px;
  border-bottom: 1px solid #F2F2F2;
  font-size: 32px;
  background: url(https://cdn.jsdelivr.net/gh/MobiusBeta/assets/images/Lime_Logo_with_Title_Cropped.png) no-repeat;
  object-fit: cover;
  background-position: center;
  background-size: 180px 42px;
}
.cs-content-item {
  font-size: 12px;
  color: #A3A1A3;
  text-align: left;
}
.cs-time {
  margin:10px 0;
}
.cs-tag {
  margin-left: 20px;
  margin-right: 8px;
  padding: 5px;
  border-radius: 4px;
}
.cs-repair {
  background: #DBC693;
  color: white;
}
.cs-improve {
  background: #A1C6C9;
  color: white;
}
</style>

