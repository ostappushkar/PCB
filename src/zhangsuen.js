function Point(x, y) {
  this.x = x;
  this.y = y;
}
export class ZhangSuen {
  width = 0;
  height = 0;
  background = 0;
  grid = [];
  nbrs = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
    [0, -1],
  ];

  nbrGroups = [
    [
      [0, 2, 4],
      [2, 4, 6],
    ],
    [
      [0, 2, 6],
      [0, 4, 6],
    ],
  ];

  toWhite = [];
  init = function (canvas, context, bg) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.background = bg;
    let imageData = context.getImageData(0, 0, this.width, this.height);
    let data = imageData.data;
    var pixelMatrix = [];
    for (let i = 0; i < data.length; i += 4) {
      if (bg) {
        pixelMatrix[i / 4] =
          data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50 ? 1 : 0;
      } else {
        pixelMatrix[i / 4] =
          data[i] < 50 && data[i + 1] < 50 && data[i + 2] < 50 ? 0 : 1;
      }
    }
    while (pixelMatrix.length > 0) {
      this.grid.push(pixelMatrix.splice(0, this.width));
    }
    this.thinImage(context);
  };
  thinImage = function (context) {
    var firstStep = false;
    var hasChanged;
    do {
      hasChanged = false;
      firstStep = !firstStep;
      for (var r = 1; r < this.grid.length - 1; r++) {
        for (var c = 1; c < this.grid[0].length - 1; c++) {
          if (this.grid[r][c] !== 1) continue;
          var nn = this.numNeighbors(r, c);
          if (nn < 2 || nn > 6) continue;
          if (this.numTransitions(r, c) !== 1) continue;
          if (!this.atLeastOneIsWhite(r, c, firstStep ? 0 : 1)) continue;
          this.toWhite.push(new Point(c, r));
          hasChanged = true;
        }
      }
      for (let i = 0; i < this.toWhite.length; i++) {
        var p = this.toWhite[i];
        this.grid[p.y][p.x] = 0;
      }
      this.toWhite = new Array();
    } while (firstStep || hasChanged);
    this.printResult(context);
  };
  numNeighbors = function (r, c) {
    var count = 0;
    for (var i = 0; i < this.nbrs.length - 1; i++)
      if (this.grid[r + this.nbrs[i][1]][c + this.nbrs[i][0]] === 1) count++;
    return count;
  };
  numTransitions = function (r, c) {
    var count = 0;
    for (var i = 0; i < this.nbrs.length - 1; i++)
      if (this.grid[r + this.nbrs[i][1]][c + this.nbrs[i][0]] === 0) {
        if (this.grid[r + this.nbrs[i + 1][1]][c + this.nbrs[i + 1][0]] === 1)
          count++;
      }
    return count;
  };
  atLeastOneIsWhite = function (r, c, step) {
    var count = 0;
    var group = this.nbrGroups[step];
    for (var i = 0; i < 2; i++)
      for (var j = 0; j < group[i].length; j++) {
        var nbr = this.nbrs[group[i][j]];
        if (this.grid[r + nbr[1]][c + nbr[0]] === 0) {
          count++;
          break;
        }
      }
    return count > 1;
  };
  printResult = function (context) {
    for (let i = 0; i < this.height; i++) {
      for (let y = 0; y < this.width; y++) {
        if (this.grid[i][y]) {
          this.grid[i][y] = [0, 0, 0, 255];
        } else {
          this.grid[i][y] = [255, 255, 255, 255];
        }
      }
    }
    var newData = context.createImageData(this.width, this.height);
    newData.data.set(this.grid.flat(2));
    context.putImageData(newData, 0, 0);
  };
}
