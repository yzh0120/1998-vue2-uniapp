const http = uni.$u.http
// 全局请求路径，也就是后端的请求基准路径
import apiConfig from '@/pages/subPacks/utils/ip.js';
let baseURL = apiConfig.url;

export function del(params = {}) { 
  return  http.post('/v1/sys/organization/user/login', params)
}

  export function onlinePreviewUrl(params = {}) { 
    return  http.post('/v1/sys/organization/user/login', params)
  }

  export function getFileListByFolderId(params = {}) { 
    return  http.post('/v1/sys/organization/user/login', params)
  }

  /**
 * 封装download下载文件流
 * @param url
 * @param title
 * @returns {Promise}
 */
export function download(params = {}, downloadPath) {

    if (!downloadPath) {
      console.log("没有下载路径")
    } else if (downloadPath == "filedownload") {
      downloadPath = "v1/base/file/download"
    }else{
      downloadPath = downloadPath
    }
  
    uni.showLoading({
      title: '下载中',
      mask: true
    })
    uni.downloadFile({
      header: {
        "Authorization": "Bearer " + uni.getStorageSync('token'),
      },
      url: `${baseURL}/${downloadPath}?fileId=${params.id}`, // 传入的url地址
      // params: params,
      success: (res) => {
        uni.hideLoading()
        console.log(res, "res")
        if (res.statusCode == 200) {
          var arr = res.header['Content-Disposition'].toString().split('filename=')[1].split('.')
          // console.log(res.header['Content-Disposition'].toString().split('filename=')[1],res.header['Content-Disposition'].toString().split('filename=')[1] == "ddd.docx","arr")
          if (["doc", "xls", "ppt", "pdf", "docx", "xlsx", "pptx"].includes(arr[arr.length - 1].replaceAll(`"`, ""))) {
            uni.openDocument({
              filePath: res.tempFilePath,
              fileType: arr[arr.length - 1].replaceAll(`"`, ""),
              success: function (res) {
                uni.showToast({
                  title: '打开文档成功',
                  icon: 'none',
                  duration: 3000
                });
              },
              fail: function (err) {
                uni.showToast({
                  title: '打开文档失败！',
                  icon: 'none',
                  duration: 3000
                });
              },
            });
          } else {
            uni.previewImage({
              urls: [res.tempFilePath],
              current: 0,
              success: function (res) {
                uni.showToast({
                  title: '打开文档成功',
                  icon: 'none',
                  duration: 3000
                });
              },
              fail: function (err) {
                console.log(err, "err")
              },
            });
          }
          //保存到本地////////////////////////
          // uni.saveFile({
          // 	tempFilePath:res.tempFilePath,
          // 	success:(saveFile_res)=>{
          // 		console.log(saveFile_res,"saveFile_res")
          // 		 //res.savedFilePath文件的保存路径
          // 		 //保存成功并打开文件
          // 		 uni.showLoading({
          // 			title: '正在打开',
          // 			mask: true
          // 		})
          // 		uni.openDocument({
          // 			filePath: saveFile_res.savedFilePath,
          // 			fileType:arr[arr.length - 1].replaceAll(`"`,""),
          // 			success: function(res) {
          // 				uni.showToast({
          // 					title: '打开文档成功',
          // 					icon: 'none',
          // 					duration: 3000
          // 				});
          // 			},
          // 			fail: function(err) {
          // 				uni.showToast({
          // 					title: '打开文档失败！',
          // 					icon: 'none',
          // 					duration: 3000
          // 				});
          // 			},
          // 		});
          // 		//  uni.openDocument({
          // 		// 	filePath:saveFile_res.savedFilePath,
          // 		// 	fileType: 'pdf',
          // 		// 	success:(openDocument_res)=>{
          // 		// 		uni.hideLoading();
          // 		// 		console.log('成功打开文档')
          // 		// 	},
          // 		// 	fail:(err)=>{
          // 		// 		uni.hideLoading()
          // 		// 		console.log(err)
          // 		// 	}
          // 		// })
          // 	},
          // 	fail:()=> {
          // 		uni.hideLoading()
          // 		console.log('下载失败')
          // 	}
          // })
          //保存到本地////////////////////////
        } else {
  
        }
  
      },
      fail: (err) => {
        // reject(err)
        console.log("下载失败")
      },
    })
  }