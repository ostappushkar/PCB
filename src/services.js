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
export const Auth = (c, context) => {
  console.log("Canvas width: " + c.width);
  console.log("Canvas height: " + c.height);
  let imageData = context.getImageData(0, 0, c.width, c.height);
  let data = imageData.data;
  console.log(data);
  var pixelMatrix = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] && data[i + 1] && data[i + 2]) {
      pixelMatrix.push(1);
    } else {
      pixelMatrix.push(0);
    }
  }
  console.log(pixelMatrix);
  var newArray = [];
  while (pixelMatrix.length > 0) {
    newArray.push(pixelMatrix.splice(0, c.width));
  }
  var cHeight = c.height;
  var cWidth = c.width;
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
          console.log("ping!");
          if (i >= 0 && i < 5) {
            context.beginPath();
            context.lineWidth = "2";
            context.strokeStyle = "red";
            context.rect(x - 5, y - 5, 10, 10);
            context.stroke();
            /*                   if (ends)
                                 { 
                                         Form1->Status->Lines->Add("Ending at ["+varToStr(x)+";"+varToStr(y)+"]...");
                                         Form1->OutI->Canvas->Brush->Color=clRed;
                                         Bmp2->Canvas->Pen->Color=clRed;
                                         Bmp2->Canvas->MoveTo(x-5,y-5);
                                         Bmp2->Canvas->LineTo(x+5,y-5);
                                         Bmp2->Canvas->MoveTo(x+5,y-5);
                                         Bmp2->Canvas->LineTo(x+5,y+5);
                                         Bmp2->Canvas->MoveTo(x+5,y+5);
                                         Bmp2->Canvas->LineTo(x-5,y+5);
                                         Bmp2->Canvas->MoveTo(x-5,y+5);
                                         Bmp2->Canvas->LineTo(x-5,y-5);
                                 }  */
          } else {
            context.beginPath();
            context.lineWidth = "2";
            context.strokeStyle = "blue";
            context.rect(x - 5, y - 5, 10, 10);
            context.stroke();
          }
          /*                         if (switches)
                                 {
                                         Form1->Status->Lines->Add("Switch at ["+varToStr(x)+";"+varToStr(y)+"]...");
                                         Form1->OutI->Canvas->Brush->Color=clBlue;
                                         Bmp2->Canvas->Pen->Color=clBlue;
                                         Bmp2->Canvas->MoveTo(x-5,y-5);
                                         Bmp2->Canvas->LineTo(x+5,y-5);
                                         Bmp2->Canvas->MoveTo(x+5,y-5);
                                         Bmp2->Canvas->LineTo(x+5,y+5);
                                         Bmp2->Canvas->MoveTo(x+5,y+5);
                                         Bmp2->Canvas->LineTo(x-5,y+5);
                                         Bmp2->Canvas->MoveTo(x-5,y+5);
                                         Bmp2->Canvas->LineTo(x-5,y-5);
                                } */
        }
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

export const ZhangSuenThinning = (c, context) => {
  let imageData = context.getImageData(0, 0, c.width, c.height);
  let data = imageData.data;
  console.log(data);
  var pixelMatrix = [];
  for (let i = 0; i < data.length; i += 4) {
    if (data[i] && data[i + 1] && data[i + 2]) {
      pixelMatrix.push(1);
    } else {
      pixelMatrix.push(0);
    }
  }
  console.log(pixelMatrix);
  var newArray = [];
  while (pixelMatrix.length > 0) {
    newArray.push(pixelMatrix.splice(0, c.width));
  }

  var temp = [...newArray];
  var count = 0;
  do {
    count = step(1, temp, newArray);
    temp = [...newArray];
    count += step(2, temp, newArray);
    temp = [...newArray];
  } while (count > 0);
  for (let i = 0; i < c.height; i++) {
    for (let y = 0; y < c.width; y++) {
      if (newArray[i][y]) {
        newArray[i][y] = [0, 0, 0, 255];
      } else {
        newArray[i][y] = [255, 255, 255, 255];
      }
    }
  }
  var newData = context.createImageData(c.width, c.height);
  newData.data.set(newArray.flat(2));
  context.putImageData(newData, 0, 0);
};

const step = (stepNo, temp, s) => {
  var count = 0;

  for (let a = 1; a < temp.length - 1; a++) {
    for (let b = 1; b < temp[0].length - 1; b++) {
      if (SuenThinningAlg(a, b, temp, stepNo == 2)) {
        if (s[a][b]) count++;
        s[a][b] = 0;
      }
    }
  }
  return count;
};

const SuenThinningAlg = (x, y, s, even) => {
  var p2 = !!s[x][y - 1];
  var p3 = !!s[x + 1][y - 1];
  var p4 = !!s[x + 1][y];
  var p5 = !!s[x + 1][y + 1];
  var p6 = !!s[x][y + 1];
  var p7 = !!s[x - 1][y + 1];
  var p8 = !!s[x - 1][y];
  var p9 = !!s[x - 1][y - 1];

  var bp1 = NumberOfNonZeroNeighbors(x, y, s);
  if (bp1 >= 2 && bp1 <= 6) {
    if (NumberOfZeroToOneTransitionFromP9(x, y, s) == 1) {
      if (even) {
        if (p2 === false || p4 === false || p8 === false) {
          if (p2 == false || p6 == false || p8 == false) {
            return true;
          }
        }
      } else {
        if (p2 == false || p4 == false || p6 == false) {
          if (p4 == false || p6 == false || p8 === false) {
            return true;
          }
        }
      }
    }
  }
  return false;
};

const NumberOfZeroToOneTransitionFromP9 = (x, y, s) => {
  var p2 = !!s[x][y - 1];
  var p3 = !!s[x + 1][y - 1];
  var p4 = !!s[x + 1][y];
  var p5 = !!s[x + 1][y + 1];
  var p6 = !!s[x][y + 1];
  var p7 = !!s[x - 1][y + 1];
  var p8 = !!s[x - 1][y];
  var p9 = !!s[x - 1][y - 1];
  var A =
    +(!p2 && p3) +
    +(!p3 && p4) +
    +(!p4 && p5) +
    +(!p5 && p6) +
    +(!p6 && p7) +
    +(!p7 && p8) +
    +(!p8 && p9) +
    +(!p9 && p2);
  return A;
};
const NumberOfNonZeroNeighbors = (x, y, s) => {
  var count = 0;
  if (s[x - 1][y]) count++;
  if (s[x - 1][y + 1]) count++;
  if (s[x - 1][y - 1]) count++;
  if (s[x][y + 1]) count++;
  if (s[x][y - 1]) count++;
  if (s[x + 1][y]) count++;
  if (s[x + 1][y + 1]) count++;
  if (s[x + 1][y - 1]) count++;
  return count;
};
