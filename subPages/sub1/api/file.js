const http = uni.$u.http
// 全局请求路径，也就是后端的请求基准路径
import apiConfig from '@/utils/ip.js';
let baseURL = apiConfig.url;


export function uploadSign(data = {},config) { 
  return  http.post('/infra/file/uploadSign', data,config)
}

export function createFile(data = {},config) { 
  return http.post('/perfor/file/createFile', data, config)
}
