const http = uni.$u.http

//根据条件分页查询订单列表
export function projectList(data = {}) {
  return http.post('/mini/face-project/page', data);
}

//查询业务系统项目查询
export function projectList2(data = {}) {
  return http.post('/perfor/guarantee/query-page', data);
}

export function complexProductsPage(data = {},config) { 
  return  http.post('/mini/complex-products/page', data,config)
}

export function api_816(config) { 
  return  http.get('/proxy/v2/tyc/api_816',config)
}


