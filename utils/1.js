


import dayjs from "dayjs";
import XEUtils, {
  toNumber
} from "xe-utils";
/**
 * { validator: self.$validator.positivenumberpoint, trigger: "blur"1 },
 * 正数和小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumberpoint(rule,value,data,callback) {
  if (value) {
    var reg = /^\d+(\.\d+)?$/;
    if (reg.test(value) == false) {
      callback("请输入正数和小数");
    } else {
      return true
    }
  } else {
    return true
  }
}

export function rrrr(rule,value,data,callback) {
  console.log(value,"value")
  if (value === null || value === undefined || value === "") {
    // var reg = /^\d+(\.\d+)?$/;
    // if (reg.test(value) == false) {
    //   callback("请输入必填项");
    // } else {
    //   return true
    // }
    callback("请输入必填项");
  } else {
    return true
  }
}

/**
 *  { validator: self.$validator.positivenumber, trigger: "blur" },
 * 正数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumber(rule,value,data,callback) {
  if (value) {
    var reg = /^\d+$/;
    if (reg.test(value) == false) {
      callback("请输入正数");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 *  { validator: self.$validator.positivenumber, trigger: "blur" },
 * 正数范围0-100
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function positivenumber0_100(rule,value,data,callback) {
  if (value) {
    var reg = /^\d+$/;
    if (reg.test(value) == false) {
      callback("请输入正数");
    } else if (value < 0 || value > 100) {
      callback("范围在0-100");
    } else { 
      return true
    }
  } else {
    return true
  }
}


/**
 * { validator: self.$validator.creditCode, trigger: "blur" },
 * 统一社会信用代码
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function creditCode(rule,value,data,callback) {
  if (value) {
    var reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
    if (reg.test(value) == false) {
      callback(new Error("统一社会信用代码格式不对"));
    } else {
      return true
    }
  } else {
    return true
  }
}

export function Num_13(rule,value,data,callback) { 
  if (value) {
    value = value.replace("SF", "").replace("sf", "").replace("sF", "").replace("Sf", "")
    var reg = /^\d{13}$/;
    if (reg.test(value) == false) {
      callback("快递单号是13位");
    } else {
        return true
      }
    // var value2  =  value.match(/\d+/g);
    // var reg = /^\d{13}$/;
    // if (reg.test(value2[0]) == false) {
    //   callback("快递单号是13位");
    // } else {
    //   return true
    // }
  } else {
    return true
  }
}

/**
 * { validator: self.$validator.IDcard, trigger: "blur" },
 * 身份证正则（大陆）
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function IDcard(rule,value,data,callback) {
  if (value) {
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (reg.test(value) == false) {
      callback(new Error("身份证格式不对"));
    } else if (value.includes("x")) { 
      callback(new Error("x需要大写"));
    }else {
      return true
    }
  } else {
    return true
  }
}

export function IDcard2(rule,value,data,callback) {
  if (value) {
    //\!\@\#\$\%\^\&\*
    var reg = /^[A-Za-z0-9\(\)（）]+$/;
    if (reg.test(value) == false) {
      callback(new Error("只能输入数字和英文"));
    } else if (value.includes("x")) { 
      callback(new Error("x需要大写"));
    }
    else {
      return true
    }
  } else {
    return true
  }
}

export function worldIDcard(rule,value,data,callback) {
  if (value) {
    //\!\@\#\$\%\^\&\*
    var reg = /^[A-Za-z0-9\(\)（）]+$/;
    if (reg.test(value) == false) {
      callback(new Error("只能输入数字和英文"));
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * { validator: self.$validator.mobile, trigger: "blur" },
 * 手机号正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function mobile(rule,value,data,callback) {
  if (value) {
    var reg = /^1[3,4,5,6,7,8,9][0-9]\d{8}$/;
    if (reg.test(value) == false) {
      callback("请输入正确的手机号");
    } else {
      return true
    }
  } else {
    return true
  }
}

// { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/**
 * 护照
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function passport(rule,value,data,callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9]{5,17}$/;
    if (reg.test(value) == false) {
      callback(new Error("护照格式不对"));
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 港澳通行证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function hongkongpass(rule,value,data,callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9]{6,10}$/;
    if (reg.test(value) == false) {
      callback(new Error("港澳通行证格式不对"));
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 台胞证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function taiwanpass(rule,value,data,callback) {
  if (value) {
    var reg = /^([0-9]{8}|[0-9]{10})$/;
    if (reg.test(value) == false) {
      callback(new Error("台胞证格式不对"));
    } else {
      return true
    }
  } else {
    return true
  }
}




/**
 * 手机号和座机正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function mobileOrphone(rule,value,data,callback) {
  if (value) {
    var reg = /^1[3,4,5,6,7,8,9][0-9]\d{8}$/;
    var reg1 = /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/; //带区号
    if (reg.test(value) == false && reg1.test(value) == false) {
      callback("请输入正确的号码");
    } else {
      return true
    }
  } else {
    return true
  }
}

export function mobileOrphone2(rule,value,data,callback) {
  if (value) {
    var reg = /^1[3,4,5,6,7,8,9][0-9]\d{8}$/;
    if (reg.test(value) == false ) {
      callback("请输入正确的号码");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 座机正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function landline(rule,value,data,callback) {
  if (value) {
    var reg = /(^[0][1-9]{2,3}-[0-9]{5,10}$)|(^400(-\d{3,4}){2}$)/; //带区号
    if (reg.test(value) == false) {
      callback("请输入正确的座机号码 区号-号码");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 最大允许12位整数内以及6位小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function numLimit18_6(rule,value,data,callback) {
  if (value) {
    var reg = /^[1-9]\d{0,11}(\.\d{1,6})?$|^0(\.\d{1,6})?$/;
    if (reg.test(value) == false) {
      callback("最大允许12位整数以及6位小数");
    } else {
      return true
    }
  } else {
    return true
  }
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 企业名称正则
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function isCompany(rule,value,data,callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\(\)（）\da-zA-Z&]{2,50}$/;
    if (reg.test(value) == false) {
      callback("企业名称格式不正确");
    } else {
      return true
    }
  } else {
    return true
  }
}


/**
 * 只允许中文、括号
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function onlyZH(rule,value,data,callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\（\）\(\)]+$/;
    if (reg.test(value) == false) {
      callback("请输入中文、括号");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 只允许中文、括号、数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function ZHnumber(rule,value,data,callback) {
  if (value) {
    var reg = /^[\u4e00-\u9fa5\（\）\(\)\d]+$/;
    if (reg.test(value) == false) {
      callback("请输入中文、括号、数字");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 正数、负数和小数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function numberpoint(rule,value,data,callback) {
  if (value) {
    var reg = /^(\-|\+)?\d+(\.\d+)?$/;
    if (reg.test(value) == false) {
      callback("请输入正数、负数和小数");
    } else {
      return true
    }
  } else {
    return true
  }
}



// /**
//  * 正数
//  * @param {*} rule 
//  * @param {*} value 
//  * @param {*} callback 
//  */
// export function positivenumber(rule,value,data,callback) {
//   if (value) {
//     var reg = /^\d+$/;
//     if (reg.test(value) == false) {
//       callback("请输入正数");
//     } else {
//       return true
//     }
//   } else {
//     return true
//   }
// }

