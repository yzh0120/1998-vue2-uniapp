const http = uni.$u.http

export function getMaster(config) { 
  return  http.get('/access/config/getMaster',config)
}
