
console.log(uni.$u,"uni.$u")
const http = uni.$u.http

export function listAllDictDataEnd(config = {}) { 
  return  http.get('/system/dict-data/list-all-dictData',config)
}

export function getPermissionInfo(config = {}) { 
  return  http.get('/system/auth/get-permission-info',config)
}

//
export function getUserInfo(config = {}) {
  return  http.get('/system/user/profile/get',config)
}

export function collect(data,config = {}) {
  return  http.post('/mini/user-behavior/collect',data,config)
}
