import React, { Component } from "react";
import "./App.css";

import Slider from "@material-ui/core/Slider";
import { Grayscale, Auth, Threshold, ZhangSuenThinning } from "./services";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threshold: 120,
      image: null,
    };
  }
  restoreOriginal = () => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
  };
  handleImage = (event) => {
    var file = event.target.files[0];
    var fr = new FileReader();
    fr.onloadend = (e) => {
      this.setState({ image: e.target.result });
    };
    fr.readAsDataURL(file);
  };
  handleThresholdChange = (event, value) => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
    this.setState({ threshold: value });
    Threshold(c, ctx, value);
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
  imageGrayscale = () => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
    Grayscale(c, ctx);
  };
  imageSkeleton = () => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
    Threshold(c, ctx, 100);
    ZhangSuenThinning(c, ctx);
  };
  imageAuthorization = () => {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    let img = document.getElementById("image");
    ctx.drawImage(img, 0, 0);
    Auth(c, ctx);
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
      <div className="App">
        <input
          onChange={this.handleImage}
          type="file"
          accept=".jpg, .jpeg, .png .bmp"
        ></input>
        <Slider
          value={this.state.threshold}
          onChange={this.handleThresholdChange}
          width={300}
          step={1}
          min={1}
          max={255}
        ></Slider>
        <img id="image" src={this.state.image} onLoad={this.handleOnLoad}></img>
        <canvas id="canvas"></canvas>
        <button onClick={this.imageAuthorization}>Authorization</button>
        <button onClick={this.imageGrayscale}>Grayscale </button>
        <button onClick={this.imageSkeleton}>Skeleton</button>
        <a onClick={this.handleSave}>Save image</a>
        <button onClick={this.restoreOriginal}>Restore original</button>
      </div>
    );
  }
}

export default App;
