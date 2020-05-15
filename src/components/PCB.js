import React, { Component } from "react";

class PCB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pcb: null,
      pattern: null,
    };
  }
  handleImage = (event) => {
    var file = event.target.files[0];
    let eventId = event.target.id;
    console.log(event.target);
    var fr = new FileReader();
    fr.onloadend = (e) => {
      var img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        if (eventId == "input-pattern") {
          var canvas = document.getElementById("pcb-pattern");
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
        } else {
          var canvas = document.getElementById("pcb-canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
        }
      };
    };
    fr.readAsDataURL(file);
  };

  handleSave = (event) => {
    var c = document.getElementById("canvas");
    let imageSource = document.getElementById("image").src;
    let imageType = imageSource.substring(
      imageSource.indexOf(":") + 1,
      imageSource.indexOf(";")
    );
    event.target.href = c.toDataURL(imageType);
    event.target.download = "result.png";
  };
  handleCompare = () => {
    var pcbCanvas = document.getElementById("pcb-canvas");
    var pcbContext = pcbCanvas.getContext("2d");
    var pcbData = pcbContext.getImageData(
      0,
      0,
      pcbCanvas.width,
      pcbCanvas.height
    );
    var pcbPixels = pcbData.data;
    var pcbPattern = document.getElementById("pcb-pattern");
    var patternContext = pcbPattern.getContext("2d");
    var patternData = patternContext.getImageData(
      0,
      0,
      pcbPattern.width,
      pcbPattern.height
    );
    var patternPixels = patternData.data;
    for (var i = 0; i < pcbPixels.length; i += 4) {
      if (
        patternPixels[i] === pcbPixels[i] &&
        patternPixels[i + 1] === pcbPixels[i + 1] &&
        patternPixels[i + 2] === pcbPixels[i + 2] &&
        patternPixels[i + 3] === pcbPixels[i + 3]
      ) {
        continue;
      } else {
        pcbPixels[i] = 255;
        pcbPixels[i + 1] = 0;
        pcbPixels[i + 2] = 0;
        pcbPixels[i + 3] = 255;
      }
    }
    pcbContext.putImageData(pcbData, 0, 0);
  };
  handleOnLoad(event) {
    var img = event.target;
    var c = document.getElementById("canvas");
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }
  render() {
    return (
      <div className="pcb-wrapper">
        <input
          id="input-pcb"
          onChange={this.handleImage}
          type="file"
          accept=".jpg, .jpeg, .png .bmp"
        ></input>
        <input
          id="input-pattern"
          onChange={this.handleImage}
          type="file"
          accept=".jpg, .jpeg, .png .bmp"
        ></input>
        <button onClick={this.handleCompare}>Compare</button>
        <canvas id="pcb-canvas"></canvas>
        <canvas id="pcb-pattern"></canvas>
      </div>
    );
  }
}

export default PCB;
