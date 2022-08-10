// var Mock = require('mockjs')
// let baseURL = 'http://10.251.9.214:8080/'
// let baseRegURL = '/http:\/\/localhost:3000\/'

// //验证码接口
// Mock.mock(baseURL+'register-code','post',{
//   code: 200,
//   message: '发送成功',
//   data: {}
// })
// //注册
// Mock.mock(baseURL+'user','post',{
//   code: 200,
//   message: '注册成功',
//   data: {}
// })
// //验证码登录
// Mock.mock(baseURL+'/user/login/code',{
//   code: 200,
//   message: '登录成功',
//   data: {
//     username: '@cname()',
//     id: '@id()',
//     avatar: '@image(400*400,),#0EB0C9', 
//   }
// })