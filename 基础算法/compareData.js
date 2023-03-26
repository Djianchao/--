// 产生一个长度随机，值随机的数组
function getRandomArr(maxlen, maxVal) {
  let len = Math.random() * maxlen // Math.random() 返回的是 [0, 1)
  let res = []

  for (let i = 0; i < len; i++) {
    res.push(Math.round(Math.random() * maxVal))
  }

  return res
}

function isEqual(arr1, arr2) {
  let equal = true
  arr1.forEach((num, i) => {
    if (num !== arr2[i]) {
      equal = false
    }
  });
  return equal
}



module.exports = {
  getRandomArr,
  isEqual
}