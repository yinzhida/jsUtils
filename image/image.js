/*
 * Created Date: 2019-04-08 11:20:33
 * Author: yinzhida Email: yinzhida@qiyi.com
 * -----
 * Last Modified: 2019-04-08 11:38:49
 * Modified By: yinzhida yinzhida@qiyi.com
 * -----
 * Copyright (c) 2019 IQIYI
 */

const base64ToBolbFile = (base64Img, fileName = 'imgfile') => {
  let InfoArray = base64Img.split(',');
  let mime = InfoArray[0].match(/:(.*?);/)[1];
  let decodedData = atob(InfoArray[1]);
  let n = decodedData.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = decodedData.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

export {
  base64ToBolbFile,
};
