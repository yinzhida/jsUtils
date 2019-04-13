function compare (a, b) {
  return (a - b) > 0;
}

// 冒泡排序O(n^2)
const bubbleSort = function (arrayData, compareFn = compare) {
  let len = arrayData.length;
  for (let i = len - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      if (compareFn(arrayData[j], arrayData[j + 1])) {
        [arrayData[j], arrayData[j + 1]] = [arrayData[j + 1], arrayData[j]];
      }
    }
  }
}

// 快速排序 O(n*logn)
function getMid (arrayData) {
  return arrayData[0];
}

const quickSort = function (arrayData, compareFn = compare, getMidFn = getMid) {
  let len = arrayData.length;
  if (len < 2) {
    return arrayData;
  }
  let mid = getMidFn(arrayData);
  let smallGroup = [];
  let largeGroup = [];
  let midGroup = [];
  for (let i = 0; i < len; i++) {
    if (compareFn(mid, arrayData[i])) {
      smallGroup.push(arrayData[i]);
    } else if (compareFn(arrayData[i], mid)) {
      largeGroup.push(arrayData[i]);
    } else {
      midGroup.push(arrayData[i]);
    }
  }
  return [...quickSort(smallGroup, compareFn, getMidFn), ...midGroup, ...quickSort(largeGroup, compareFn, getMidFn)];
}

// 归并排序 O(n*logn)
const mergeSort = function (arrayData, compareFn = compare) {
  let merge = function (leftArray, rightArray, compareFn) {
    let resultArray = [];
    while (leftArray.length > 0 && rightArray.length > 0) {
      if (compareFn(leftArray[0], rightArray[0])) {
        resultArray.push(leftArray.shift());
      } else {
        resultArray.push(rightArray.shift());
      }
    }
    return resultArray = resultArray.concat(leftArray, rightArray);
  }

  if (arrayData.length <= 1) {
    return arrayData;
  }

  let midIndex = parseInt(arrayData.length / 2);
  let leftArray = arrayData.slice(0, midIndex);
  let rightArray = arrayData.slice(midIndex);
  return merge(mergeSort(leftArray, compareFn), mergeSort(rightArray, compareFn), compareFn);
}

// test codes
// let strArray = ['a', 'c', 'b', 'e', 'd']
// strArray = mergeSort(strArray, (a, b) => {
//     return (a.codePointAt() - b.codePointAt()) > 0;
// });
// console.log(strArray);

// let strArray = ['a', 'c', 'b', 'e', 'd']
// bubbleSort(strArray, (a, b) => {
//  return (a.codePointAt() - b.codePointAt()) > 0;
// });
// console.log(strArray);

export {
  bubbleSort,
  quickSort,
  mergeSort
};
