const http = uni.$u.http;

//小程序-使用账号密码登录
export function login(data = {}) {
  return http.post('mini/auth/login', data);
}
//使用短信验证码登录
export function loginBySms(data = {}) {
  return http.post('mini/auth/sms-login', data);
}

//小程序-校验图形验证码后根据账户发送手机验证码
export function sendSms(data = {}) {
  return http.post('mini/auth/send-sms-code-verify', data);
}

//小程序-重置用户密码
export function resetPassword(data = {}) {
  return http.post('mini/auth/wx-update-password', data);
}

//获取图片验证码
export function getcode(config) {
  return http.get('mini/auth/code',{params:config});
}

//一键登录
export function wxLogin(data,config = {}) {
  return http.post('/mini/auth/login-wx',data,config);
}

//小程序-新用户注册或修改
export function register(data = {},config) {
  return http.post('/mini/auth/wx-add-user-or-update', data, {params: config});
}
