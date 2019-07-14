const model = new Array(64).fill(0)

// 初始化
const initDiscs = [
  {
    x: 3,
    y: 3,
    status: 1
  },
  {
    x: 3,
    y: 4,
    status: 2
  },
  {
    x: 4,
    y: 3,
    status: 2
  },
  {
    x: 4,
    y: 4,
    status: 1
  }
]

initDiscs.forEach(({ x, y, status }) => {
  const index = y * 8 + x
  model[index] = status
})

// 下一个
const nextStatus = 1

// 分棋子
const oppositeDiscs = []

model.forEach((status, index) => {
  if (status === 3 - nextStatus) oppositeDiscs.push(index)
})

// helper 辅助函数
const getModelIndex = ([x, y]) => x + y * 8

const check = ([x, y]) => {
  const index = getModelIndex([x, y])
  if (model[index] === 0) {
    return false
  }
  if (model[index] === 1) {
    discsToChange.push([x, y])
  }
  if (model[index] === 2) {
    canMove = true
    return false
  }
}
const checkActions = ([x, y]) => {
  const actions = new Map(
    [
      [x - 1, y + 1],
      function leftTop() {
        while ((x < 8, y > 0)) {
          if (check([x++, y--])) break
        }
      }
    ],
    [
      [x - 1, y],
      function left() {
        while (x < 8) {
          if (check([x++, y])) break
        }
      }
    ],
    [
      [x - 1, y - 1],
      function leftBottom() {
        while ((x <= 8, y <= 8)) {
          if (check([x++, y++])) break
        }
      }
    ],
    [
      [x, y + 1],
      function top() {
        while (y >= 0) {
          if (check([x, y--])) break
        }
      }
    ],
    [
      [x, y - 1],
      function bottom() {
        while (y < 8) {
          if (check([x, y++])) break
        }
      }
    ],
    [
      [x + 1, y + 1],
      function rightTop() {
        while ((x >= 0, y >= 0)) {
          if (check(x--, y--)) break
        }
      }
    ],
    [
      [x + 1, y],
      function right() {
        while (x >= 0) {
          if (check(x--, y)) break
        }
      }
    ],
    [
      [x + 1, y - 1],
      function rightBottom() {
        while ((x >= 0, y < 8)) {
          if (check(x--, y++)) break
        }
      }
    ]
  )
}

// 找关联 定边界
const findDiscsCanMove = function(i) {
  let x = i % 8
  let y = (i - (i % 8)) / 8
  const aroundDiscs = [
    [x - 1, y + 1],
    [x - 1, y],
    [x - 1, y - 1],
    [x, y + 1],
    [x, y - 1],
    [x + 1, y + 1],
    [x + 1, y],
    [x + 1, y - 1]
  ]
  const relDiscs = aroundDiscs
    .filter(disc => disc[0] >= 0 && disc[1] >= 0 && disc[0] < 8 && disc[1] < 8) // 边界处理
    .filter(disc => model[getIndex(disc)] === 0) // 空值
    .filter(disc => checkDisc(disc)) // 可以落子
  return relDiscs
}

//
const discs = []

oppositeDiscs.forEach(
  disc => (discs = [...new Set([...discs, ...findDiscsCanMove(disc)])])
)