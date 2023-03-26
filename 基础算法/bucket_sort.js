/*
  基数排序(计数排序 -- 简单的基数排序)
  10进制为例 数组中的每一个元素的位数必须一致 设为 n (不一致的话用最大的数的位数补齐)

  准备10个桶，依次扫描数组 并放到相应的桶中 然后依次倒出(先进的先倒出) 循环 n 次 后 变成有序
*/

// 算出数组中的最大值
function getMax(data) {
  // 假设第一个数是最大值
  let max = data[0]
  for (let i = 1; i < data.length; i++) {
    max = Math.max(max, data[i])
  }

  return max
}

// 算出 n 
function getDigitCount(max, digits) {
  let count = 0
  while (max > 0) {
    max = Math.round(max / digits)
    count++
  }

  return count
}

// 从右向左，i = 1 拿到第一位数 .... 
function getDigit(num, i, digits) {
  // 103 -- > i = 1 --> 103 % 10 
  let index = i - 1
  num = Math.round(num / Math.pow(digits, index))
  return num % digits

}

// 只考虑正数的情况
function bucket_sort(data, digits) {
  let count = getDigitCount(getMax(data), digits)
  const buckets = new Array(10).fill(0)
  const len = data.length
  const help = new Array(len).fill(0)
  let J = 1;

  while (J <= count) {
    // 根据 位置进行放桶操作
    data.forEach(num => {
      let digit = getDigit(num, J, digits)
      buckets[digit]++
    })

    // 变成累加和数组
    for (let i = 1; i < buckets.length; i++) {
      buckets[i] = buckets[i] + buckets[i - 1]
    }

    // 出桶操作
    for (let i = len - 1; i >= 0; i--) {
      let digitIndex = getDigit(data[i], J, digits)
      let outPutIndex = --buckets[digitIndex]
      help[outPutIndex] = data[i]
      // buckets[digitIndex]--
    }

    // 在赋值给data
    for (let i = 0; i < len; i++) {
      data[i] = help[i]
    }

    for (let i = 0; i < buckets.length; i++) {
      // 清空桶
      buckets[i] = 0
    }

    J++
  }
}

let data = [22, 5, 2, 7, 6, 44, 9, 1, 105]

bucket_sort(data, 10)
console.log(data);