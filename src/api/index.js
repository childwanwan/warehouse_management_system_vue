import axios from 'axios'
import storage, { TOKEN_KEY } from './../public/js/storage';

//export const apiDomain = 'https://i-code.top/qs'
//export const apiDomain = 'http://120.78.132.185:8050/qs'
export const apiDomain = 'http://120.78.132.185:8880/'
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

/*------------------------------------根据id删除入库单------------------------------------*/
export function deleteInstore(data) {
  const url = '/instore/delete'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------查询数据字典------------------------------------*/
export function getGoodsDicMessage(data) {
  const url = '/goodsDic/query'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------查询数据字典------------------------------------*/
export function updateGoodsDicById(data) {
  const url = '/goodsDic/update'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------删除数据字典------------------------------------*/
export function deleteGoodsDicByGoodsCode(data) {
  const url = '/goodsDic/delete'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------删除数据字典------------------------------------*/
export function insertGoodsDicByGoodsCode(data) {
  const url = '/goodsDic/insert'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}







/*------------------------------------根据goodsCode查询goods------------------------------------*/
export function getGoodsByGoodsCode(data) {
  const url = '/goods/getGoodsByGoodsCode'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据goodsCode查询goods------------------------------------*/
export function getGoodsByCondition(data) {
  const url = '/goods/getGoodsByCondition'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}



/*------------------------------------获取所有职工信息------------------------------------*/
export function updateEmployees(data) {
  const url = '/employee/update'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------更新职工信息------------------------------------*/
export function getEmployees() {
  const url = '/employee/getEmployees'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据状态获取职工信息------------------------------------*/
export function getEmployeesByStatus(data) {
  const url = '/employee/getEmployeesByStatus'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}



/*------------------------------------入库------------------------------------*/
export function insertInstore(data) {
  const url = '/instore/insert'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------根据id删除出库单------------------------------------*/
export function deleteOutstoresById(data) {
  const url = '/outstore/deleteOutstoresById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------查询出库单------------------------------------*/
export function getOutstores() {
  const url = '/outstore/getOutstores'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据id查询出库单------------------------------------*/
export function getOutstoresById(data) {
  const url = '/outstore/getOutstoresById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------查询出库单------------------------------------*/
export function getOutstoresGoodsByOutstoresId(data) {
  const url = '/outstore/getOutstoresGoodsByOutstoresId'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

// /*------------------------------------查询仓库管理员------------------------------------*/
// export function getUsers() {
//   const url = '/employee/getEmployees'
//   return adminHttp().get(url).then(res => Promise.resolve(res.data))
// }



/*------------------------------------查询出库单------------------------------------*/
export function insertOutstore(data) {
  const url = '/outstore/addOutstore'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------查询出库单------------------------------------*/
export function getDamages(data) {
  const url = '/damage/query'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------报损------------------------------------*/
export function insertDamage(data) {
  const url = '/damage/report'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据id获取报损单------------------------------------*/
export function getDamageById(data) {
  const url = '/damage/queryById'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------根据名字获取供应商信息------------------------------------*/
export function getProviderByCondition(data) {
  const url = '/provider/getProviderByCondition?providerName='+data
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

/*------------------------------------根据名字获取供应商信息------------------------------------*/
export function getProvider() {
  const url = '/provider/getProvider'
  return adminHttp().get(url).then(res => Promise.resolve(res.data))
}

/*------------------------------------更新供应商信息------------------------------------*/
export function updateProviderById(data) {
  const url = '/provider/updateProvider'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}
/*------------------------------------添加供应商信息------------------------------------*/
export function insertProvider(data) {
  const url = '/provider/addProvider'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------添加供应商信息------------------------------------*/
export function getEmployeeByEmployeeName(data) {
  const url = '/employee/getEmployeeByEmployeeName'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------添加职工------------------------------------*/
export function addEmployee(data) {
  const url = '/employee/addEmployee'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------更新报损单------------------------------------*/
export function updateDamage(data) {
  const url = '/damage/updateDamage'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}


/*------------------------------------更新报损单------------------------------------*/
export function updateDamageStatus(data) {
  const url = '/damage/updateStatus'
  return adminHttp().post(url,data).then(res => Promise.resolve(res.data))
}

/*------------------------------------更新报损单------------------------------------*/
export function logOut(data) {
  const url = '/employee/logOut'
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
