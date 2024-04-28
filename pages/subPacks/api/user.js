/*
 * @Author: yz
 * @Date: 2023-02-19 12:53:14
 * @Description: 
 * 
 */
const http = uni.$u.http

// export const login = (params) => http.post('/v1/sys/organization/user/login',params)

export function login(params = {}) { 
  return  http.post('/v1/sys/organization/user/login', params)
}


/*
import * as userApi from "@/pages/subPacks/api/user"


  userApi.login({userName:"caoheli", password:"123456"}).then((res) => {
      console.log(res,"0090909")
    })

*/
