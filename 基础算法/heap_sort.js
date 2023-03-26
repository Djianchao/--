/*
  堆排序
  堆排序扩展 -- 有一个数组已经是基本有序的状态(排序后任意一个元素移动的距离不超过k), 选择合适的算法进行排序
  --> 利用小根堆 假设 k = 6 , 则 把前 7 个数拿出来 然后构成一个小根堆，把堆中最小的值弹出来放到 i 位置(0, 1...)
  然后再 把 第8个元素加入的堆中 重新构造堆
*/

function swap(data, i, j) {
  // 利用异或的性质完成交换则不需要辅助变量, 引用型数据时候 i 不能等于 j，不然的话就是同一块内存的数据进行异或最后被洗成了0
  if (i !== j) {
    data[i] = data[i] ^ data[j]
    data[j] = data[i] ^ data[j]
    data[i] = data[i] ^ data[j]
  }
}


// 往堆中插入元素, 并且保持堆结构, 调大根堆
function heapInsert(heap, num, index) {
  let parentIndex = Math.round((index - 1) / 2)
  heap[index] = num
  while (parentIndex > 0) {
    if (num > heap[parentIndex]) {
      swap(heap, index, parentIndex)
    }
    index = parentIndex
    parentIndex = Math.round((index - 1) / 2)
  }

  // heap 的 size 加 1
  heap[0]++
}

// 重新调整大根堆
function heapAdjust(heap, index, heapSize) {
  // 拿到左孩子
  let left = index * 2, right, largest;
  while (left <= heapSize) {
    right = left + 1
    if (right <= heapSize) {
      // 如果有右孩子 记录左右孩子中较大的那个孩子
      largest = heap[left] > heap[right] ? left : right
    } else {
      largest = left
    }
    // 要调整的节点和较大孩子之间进行比较
    largest = heap[index] > heap[largest] ? index : largest
    if (index === largest) {
      // 不需要调整
      break
    }

    swap(heap, largest, index)
    // 继续往下调整
    index = largest
    left = index * 2
  }
}

// 产生count个数的大根堆
function genMaxHeap(count) {
  let data = [0]
  for (let i = 1; i <= count; i++) {
    heapInsert(data, Math.floor(Math.random() * 100), i)
  }

  return data
}

function genMaxHeap2(data) {
  // 也可以从最底开始从右往左调用 heapJust 来构成堆，前提是用户传入了一堆的数
  let heapSize = data.length - 1
  for (let i = heapSize; i >= 1; i--) {
    heapAdjust(data, i, heapSize)
  }

  return data;
}

function heap_sort(heap) {
  let heapSize = heap[0]
  while (heapSize > 1) {
    swap(heap, 1, heapSize)
    heapSize--
    // 调整堆
    heapAdjust(heap, 1, heapSize)
  }
}

// const heap = genMaxHeap(5)
// console.log(heap);

// heap_sort(heap)
// console.log(heap);

let data = [7, 2, 3, 7, 8, 1, 2, 9]
console.log(genMaxHeap2(data));