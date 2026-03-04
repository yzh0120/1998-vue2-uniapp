import dayjs from "dayjs";
import XEUtils, {
  toNumber
} from "xe-utils";

/**
 * 50w
 */
export function w50(rule, value, data, callback) {
  if (value) {
    if (value > 500000) {
      callback("不可填写超过50万元");
    } else {
      return true
    }
  } else {
    return true
  }
}

export function m36(rule,value,data,callback) {
  if (value) {
    if (value > 36) {
      callback("不可填写超过36个月");
    } else { 
      return true
    }
  } else {
    return true
  }
}

/**
 * 有两位小数的正实数
 */
export function realnumber2point(rule, value, data, callback) {
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
 * 正整数
 */
export function positivenumber(rule, value, data, callback) {
  if (value) {
    var reg = /^[1-9]\d*$/;
    if (reg.test(value) == false) {
      callback("请输入正整数");
    } else {
      return true
    }
  } else {
    return true
  }
}
/**
 * 正整数或者小数
 */
export function positivenumberpoint(rule, value, data, callback) {
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
/**
 * 外国身份证
 */
export function IDcard2(rule, value, data, callback) {
  if (value) {
    //\!\@\#\$\%\^\&\*
    var reg = /^[A-Za-z0-9\(\)（）]+$/;
    if (reg.test(value) == false) {
      callback("只能输入数字和英文");
    } else if (value.includes("x")) {
      callback("x需要大写");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 统一社会信用代码
 */
export function creditCode(rule, value, data, callback) {
  if (value) {
    var reg = /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/;
    if (reg.test(value) == false) {
      callback("统一社会信用代码格式不对");
    } else {
      return true
    }
  } else {
    return true
  }
}
/**
 * 手机号正则
 */
export function mobile(rule, value, data, callback) {
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

/**
 * 公司名称校验
 */
export function CompanyCheck(rule, value, data, callback) {
  if (value) {
    var reg1 = /^(?!.*[()]).*$/
    var reg = /^[^\s]+$/;
    if (reg.test(value) == false) {
      callback("不允许有空格");
    } else if (reg1.test(value) == false) {
      callback("不允许有英文括号");
    } else {
      return true
    }
  } else {
    return true
  }
}

/**
 * 项目名称校验
 */
export function projectNameCheck(rule, value, data, callback) {
  if (value) {
    var reg = /^\S.*\S$|^.$/;
    if (reg.test(value) == false) {
      callback("首尾不允许有空格");
    } else {
      return true
    }
  } else {
    return true
  }
}

// // 保函金额 0-50万
export function isValidNumberBh2(rule, value, data, callback) {
  if (value) {
    
    if (value > 0 && value <= 500000) {
      return true
    
    } else {
      callback("请输入准确的担保金额，限0-50万(含）");
    }

  } else {
    return true
  }
}
// 保函期限0-36
export function isValidDay2(rule, value, data, callback) {
  if (value) {
    var reg = /^[1-9]\d*$/;
    if (reg.test(value) == false) {
      callback("请输入正整数");
    } else {
      if (value > 36) {
        callback("请输入准确的保函期限，限0-36个月(含）");
      } else {
        return true
      }
    }
  } else {
    return true
  }

  // return num >= 2000000 && num <= 5000000;
}

//email
export function email(rule, value, data, callback) {
  if (value) {
    var reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (reg.test(value) == false) {
      callback("请输入正确的邮箱");
    } else {
      return true
    }
  } else {
    return true
  }
}
// 大陆身份证号
export function IDcard(rule, value, data, callback) {
  if (value) {
    var reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    if (reg.test(value) == false) {
      callback("请输入正确的身份证号");
    } else {
      return true
    }
  } else {
    return true
  }
}
