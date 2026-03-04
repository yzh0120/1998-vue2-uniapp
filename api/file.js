const http = uni.$u.http
// 全局请求路径，也就是后端的请求基准路径
import apiConfig from '@/utils/ip.js';
let baseURL = apiConfig.url;
let Base64 = require('js-base64').Base64
import store from "@/store/index.js" //'../store/index.js'

export function uploadSign(data = {}, config) {
  return http.post('/infra/file/uploadSign', data, config)
}

export function createFile(data = {}, config) {
  return http.post('/perfor/file/miniCreateFile', data, config)
}

export function importFileGuarantee(data = {}, config) {
  return http.post('/mini/guarantee/import-file-guarantee', data, config)
}

export function fileGetList(data = {}, config) {
  return http.post('/perfor/file/get-list', data, config)
}


export function fileDelete(data = {}, config) {
  return http.delete('/perfor/file/delete', data, config)
}

// export function replaceTemplateSave(data = {}, config) {
//   return http.post('/perfor/counter-guarantee/replace-template-save', data, config)
// }

export function replaceTemplateByWord( config) {
  return http.get('/perfor/file/replaceTemplateByWord', config)
}

export function miniCreateFileNoOcr(data, config) {
  return http.post('/perfor/file/miniCreateFileNoOcr', data,config)
}

export function miniReplaceTemplateByWord(config) {
  return http.get('perfor/file/miniReplaceTemplateByWord',config)
}
function getFileNameFromUrl(url) {
  if (!url || typeof url !== 'string') return '';

  // 步骤1：去掉URL中的锚点（#及后面的内容）
  const urlWithoutHash = url.split('#')[0];
  // 步骤2：去掉URL中的参数（?及后面的内容）
  const urlWithoutQuery = urlWithoutHash.split('?')[0];
  // 步骤3：找到最后一个斜杠的位置
  const lastSlashIndex = urlWithoutQuery.lastIndexOf('/');
  // 步骤4：截取最后一个斜杠后的内容（即文件名）
  const fileName = urlWithoutQuery.slice(lastSlashIndex + 1);

  return fileName;
}
export function download_url({
  downurl,filename
}) {
  if(!filename){
    filename = getFileNameFromUrl(downurl)
  }
  //#ifdef WEB
  downloadFile(downurl,filename)
   //#endif
  //#ifdef MP-WEIXIN
  downurl = downurl.replace(apiConfig.a1,apiConfig.a2)
  console.log(downurl, "downurl")
  uni.showLoading({
    title: '打开中...',
    mask: true
  })
  // 下载文件资源到本地
  uni.downloadFile({
    url: downurl, // 后端返回的线上文件路径
    success: (res) => {
      // uni.$u.toast(res)
      if (res.statusCode === 200) {
        var zipPath = res.tempFilePath
        let type = downurl.split(".").pop()
        let name = downurl.split("/").pop()
        ///////////////////////////////////////////////////
        // 调用微信原生转发文件接口
        wx.shareFileMessage({
          filePath: zipPath, // 下载后的ZIP路径
          fileName: filename ? filename : name, // 转发后显示的文件名
          success: () => uni.showToast({ title: "转发成功" }),
          fail: (res) => {
            //             uni.showModal({
            //   title: '错误提示2', //提示标题
            //   content: `${res.errMsg}`, //提示内容
            //   showCancel: true, //是否显示取消按钮
            //   success: function (res) {
            //     if (res.confirm) { //confirm为ture，代表用户点击确定
            //       console.log('点击了确定按钮');
            //     } else if (res.cancel) { //cancel为ture，代表用户点击取消
            //       console.log('点击了取消按钮');
            //     }
            //   }
            // })
          }
        });
      }
    },
    fail: (res) => {
      uni.showModal({
        title: '错误提示', //提示标题
        content: `${res.errMsg}-:${downurl}`, //提示内容
        showCancel: true, //是否显示取消按钮
        success: function (res) {
          if (res.confirm) { //confirm为ture，代表用户点击确定
            console.log('点击了确定按钮');
          } else if (res.cancel) { //cancel为ture，代表用户点击取消
            console.log('点击了取消按钮');
          }
        }
      })
      console.log(res, "失败结果")
    },
    complete: (res) => {
      uni.hideLoading()
    }
  });
   //#endif

}

export function download_url_pre({
  downurl
}) {
  //#ifdef WEB
 store.state.gm.pdfUrl = apiConfig.VUE_APP_BASE_ONLINE_PREVIEW + encodeURIComponent(Base64.encode(downurl));
  console.log(store.state.gm.pdfUrl,"this.$store.state.gm.pdfUrl")
  uni.navigateTo({
    url: '/mainPage/look'
  })
   //#endif
  //#ifdef MP-WEIXIN
  downurl = downurl.replace(apiConfig.a1,apiConfig.a2)
  console.log(downurl, "downurl")
  uni.showLoading({
    title: '打开中...',
    mask: true
  })
  uni.downloadFile({
    url: downurl, // 后端返回的线上文件路径
    success: (res) => {
      // uni.$u.toast(res)
      if (res.statusCode === 200) {
        var zipPath = res.tempFilePath
        let type = downurl.split(".").pop()
        let name = downurl.split("/").pop()
        ///////////////////////////////////////////////////
        uni.openDocument({
          filePath: res.tempFilePath,
          // fileType: arr[arr.length - 1].replaceAll(`"`, ""),
          showMenu: true,
          success: function (res) {},
          fail: function (res) {
            uni.showModal({
              title: '错误提示2', //提示标题
              content: `${res.errMsg}`, //提示内容
              showCancel: true, //是否显示取消按钮
              success: function (res) {
                if (res.confirm) { //confirm为ture，代表用户点击确定
                  console.log('点击了确定按钮');
                } else if (res.cancel) { //cancel为ture，代表用户点击取消
                  console.log('点击了取消按钮');
                }
              }
            })
          },
        });
      }
    },
    fail: (res) => {
      uni.showModal({
        title: '错误提示', //提示标题
        content: `${res.errMsg}-:${downurl}`, //提示内容
        showCancel: true, //是否显示取消按钮
        success: function (res) {
          if (res.confirm) { //confirm为ture，代表用户点击确定
            console.log('点击了确定按钮');
          } else if (res.cancel) { //cancel为ture，代表用户点击取消
            console.log('点击了取消按钮');
          }
        }
      })
      console.log(res, "失败结果")
    },
    complete: (res) => {
      uni.hideLoading()
    }
  });
  //#endif
}


export function replaceFormatFile(data = {}, config) {
  return http.post("/perfor/file/replace-format-file", data, config)
}

export const downloadFile = (url, filename) => {
  function getBlob(url) {
    return new Promise(resolve => {
      const XML = new XMLHttpRequest();
      XML.open('GET', url, true);
      XML.responseType = 'blob';
      XML.onload = () => {
        if (XML.status === 200) {
          resolve(XML.response);
        }
      };
      XML.send();
    });
  }

  //下载文件
  function saveAs(blob, filename) {
    const elelink = document.createElement("a");
    elelink.style.display = 'none';
    elelink.download = filename;
    elelink.href = window.URL.createObjectURL(blob);
    document.body.appendChild(elelink);
    elelink.click();
    document.body.removeChild(elelink);
  }

  // 调用以上方法进行下载
  getBlob(url).then(blob => {
    saveAs(blob, filename);
  });
}