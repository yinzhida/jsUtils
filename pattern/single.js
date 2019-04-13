/*
 * Created Date: 2018-03-15 10:23:03
 * Author: yinzhida Email: zhaoxinxin@qiyi.com
 * -----
 * Last Modified: 2019-03-26 18:25:51
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2018 IQIYI
 */
const getClassSingleton = function (Clazz) {
  let result;
  return function () {
    return result || (result = new Clazz(arguments));
  };
};

export default getClassSingleton;

