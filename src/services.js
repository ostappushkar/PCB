export const Grayscale = (c, context) => {
  let imageData = context.getImageData(0, 0, c.width, c.height);
  let data = imageData.data;
  for (var i = 0; i < data.length; i += 4) {
    var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    data[i] = avg;
    data[i + 1] = avg;
    data[i + 2] = avg;
  }
  context.putImageData(imageData, 0, 0);
};
const base = [
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 1, 0],
  ],
  [
    [1, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [0, 1, 1],
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 1, 0],
    [0, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 1],
    [1, 0, 0],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [0, 1, 0],
  ],
  [
    [0, 0, 1],
    [1, 0, 0],
    [0, 0, 1],
  ],
  [
    [0, 1, 0],
    [0, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 0],
    [0, 0, 1],
    [1, 0, 0],
  ],
  [
    [1, 0, 1],
    [0, 0, 0],
    [1, 1, 1],
  ],
  [
    [1, 1, 1],
    [0, 0, 0],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [0, 0, 1],
    [1, 0, 1],
  ],
  [
    [1, 0, 1],
    [1, 0, 0],
    [1, 0, 1],
  ],
];
export const Auth = (c, context, radius, cb) => {
  let imageData = context.getImageData(0, 0, c.width, c.height);
  let data = imageData.data;
  var pixelMatrix = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] && data[i + 1] && data[i + 2]) {
      pixelMatrix.push(1);
    } else {
      pixelMatrix.push(0);
    }
  }
  var newArray = [];
  while (pixelMatrix.length > 0) {
    newArray.push(pixelMatrix.splice(0, c.width));
  }
  var cHeight = c.height;
  var cWidth = c.width;
  let endCenters = [];
  let switchCenters = [];
  for (let y = 3; y < cHeight - 3; y++)
    for (let x = 3; x < cWidth - 3; x++)
      for (let i = 0; i < 21; i++)
        if (
          newArray[y - 1][x - 1] == base[i][0][0] &&
          newArray[y - 1][x] == base[i][0][1] &&
          newArray[y - 1][x + 1] == base[i][0][2] &&
          newArray[y][x - 1] == base[i][1][0] &&
          newArray[y][x] == base[i][1][1] &&
          newArray[y][x + 1] == base[i][1][2] &&
          newArray[y + 1][x - 1] == base[i][2][0] &&
          newArray[y + 1][x] == base[i][2][1] &&
          newArray[y + 1][x + 1] == base[i][2][2]
        ) {
          if (i >= 0 && i < 5) {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = "red";
            context.lineWidth = 2;
            context.closePath();
            context.stroke();
            endCenters.push({ x: x, y: y });
          } else {
            context.beginPath();
            context.arc(x, y, radius, 0, 2 * Math.PI);
            context.strokeStyle = "blue";
            context.lineWidth = 2;

            context.closePath();
            context.stroke();
            switchCenters.push({ x: x, y: y });
          }
        }
  cb(endCenters, switchCenters);
};

export const Threshold = (c, context, threshold) => {
  let imageData = context.getImageData(0, 0, c.width, c.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    var r = data[i];
    var g = data[i + 1];
    var b = data[i + 2];
    var v = 0.2126 * r + 0.7152 * g + 0.0722 * b >= threshold ? 255 : 0;
    data[i] = data[i + 1] = data[i + 2] = v;
  }
  context.putImageData(imageData, 0, 0);
};