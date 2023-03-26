
const { getRandomArr, isEqual } = require('./compareData.js')

const data = [5, 2, 1, 4, 8, 3, 10, 6]


function swap(i, j, data) {
  // 利用异或的性质完成交换则不需要辅助变量, 引用型数据时候 i 不能等于 j，不然的话就是同一块内存的数据进行异或最后被洗成了0
  if (i !== j) {
    data[i] = data[i] ^ data[j]
    data[j] = data[i] ^ data[j]
    data[i] = data[i] ^ data[j]
  }
}

/* 
  选择排序
    1. 从 0 - n-1 的位置中选出一个最小的数放到 第 i(0 - n-1) 个位置

*/
function select_sort(data) {
  let minIndex
  let len = data.length
  for (let j = 0; j < len; j++) {
    minIndex = j
    for (let i = j + 1; i < len; i++) {
      // 找到第 j 小的数
      if (data[i] < data[minIndex]) {
        minIndex = i
      }
    }

    swap(j, minIndex, data)
  }

  return data
}

/*
  冒泡排序
    1. 从后往前比 一轮循环两两比较，前一个大于后一个则交换，，一轮循环后最小的值就浮到了最前
*/
function bubble_sort(data) {
  let isSwap = false
  let last = data.length - 1;
  for (let j = last; j > 0; j--) {
    for (let i = last; i > last - j; i--) {
      // 后一个数小于前一个数则上浮
      if (data[i] < data[i - 1]) {
        swap(i, i - 1, data)
        isSwap = true
      }
    }
    // 没有交换后则可以直接返回了
    if (!isSwap) {
      console.log(data);
      return
    }
  }

  return data
}

/*
  想象抓牌拍的时候，每次抓一张拍就完之前放好牌的额一个位置去插入，在数据情况不同的情况下 大 O 会有差别
*/
function insert_sort(data) {
  // 第一个位置就是有序了
  for (let i = 1; i < data.length; i++) {
    for (let j = i; j > 0 && data[j - 1] > data[j]; j--) {
      swap(j, j - 1, data)
    }
  }

  return data
}

function compFn(a, b) {
  return a - b;
}


// select_sort(data)
// bubble_sort(data);
// insert_sort(data)

for (let i = 0; i < 100000; i++) {
  let arr1 = getRandomArr(100, 100)
  let arr2 = [...arr1]
  if (!isEqual(insert_sort(arr1), arr2.sort(compFn))) {
    console.log('fail...');
    break
  }
}

console.log('success all done...');

