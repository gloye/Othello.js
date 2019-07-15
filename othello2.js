const model = new Array(64).fill(0)

// 初始化
model[34] = 1
model[35] = 2
model[42] = 2
model[43] = 1

// helper 辅助函数
const coordinateToIndex = (x, y) => x + y * 8
const indexToCoordinate = i => [i % 8, (i - (i % 8)) / 8]
const checkPosition = ([x, y]) => {
  if (x < 0 && x >= 8 && y < 0 && y >= 8) return false // 边界处理
  if (model[coordinateToIndex(x, y)] !== 0) return false // 非空处理
  return true
}

const actionMap = (position = [0, 0]) => {
  const [x, y] = position
  return new Map([
    [
      [x - 1, y + 1],
      function leftTop(fn) {
        let [m, n] = [x, y]
        while (m < 8 && n > 0) {
          if (fn(m++, n--)) break
        }
      }
    ],
    [
      [x - 1, y],
      function left(fn) {
        let [m, n] = [x, y]
        while (m < 8) {
          if (fn(m++, n)) break
        }
      }
    ],
    [
      [x - 1, y - 1],
      function leftBottom(fn) {
        let [m, n] = [x, y]
        while (m < 8 && n < 8) {
          if (!fn(++m, ++n)) break
        }
      }
    ],
    [
      [x, y + 1],
      function top(fn) {
        let [m, n] = [x, y]
        while (n >= 0) {
          if (fn(m, n--)) break
        }
      }
    ],
    [
      [x, y - 1],
      function bottom(fn) {
        let [m, n] = [x, y]
        while (n < 8) {
          if (fn(m, n++)) break
        }
      }
    ],
    [
      [x + 1, y + 1],
      function rightTop(fn) {
        let [m, n] = [x, y]
        while (m >= 0 && n >= 0) {
          if (fn(m--, n--)) break
        }
      }
    ],
    [
      [x + 1, y],
      function right(fn) {
        let [m, n] = [x, y]
        while (m >= 0) {
          if (fn(m--, n)) break
        }
      }
    ],
    [
      [x + 1, y - 1],
      function rightBottom(fn) {
        let [m, n] = [x, y]
        while (m >= 0 && n < 8) {
          if (fn(m--, n++)) break
        }
      }
    ]
  ])
}

// 找关联 定边界
const findDiscsActive = function(i) {
  const [x, y] = indexToCoordinate(i)
  let discs = [i]
  let resolve = false
  function checkStatus(x, y) {
    const index = coordinateToIndex(x, y)
    if (model[index] === 1) {
      discs.push(index)
      return true
    }
    if (model[index] === 2) {
      resolve = true
    }
    return false
  }
  const newMap = actionMap([x, y])
  newMap.forEach((handle, key) => {
    if (checkPosition(key)) {
      handle && handle(checkStatus)
    }
  })
  if (resolve) {
    return discs
  }
  return []
}


// 下一个
const nextStatus = 1

// 分棋子
const oppositeDiscs = []
model.forEach((status, index) => {
  if (status === 3 - nextStatus) oppositeDiscs.push(index)
})

// 被改变的集合
let discs = []

oppositeDiscs.forEach(
  disc => (discs = [...new Set([...discs, ...findDiscsActive(disc)])])
)

if(!discs.length){
   nextStatus = 3 - nextStatus
}