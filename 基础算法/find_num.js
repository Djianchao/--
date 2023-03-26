// 找数相关的算法

/*
  利用异或的性质 可以在一些情况下找到一些数
    1. 数组中，一个数出现了奇数次，其他数出现了偶数次，则找到出现奇数次的数 --- 直接把数组中的所有数异或一边
    2. 数组中，有两个不同的数出现了奇数次，其他数出现了偶数次，找到这两个数
*/

const data = [1, 1, 2, 3, 3, 5, 6, 6]

function findOddNum(data) {
  let eor = 0
  data.forEach(num => {
    eor ^= num
  });
  // eor = a ^ b, a != b，eor肯定不是 0 
  let rightOne = eor & (~eor + 1) // 取到 eor 中最右边的 1
  let onlyOne = 0;
  data.forEach(num => {
    // 两边情况下 只取一边
    if (num & rightOne == 1) {
      onlyOne ^= num
    }
  })

  console.log(onlyOne, onlyOne ^ eor);
}

// 找一个局部最小值，data 中任意相邻的数都是不相等的，边界上只要有一个一边是下降趋势，中间的数两边都是下降趋势 的数就是局部最小值
// 数据状况和，题目要求都很特殊，可以用 二分法
function find_localMin(data) {

}

findOddNum(data)