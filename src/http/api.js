import http from './http.js'

let apiFun = {
  folder:{
    recycle:{}
  },
  file:{
    version:{},
    recycle:{},
    create:{}
  },
  user:{},
  translate:{},
  search:{},
  material: {
    like:{},
    collect:{},
    search: {},
  }
};

/** 发送注册验证码 */
apiFun.sendRegisterCode = (params) => {
  return http.post('/register-code/'+params);
}
/** 发送登录验证码 */
apiFun.sendLoginCode = (params) => {
  return http.post('/login-code/'+params)
}

/** 注册 */
apiFun.register = (params) => {
  return http.post('/user',params)
}

/** 验证码登录 */
apiFun.loginCode = params => {
  return http.postParams('/user/login/code',params)
}

/**
 * 登出
 */
apiFun.logout = ()=> {
  return http.post('/user/logout')
}

/**
 * 修改密码
 */
apiFun.updatePassword = (id,pwd)=> {
  return http.post('/user/'+id+'/pwd',{pwd:pwd})
}

/** 密码登录 */
apiFun.loginPassword = params => {
  return http.postParams('/user/login/password',params)
}

/** 新建文件夹 */
apiFun.folder.create = (params) => {
  return http.post('/workspace-folder',params)
}

/** 删除文件夹 */
apiFun.folder.delete = params => {
  return http.delete('/workspace-folder/'+params)
}

/** 重命名文件夹 */
apiFun.folder.rename = (id,name) => {
  return http.put('/workspace-folder/'+id+'/name/'+name)
}

/** 移动文件夹 */
apiFun.folder.move = (id,params) => {
  return http.put('/workspace-folder/'+id+'/parent',{newParentId:params})
}

/** 获取文件夹内容 */
apiFun.folder.get = params => {
  return http.get('/workspace-folder/son',params)
}

/** 新建文件 */
apiFun.file.create = (params) => {
  return http.post('/article',params)
}

/** 删除文件 */
apiFun.file.delete = params => {
  return http.delete('/article/'+params)
}

/** 重命名文件 */
apiFun.file.rename = (id,name,params) => {
  return http.put('/article/'+id+'/title/'+name,{folderId:params})
}

/** 获取html */
apiFun.file.html = (id,params) => {
  return http.get('/article/'+id+'/html',{folderId:params})
}

/** 移动文件 */
apiFun.file.move = (id,params) => {
  return http.put('/article/'+id+'/folder',{folderId:params})
}

/** 获取文件内容 */
apiFun.file.get = params => {
  return http.get('/article/'+params)
}

/** 获取回收站数据 */
apiFun.file.recycle.list = ()=> {
  return http.get('/recycle-bin/content');
}

/** 从回收站恢复文件 */
apiFun.file.recycle.recover = (id)=> {
  return http.put('/recycle-bin/article/'+id);
}
/** 从回收站恢复文件夹 */
apiFun.folder.recycle.recover = (id)=> {
  return http.put('/recycle-bin/folder/'+id);
}

/** 编辑文章 */
apiFun.file.edit = (id,params) => {
  return http.post('/article/'+id,params);
}

/** 上传文章 */
apiFun.file.upload = (params) => {
  return http.post('/material',params);
}

/** 生成文章标题 */
apiFun.file.create.title = (text) => {
  return http.post('/text/title',{text:text});
}

/** 生成文章摘要 */
apiFun.file.create.digest = (text) => {
  return http.post('/text/digest',{text:text});
}

/** 上传文章版本 */
apiFun.file.version.add = (params) => {
  return http.post('/article-version',params);
}

/** 获取文章版本内容 */
apiFun.file.version.get = (params) => {
  return http.get('/article-version/'+params,{loading:false});
}

/** 获取文章版本列表 */
apiFun.file.version.list = (params) => {
  return http.get('/article/'+params+'/article-version',{loading:false});
}

/** 获取最近使用过的文件 */
apiFun.file.recentList = () => {
  return http.get('/articles/recent')
}

/** 文本纠错 */
apiFun.file.correct = (params) => {
  return http.post('/text/correct',{text:params});
}

/** 匹配敏感词 */
apiFun.file.match = (params) => {
  return http.post('/sensitive/match',{text:params,loading:false});
}

/** 获取翻译语言列表 */
apiFun.translate.langs = ()=> {
  return http.get('/translate/langs',{loading:false})
}

/** 获取翻译文本 */
apiFun.translate.translate = (params)=> {
  return http.get('/translate',params)
}

/** 查询字典 */
apiFun.search.dictionary = params => {
  return http.get('/by-chinese-dictionay',{content:params,loading:false})
}

/** 获取素材类型列表 */
apiFun.material.list= () => {
  return http.get('/material/types',{loading:false})
}

/** 获取素材评论列表 */
apiFun.material.commentList= (id) => {
  return http.get('/material/'+id+'/comments')
}

/** 获取文章列表 */
apiFun.material.getList = params => {
  return http.get('/admin/materials',params);
}

/** 发送评论 */
apiFun.material.send= (params) => {
  return http.post('/material-comment',params)
}

/** 获取点赞列表 */
apiFun.material.like.list= () => {
  return http.get('/materials/like')
}

/** 点赞 */
apiFun.material.like.add= (id) => {
  return http.post('/material/'+id+'/like',{loading:false})
}

/** 取消点赞 */
apiFun.material.like.remove= (id) => {
  return http.delete('/material/'+id+'/like',{loading:false})
}

/** 获取收藏夹列表 */
apiFun.material.collect.list = () => {
  return http.get('/material/collect-folder')
}

/** 新建收藏文件夹 */
apiFun.material.collect.create = (name) => {
  return http.postParams('/material/collect-folder',{folderName:name})
}

/** 获取收藏夹内容 */
apiFun.material.collect.get = (id) => {
  return http.get('/material/collect-folder/'+id);
}

/** 收藏 */
apiFun.material.collect.add= (id,params) => {
  return http.post('/material/'+id+'/collect',{folderIdList:params,loading:false})
}

/** 取消收藏 */
apiFun.material.collect.remove= (id) => {
  return http.delete('/material/'+id+'/collect',{loading:false})
}

/** 获取素材 */
apiFun.material.get= (id) => {
  return http.get('/material/'+id)
}

/** 获取标签列表 */
apiFun.file.tagList= (params) => {
  return http.post('/text/tags',params)
}

apiFun.user.imageCloud = ()=> {
  return http.post('/tag/wordcloud');
}

/** 
 * 查找用户
 * text
 */
apiFun.user.get= (params) => {
  return http.get('/user/'+params)
}

/** 
 * 获得用户关注列表
 * user1ID
 * user2ID
 */
 apiFun.user.attentionList= () => {
  return http.get('/users/follow')
}

/** 
 * 获得用户素材列表
 * user1ID
 * user2ID
 */
 apiFun.user.materialList= (id) => {
  return http.get('/materials',id)
}

/** 
 * 用户关注
 * user1ID
 * user2ID
 */
apiFun.user.attention= (id) => {
  return http.post('/user/'+id+'/follow')
}

/** 
 * 用户取消关注
 * user1ID
 * user2ID
 */
 apiFun.user.unAttention= (id) => {
  return http.delete('/user/'+id+'/follow')
}

/** 
 * 获取用户间关系
 * user1ID
 * user2ID
 */
apiFun.file.getAttention= (id) => {
  return http.get('/user/'+id)
}

apiFun.material.search.recommed = keyword => {
  return http.get('/material/search/completion',{keyword:keyword,loading:false})
}

apiFun.material.search.search = keyword => {
  return http.get('/materials/'+keyword,{loading:false})
}


export default apiFun;