// 归并排序 和 快速排序 (利用递归)
/* 
递归 和 master 公式
  1. 利用master 公式 估计递归算法的时间复杂度  T(N) = a*T(N/b) + O(N^d)，前提是子问题的规模是一致的
  2. 定出 a, b, d 后 就可以定出时间复杂度了 
    1. log(b, a) > d --> O(n) = O(N ^ log(b, a))
    2. log(b, a) == d --> O(n) = O(N^d * logN)
    3. log(b, a) < d --> O(n) = O(N^d)
*/

function process(data, left, right) {
  // 一个元素则本身就是有序了
  if (left === right) {
    return
  }
  let mid = left + ((right - left) >> 1) // 等价于 (left + right) / 2
  process(data, left, mid) // 让左侧区域变成有序
  process(data, mid + 1, right) // 让右侧区域有序
  merge(data, left, mid, right) // 合并左右区域
}

function merge(data, left, mid, right) {
  let help = new Array(right - left + 1)
  let l = left, r = mid + 1, i = 0
  while (l <= mid && r <= right) {
    help[i++] = data[l] <= data[r] ? data[l++] : data[r++]
  }

  while (l <= mid) {
    help[i++] = data[l++]
  }
  while (r <= right) {
    help[i++] = data[r++]
  }

  for (let i = 0; i < help.length; i++) { // 把help 在拷贝到 原始data中
    data[left + i] = help[i]
  }
}

function merge_sort(data) {
  process(data, 0, data.length - 1)
}




function processSmallSum(data, left, right) {
  // 一个元素则本身就是有序了
  if (left === right) {
    return
  }
  let mid = left + ((right - left) >> 1) // 等价于 (left + right) / 2
  processSmallSum(data, left, mid) // 让左侧区域变成有序
  processSmallSum(data, mid + 1, right) // 让右侧区域有序
  mergeSmallSum(data, left, mid, right) // 把左右两部分的小和合并起来
}


/*
  求小和问题， 一个数 x 左边所有比 x 小的数构成的总和就是 x 的小和，所有的数的小和构成总的小和
  利用归并排序的思想，在每一轮归并的时候就开始计算小和，归并完后，小和就计算出来了
*/
function mergeSmallSum(data, left, mid, right) {
  let help = new Array(right - left + 1)
  let l = left, r = mid + 1, i = 0
  while (l <= mid && r <= right) {
    // 左边的数比右边额数小的时候产生小和
    mergeSmallSum.res += data[l] < data[r] ? (right - r + 1) * data[l] : 0
    // 如果两个数相等的时候 优先放右边的数，方便计算小和
    help[i++] = data[l] < data[r] ? data[l++] : data[r++]
  }

  while (l <= mid) {
    help[i++] = data[l++]
  }
  while (r <= right) {
    help[i++] = data[r++]
  }

  for (let i = 0; i < help.length; i++) { // 把help 在拷贝到 原始data中
    data[left + i] = help[i]
  }
}

function smallSum(arr) {
  mergeSmallSum.res = 0
  processSmallSum(arr, 0, arr.length - 1)

  return mergeSmallSum.res

}



function swap(data, i, j) {
  // 利用异或的性质完成交换则不需要辅助变量, 引用型数据时候 i 不能等于 j，不然的话就是同一块内存的数据进行异或最后被洗成了0
  if (i !== j) {
    data[i] = data[i] ^ data[j]
    data[j] = data[i] ^ data[j]
    data[i] = data[i] ^ data[j]
  }
}


// 划分(荷兰国旗问题)， 小于num 的放左侧，等于 num 放中间 大于num放右边
function partition(arr, num, left, right) {
  let i = left, leftBoundary = left - 1, rightBoundary = right + 1;
  while (i < rightBoundary) {
    if (arr[i] < num) {
      // 把当前数和左边界的下一个数做交换，左边界往右扩
      swap(arr, i, leftBoundary + 1)
      leftBoundary++
      i++
    } else if (arr[i] === num) {
      i++
    } else {
      // 把当前数和右边界的上一个数做交换，右边界往左扩，i不能动，因为交换完后的数是没有看过的
      swap(arr, i, rightBoundary - 1)
      rightBoundary--
    }
  }

  // console.log(leftBoundary, rightBoundary);
  return [leftBoundary, rightBoundary]
}

function quickSort(data, left, right) {
  if (left >= right) {
    return
  }
  // 随机取一个值做划分, 注意区间不要取到相同的数
  let randomIndex = left + Math.round(Math.random() * (right - left))
  swap(data, randomIndex, right)
  let num = data[right]
  let boundarys = partition(data, num, left, right)
  // 快排左区域
  quickSort(data, 0, boundarys[0])
  // 快排右区域
  quickSort(data, boundarys[1], right)
}

// 7  ....  6 9 3
function testQuickSort() {
  let data = [3, 2, 1, 5, 2, 7, 6, 9, 0, 8, 100]
  quickSort(data, 0, data.length - 1)
  console.log(data);
}





// const data = [5, 2, 1, 4, 8, 3, 10, 6]
// merge_sort(data)
// console.log(data);

// 小和为  1 + 4 + 1 + 10 = 16
// const data = [1, 3, 4, 2, 5]
// let res = smallSum(data)
// console.log(res);

testQuickSort()