/*
 * @Author: yz
 * @Date: 2023-02-22 14:14:10
 * @Description: 
 * 
 */
let apiConfig = {}

/*
//生产环境
*/
// apiConfig = {
//   url:"https://bh.mxhsz.com/admin-api/",//后台地址
//   corpId: "ww0a5a0dd04fd9f3ae",
//   a1: "https://videos-1253603100.file.myqcloud.com",//文件接口返回的地址
//   a2: "https://videos-1253603100.file.myqcloud.com",//替换后的地址
//   appid:"wx4105c0c288da69f4",
//   VUE_APP_BASE_ONLINE_PREVIEW: 'https://pre.mxhsz.com/onlinePreview?url='

// }

/*
//测试环境
*/
apiConfig = {
  url:"https://mxh-test.zksj.com.cn:9099/mxh-nfbs-api/admin-api/",
  corpId: "ww0a5a0dd04fd9f3ae",
  a1: "https://testfile.mxhsz.com",
  a2: "https://testfile-1253603100.cos.ap-guangzhou.myqcloud.com",
  appid:"wx6327f0ae00651f57",
VUE_APP_BASE_ONLINE_PREVIEW: 'https://pre.mxhsz.com/onlinePreview?url='
}

export default apiConfig;
