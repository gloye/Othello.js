class OthelloPattern {
  constructor() {
    this.board = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 2, 1, 0, 0, 0],
      [0, 0, 0, 1, 2, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0]
    ]
  }
  move(x, y, color, checkOnly = false) {
    let ox = x,
      oy = y

    let canMove = false

    let directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1]
    ]

    if (this.board[y][x] !== 0) return false

    for (let direction of directions) {
      x = ox
      y = oy
      let directionCanMove = false
      let hasOpposite = false
      while (true) {
        x += direction[0]
        y += direction[1]
        if (x < 0 || x >= 8 || y < 0 || y >= 8) break

        if (this.board[y][x] === 3 - color) {
          hasOpposite = true
        }
        if (this.board[y][x] === color) {
          if (hasOpposite) directionCanMove = true
          break
        }
        if (this.board[y][x] === 0) {
          break
        }
      }
      if (directionCanMove && !checkOnly) {
        while (true) {
          x -= direction[0]
          y -= direction[1]
          if (x == ox && y == oy) break
          this.board[y][x] = color
        }
      }
      canMove = canMove || directionCanMove
    }

    if (canMove && !checkOnly) {
      this.board[oy][ox] = color
      color = 3 - color
    }
    return canMove
  }
}

class OthelloGame {
  constructor() {
    this.pattern = new OthelloPattern()
    this.color = 1
  }
  checkPass() {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.pattern.move(x, y, this.color, true)) 
        return false
      }
    }
    return true
  }
  move(x, y) {
    this.pattern.move(x, y, this.color)
    this.color = 3 - this.color
    if (this.checkPass()) {
      this.color = 3 - this.color
      if (this.checkPass()) {
      }
    }
  }
}


class OthelloView{
    constructor(game,container){
            this.game = game
            this.container = container
            this.show(game.pattern)
    }
    show(pattern){
        this.container.innerHTML = "";
        for(let y = 0; y < 8; y++) {
            for(let x = 0; x < 8; x++) {
                let element = document.createElement("div");
                element.addEventListener("click", (event) => {
                    this.game.move(x, y);
                    this.show(this.game.pattern)
                })
                element.style = "vertical-align:bottom;border:solid 1px white;width:50px;height:50px;background-color:darkgreen;display:inline-block;"
                this.container.appendChild(element);
                if(pattern.board[y][x] === 1) {
                    let disc = document.createElement("div");
                    disc.style = "margin-top:5px;margin-left:5px;border-radius:20px;width:40px;height:40px;background-color:black;"
                    element.appendChild(disc);
                }
                if(pattern.board[y][x] === 2) {
                    let disc = document.createElement("div");
                    disc.style = "margin-top:5px;margin-left:5px;border-radius:20px;width:40px;height:40px;background-color:white;"
                    element.appendChild(disc);
                }
            }
            this.container.appendChild(document.createElement("br"));
        }
    }
}

var v = new OthelloView(new OthelloGame(),document.getElementById("container"))