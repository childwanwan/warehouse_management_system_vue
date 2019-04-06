import axios from 'axios'
import storage, { TOKEN_KEY } from './../public/js/storage';

//export const apiDomain = 'https://i-code.top/qs'
//export const apiDomain = 'http://120.78.132.185:8050/qs'
export const apiDomain = 'http://localhost:8080/'
//const baseURL = `${apiDomain}/api/v1`
const baseURL = `${apiDomain}`


axios.defaults.baseURL = baseURL


// mock数据
// const baseURL = '/api/v1'
// const isMock = true

// 管理员登录成功后的请求需要带上token
const adminHttp = function() {
  return axios.create({
    //baseURL: `${baseURL}/admin`,
    headers: {'token': storage.get(TOKEN_KEY),'Content-Type': 'application/json;charset=utf-8'}
    //headers: {'Content-Type': 'application/json;charset=utf-8'}
  })
}

/*------------------------------------登入的接口------------------------------------*/

export function login(data) {
  const url = '/employee/login'
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

/*------------------------------------获取所有物品的接口------------------------------------*/
export function getAllgoods() {
  const url = '/goods/getGoods'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

/*------------------------------------物品名称模糊匹配的接口------------------------------------*/
export function getGoodsBygoodsName(data) {
  const url = '/goods/getGoodsBygoodsName'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------获取入库信息------------------------------------*/
export function getInstore(data) {
  const url = '/instore/query'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------获取入库信息的用户名------------------------------------*/
export function getEmployeeById(data) {
  const url = '/employee/getEmployeeById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------获取入库详情------------------------------------*/
export function getdetailById(data) {
  const url = '/instore/getInstoresGoodsByInstoresId'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据获取入库单情况------------------------------------*/
export function getInstoreById(data) {
  const url = '/instore/queryById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------根据id获取goods信息------------------------------------*/
export function getGoodsById(data) {
  const url = '/goods/getGoodsById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*---------------------------------管理员请求的接口------------------------------------*/

// 注册接口
/*export function register(data) {
  const url = '/register'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}

// 登录接口
export function login(data) {
  const url = '/login'
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 登出接口
export function logout() {
  const url = '/admin/logout'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

// 获取问卷列表
export function getPaperList() {
  const url = '/admin/paper-lists'
  // if (isMock) {
  //   return axios.get(url).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

// 删除问卷
export function deletePaper(data) {
  const url = '/admin/delete-paper'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 管理员获取问卷内容
export function getPaper(data) {
  const url = '/admin/view-paper'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 修改问卷
export function updatePaper(data) {
  const url = '/admin/update-paper'
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}

// 上传问卷表格
export function uploadPaper(data) {
  const url = '/admin/upload'
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  return adminHttp().post(url, data, config).then(res => Promise.resolve(res.data))
}

// 获取问卷答题数据
export function getPaperData(data) {
  const url = '/admin/paper-data'
  // if (isMock) {
  //   return axios.post(url, data).then(res => Promise.resolve(res.data))
  // }
  return adminHttp().post(url, data).then(res => Promise.resolve(res.data))
}


/!*---------------------------------答题用户请求的接口------------------------------------*!/

// 答题用户获取问卷内容
export function viewPaper(params) {
  const url = '/user/view-paper'
  return axios.get(url, {params}).then(res => Promise.resolve(res.data))
}

// 答题用户提交问卷答案
export function commitPaper(data) {
  const url = '/user/commit-paper'
  return axios.post(url, data).then(res => Promise.resolve(res.data))
}*/
