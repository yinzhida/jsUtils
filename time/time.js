/**
 * @Desc:   时间处理工具
 * @Author: yinzhida
 * @Email:  yinzhida@qiyi.com
 * @Date:   2018-02-27 15:42:44
 * @Last Modified by:   yinzhida
 * @Last Modified time: 2018-02-28 15:21:33
 */

/**
 * 根据时间格式，将数字格式的时间转换为格式字符串
 * @param  {[type]} secondtime   [description]
 * @param  {[type]} formatString [description]
 * @return {[type]}              [description]
 */
const formatTime = (secondtime, formatString, frameRate) => {
  formatString = formatString || 'hh:mm:ss S';

  if (/SS+|FF+/.test(formatString)) {
    console.error('formatTime', '毫秒格式错误，不能有多个连续的S或F出现');
    return;
  }

  let timeKey = [{
    name: 'hour',
    regString: 'h+'
  }, {
    name: 'minute',
    regString: 'm+'
  }, {
    name: 'second',
    regString: 's+'
  }];

  if (!/S|F/.test(formatString)) {
    secondtime = Math.floor(secondtime);
  }

  let timeNumbers = getTimeNumbers(secondtime, frameRate);

  for (let i = 0, len = timeKey.length; i < len; i++) {
    formatString = formatString.replace(new RegExp(timeKey[i].regString), function (matchString, index, originalString) {
      return formatNumber(timeNumbers[timeKey[i].name], matchString.length);
    });
  }

  // 毫秒只支持3位模式
  formatString = formatString.replace(/S/, formatNumber(timeNumbers.milli, 3));
  formatString = formatString.replace(/F/, formatNumber(timeNumbers.frame));
  return formatString;
};

/**
 * 根据时间number获取小时，分钟，秒，毫秒数
 * @param  {[type]} secondtime [description]
 * @return {[type]}            [description]
 */
const getTimeNumbers = (secondtime, frameRate = 25) => {
  // 转成字符串
  secondtime = secondtime.toFixed(3);
  // 从小数点切分
  let timeArray = secondtime.split('.');
  // 小数点后三位是毫秒部分
  let milliSecond = 0;
  let frame = 0;
  if (timeArray[1]) {
    milliSecond = Math.round(Number('0.' + timeArray[1]) * 1000);
    frame = Math.floor(milliSecond / (1000 / frameRate));
  }
  // 分别获取时分秒
  let hour = 0;
  let minute = 0;
  let second = 0;
  // 一共多少秒
  let totalSeconds = Number(timeArray[0]);
  // 几个小时
  hour = Math.floor(totalSeconds / 3600);
  // 剩余秒数
  let firstRemain = totalSeconds % 3600;
  // 几分钟
  minute = Math.floor(firstRemain / 60);
  // 剩余秒数
  second = firstRemain % 60;

  let timeNumbers = {
    hour: hour,
    minute: minute,
    second: second,
    milli: milliSecond,
    frame: frame
  };

  return timeNumbers;
};

/**
 * 数字格式化,在数字前边加0，补全到几位，比如输入1,3，则输出001
 * @param  {[type]} number [description]
 * @param  {[type]} n      [description]
 * @return {[type]}        [description]
 */
const formatNumber = (number, n) => {
  n = n || 2;
  number = number + '';
  let numberArray = number.split('');

  if (numberArray.length < n) {
    let len = n - numberArray.length;
    for (let i = 0; i < len; i++) {
      numberArray.unshift('0');
    }
  }

  let res = numberArray.join('');
  return res;
};

export {
  formatTime,
  getTimeNumbers,
  formatNumber
};