/**
 * 有两位小数的正实数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber2point(rule,value,data,callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (reg.test(value) == false) {
      callback("请输入整数或1-2位的小数");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 有两位小数的正实数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber2pointNot0(rule,value,data,callback) {
  if (value) {
    var reg = /^(?!0+(\.0+)?$)([1-9]\d*|0)(\.\d{1,2})?$/;
    if (reg.test(value) == false) {
      callback("包含1到2位小数的正数（不包含0）");
    } else {
      return true
    }
  } else if (value == 0) { 
    callback("包含1到2位小数的正数（不包含0）");
  } else {
    return true
  }
}


/**
 * 有六位小数的数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber6point(rule,value,data,callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{1,6})?$/;
    if (reg.test(value) == false) {
      callback("请输入整数或1-6位的小数");
    } else {
      return true
    }
  } else {
    return true
  }
}




/**
 * 邮编
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function ems(rule,value,data,callback) {
  if (value) {
    var reg = /^\d{6}$/;
    if (reg.test(value) == false) {
      callback("请输入正确邮编");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 有两位小数的正数、负数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnegativenumber2point(rule,value,data,callback) {
  if (value) {
    var reg = /^(\-|\+)?\d+(\.\d{1,2})?$/;
    if (reg.test(value) == false) {
      callback("请输入1-2位小数的正数、负数");
    } else {
      return true
    }
  } else {
    return true
  }
}


/**
 * 有两位小数的正实数
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function realnumber2pointBFS(rule,value,data,callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{2})?$/;
    if (reg.test(value) == false) {
      callback("请输入两位小数的正实数");
    } else if (value < 0 || value > 100) {
      callback("必须在0-100之间");
    } else {
      return true
    }
  } else {
    return true
  }
}


/**
 * 非空格
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function notSpace(rule,value,data,callback) {
  if (value) {
    var reg = /^[^\s]*$/;
    if (reg.test(value) == false) {
      callback(new Error("不能输入空格"));
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 非空格
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function dateForm(rule,value,data,callback) {
  if (value) {
    var reg = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    if (reg.test(value) == false) {
      callback(new Error("非YYYY-MM-DD格式"));
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 非空格
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function dy10(rule,value,data,callback) {
  if (value) {
    if (value.length < 10) {
      callback(new Error("收件地址必须大于等于10个字符"));
    } else { 
      return true
    }
  } else {
    return true
  }
}

/**
 * 50w
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function w50(rule,value,data,callback) {
  if (value) {
    if (value > 1000000) {
      callback(new Error("不可填写超过100万元"));
    } else { 
      return true
    }
  } else {
    return true
  }
}

/**
 * 50w
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function _w50(rule,value,data,callback) {
  if (value) {
    if (value > 500000) {
      callback(new Error("不可填写超过50万元"));
    } else { 
      return true
    }
  } else {
    return true
  }
}

export function m12(rule,value,data,callback) {
  if (value) {
    console.log(value > 24,"value > 24")
    if (value > 24) {
      callback(new Error("不可超过2年"));
    } else { 
      return true
    }
  } else {
    return true
  }
}


function isWithinOneYear(date1, date2) {
  // 确保两个参数都是 Date 对象
  if (!(date1 instanceof Date) || !(date2 instanceof Date)) {
      throw new Error('Both arguments must be Date objects');
  }

  // 获取两个日期的时间戳（毫秒数）
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  // 计算时间差（毫秒数）
  const diff = Math.abs(time1 - time2);

  // 一年有多少毫秒（365 天 * 24 小时 * 60 分钟 * 60 秒 * 1000 毫秒）
  const oneYearInMilliseconds = 365 * 24 * 60 * 60 * 1000;

  // 判断时间差是否小于等于一年
  if (diff > oneYearInMilliseconds) {
    return true
  } else { 
    return  false
  }
}

/**
 * 只允许中文
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function onlyZH2(rule,value,data,callback) {
  if (value) {
    var reg = /^[\u4E00-\u9FFF]+$/;
    if (reg.test(value) == false) {
      callback("请输入中文");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 长度超过5个字,不能是纯数字
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */

export function only222(rule,value,data,callback) {
  if (value) {
    var reg = /^(?!\d+$).*$/
    console.log(value.length,"value.length")
    if (value.length <= 5) {
      callback("长度需要超过5个字");
    } else if (reg.test(value) == false) {
      callback("不能是纯数字");
    } else { 
      return true
    }
  } else {
    return true
  }
}

export function m36(rule,value,data,callback) {
  if (value) {
    console.log(value > 36,"value > 24")
    if (value > 36) {
      callback(new Error("不可超过3年"));
    } else { 
      return true
    }
  } else {
    return true
  }
}

export function m36m(rule,value,data,callback) {
  if (value) {
    console.log(dayjs(value).diff(new Date(), "year"),"sssssssssssssssss")
    if ( dayjs(value).diff(new Date(), "year") >= 3) {
      callback(new Error("不可超过3年"));
    } else { 
      return true
    }
  } else {
    return true
  }
}

//
export function oneYi(rule,value,data,callback) {
  if (value) {
    var reg = /^[0-9]+(\.[0-9]{1,2})?$/;
    if (value > 100000000) {
      callback("金额不超过1亿");
    } else {
      return true
    }
  } else {
    return true
  }
}
