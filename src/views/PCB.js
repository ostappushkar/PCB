import React, { Component } from "react";
import { Auth, Threshold } from "../services";
import { ZhangSuen } from "../zhangsuen";
import {
  Button,
  FormInput,
  Card,
  CardHeader,
  Container,
  Row,
  Col,
  CardBody,
  Slider,
  CardFooter,
} from "shards-react";

const initialState = {
  skeletonized: false,
  authorized: false,
  etalonEnds: [],
  etalonSwitches: [],
  background: false,
  image1: false,
  image2: false,
  open: false,
  defects: false,
  radius: 6,
};
class PCB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleRadius = this.handleRadius.bind(this);
    this.imageRestore = this.imageRestore.bind(this);
  }
  handleImage = (event) => {
    var file = event.target.files[0];
    let eventId = event.target.id;
    var fr = new FileReader();
    fr.onloadend = (e) => {
      var img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        if (eventId == "FormInput-pattern") {
          var canvas = document.getElementById("pcb-pattern");
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          this.setState({ image1: true });
        } else {
          var canvas = document.getElementById("pcb-canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var context = canvas.getContext("2d");
          context.drawImage(img, 0, 0);
          this.setState({ image2: true });
        }
      };
    };
    fr.readAsDataURL(file);
  };
  handleRadius(value) {
    this.setState({ radius: parseFloat(value[0]) }, () => {
      console.log(this.state.radius);
    });
  }
  handleSave = (event) => {
    var c = document.getElementById("defects");
    event.target.href = c.toDataURL();
    event.target.download = "result.png";
  };
  getBackground = (canvas, cb) => {
    let context = canvas.getContext("2d");
    let data = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let whiteCount = 0,
      blackCount = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] > 250 && data[i + 1] > 250 && data[i + 2] > 250) {
        whiteCount++;
      } else {
        blackCount++;
      }
    }
    console.log(whiteCount, blackCount);
    console.log(whiteCount > blackCount);
    this.setState({ background: whiteCount > blackCount }, () => {
      cb && cb();
    });
  };
  imageSkeleton = () => {
    if (!this.state.skeletonized) {
      let c1 = document.getElementById("pcb-canvas");
      let c1Clone = c1.cloneNode(true);
      c1Clone.id = "pcb-canvas-skeleton";
      c1Clone.className = "restoreElements";

      let ctx1 = c1Clone.getContext("2d");
      ctx1.drawImage(c1, 0, 0);
      let c2 = document.getElementById("pcb-pattern");
      let c2Clone = c2.cloneNode();
      c2Clone.id = "pcb-pattern-skeleton";
      c2Clone.className = "restoreElements";
      let ctx2 = c2Clone.getContext("2d");
      ctx2.drawImage(c2, 0, 0);
      Threshold(c1Clone, ctx1, 120);
      Threshold(c2Clone, ctx2, 120);
      const thin1 = new ZhangSuen();
      const thin2 = new ZhangSuen();
      this.getBackground(c1Clone, () => {
        thin1.init(c1Clone, ctx1, this.state.background);
      });
      this.getBackground(c2Clone, () => {
        thin2.init(c2Clone, ctx2, this.state.background);
      });
      this.setState({ skeletonized: true });
      c1.parentNode.appendChild(c1Clone);
      c2.parentNode.appendChild(c2Clone);
    }
  };
  imageAuthorization = () => {
    if (!this.state.authorized) {
      let c1 = document.getElementById("pcb-canvas-skeleton");
      let c1Clone = c1.cloneNode(true);
      c1Clone.id = "pcb-canvas-auth";
      c1Clone.className = "restoreElements";
      let ctx1 = c1Clone.getContext("2d");
      ctx1.drawImage(c1, 0, 0);
      let c2 = document.getElementById("pcb-pattern-skeleton");
      let c2Clone = c2.cloneNode();
      c2Clone.id = "pcb-pattern-auth";
      c2Clone.className = "restoreElements";

      let ctx2 = c2Clone.getContext("2d");
      ctx2.drawImage(c2, 0, 0);

      c1.parentNode.appendChild(c1Clone);
      c2.parentNode.appendChild(c2Clone);
      Auth(c2Clone, ctx2, this.state.radius, (ends, switches) => {
        let c2Empty = c2.cloneNode(true);
        c2Empty.id = "pattern-empty";
        c2Empty.className = "restoreElements";
        let emptyCtx = c2Empty.getContext("2d");
        emptyCtx.clearRect(0, 0, c2Empty.width, c2Empty.height);
        ends.forEach((end) => {
          emptyCtx.beginPath();
          emptyCtx.arc(end.x, end.y, this.state.radius, 0, 2 * Math.PI);
          emptyCtx.fillStyle = "red";
          emptyCtx.lineWidth = 2;
          emptyCtx.closePath();
          emptyCtx.fill();
        });
        switches.forEach((end) => {
          emptyCtx.beginPath();
          emptyCtx.arc(end.x, end.y, this.state.radius, 0, 2 * Math.PI);
          emptyCtx.fillStyle = "blue";
          emptyCtx.lineWidth = 2;
          emptyCtx.closePath();
          emptyCtx.fill();
        });
        c2.parentNode.appendChild(c2Empty);
        this.setState({ patternEnds: ends, patternSwitches: switches }, () => {
          Auth(c1Clone, ctx1, this.state.radius, (ends, switches) => {
            let c1Empty = c1.cloneNode(true);
            c1Empty.id = "canvas-empty";
            c1Empty.className = "restoreElements";
            let emptyCtx = c1Empty.getContext("2d");
            emptyCtx.clearRect(0, 0, c1Empty.width, c1Empty.height);
            ends.forEach((end) => {
              emptyCtx.beginPath();
              emptyCtx.arc(end.x, end.y, this.state.radius, 0, 2 * Math.PI);
              emptyCtx.fillStyle = "red";
              emptyCtx.lineWidth = 2;
              emptyCtx.closePath();
              emptyCtx.fill();
            });
            switches.forEach((end) => {
              emptyCtx.beginPath();
              emptyCtx.arc(end.x, end.y, this.state.radius, 0, 2 * Math.PI);
              emptyCtx.fillStyle = "blue";
              emptyCtx.lineWidth = 2;
              emptyCtx.closePath();
              emptyCtx.fill();
            });
            c1.parentNode.appendChild(c1Empty);
            this.setState({
              etalonEnds: ends,
              etalonSwitches: switches,
              authorized: true,
            });
          });
        });
      });
    }
  };
  handleCompare = () => {
    if (!this.state.defects) {
      let canvas = document.getElementById("canvas-empty");
      let emptyCanvasCtx = canvas.getContext("2d");
      let pattern = document.getElementById("pattern-empty");
      let emptyPatternCtx = pattern.getContext("2d");
      let defects = [];
      let equal;
      for (let j = 0; j < this.state.etalonEnds.length; j++) {
        let pixel = this.state.etalonEnds[j];
        let circle = emptyPatternCtx.getImageData(
          pixel.x - 6,
          pixel.y - 6,
          12,
          12
        ).data;
        equal = 0;
        for (let j = 0; j < circle.length; j += 4) {
          if (circle[j] > 250 && circle[j + 1] === 0 && circle[j + 2] === 0) {
            equal++;
          }
        }
        if (equal < 10) {
          defects.push(pixel);
        }
      }
      for (let j = 0; j < this.state.etalonSwitches.length; j++) {
        let pixel = this.state.etalonSwitches[j];
        let circle = emptyPatternCtx.getImageData(
          pixel.x - 6,
          pixel.y - 6,
          12,
          12
        ).data;
        equal = 0;
        for (let j = 0; j < circle.length; j += 4) {
          if (circle[j] === 0 && circle[j + 1] === 0 && circle[j + 2] >= 250) {
            equal++;
          }
        }
        if (equal < 10) {
          defects.push(pixel);
        }
      }
      for (let j = 0; j < this.state.patternEnds.length; j++) {
        let pixel = this.state.patternEnds[j];
        let circle = emptyCanvasCtx.getImageData(
          pixel.x - 6,
          pixel.y - 6,
          12,
          12
        ).data;
        equal = 0;
        for (let j = 0; j < circle.length; j += 4) {
          if (circle[j] > 250 && circle[j + 1] === 0 && circle[j + 2] === 0) {
            equal++;
          }
        }
        if (equal < 10) {
          defects.push(pixel);
        }
      }
      for (let j = 0; j < this.state.patternSwitches.length; j++) {
        let pixel = this.state.patternSwitches[j];
        let circle = emptyCanvasCtx.getImageData(
          pixel.x - 6,
          pixel.y - 6,
          12,
          12
        ).data;
        equal = 0;
        for (let j = 0; j < circle.length; j += 4) {
          if (circle[j] === 0 && circle[j + 1] === 0 && circle[j + 2] >= 250) {
            equal++;
          }
        }
        if (equal < 10) {
          defects.push(pixel);
        }
      }

      let pcbPattern = document.getElementById("pcb-pattern");
      let defectsPCB = pcbPattern.cloneNode(true);
      defectsPCB.id = "defects";
      defectsPCB.className='restoreElements';
      var patternContext = defectsPCB.getContext("2d");
      patternContext.drawImage(pcbPattern, 0, 0);
      for (let i = 0; i < defects.length; i++) {
        for (let j = 0; j < defects.length; j++) {
          if (i === j) continue;
          if (
            Math.abs(defects[i].x - defects[j].x) <= 12 &&
            Math.abs(defects[i].y - defects[j].y) <= 12
          ) {
            defects[i].x = 0;
            defects[i].y = 0;
          }
        }
      }
      defects.filter((defect) => defect.x !== 0 && defect.y !== 0);
      defects.forEach((defect) => {
        patternContext.beginPath();
        patternContext.arc(defect.x, defect.y, 8, 0, 2 * Math.PI);
        patternContext.strokeStyle = "green";
        patternContext.lineWidth = 2;
        patternContext.closePath();
        patternContext.stroke();
      });

      this.setState({ defects: true }, () => {
        let defectsBody = document.getElementById("defects-body");
        defectsBody.appendChild(defectsPCB);
      });
    }
  };
  handleOnLoad(event) {
    var img = event.target;
    var c = document.getElementById("canvas");
    c.width = img.width;
    c.height = img.height;
    var ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }
  imageRestore() {
    this.setState({ ...initialState }, () => {
      [...document.getElementsByClassName("restoreElements")].map(
        (n) => n && n.remove()
      );
    });
  }
  render() {
    return (
      <div className="pcb-wrapper">
        <Button
          disabled={!this.state.image1 || !this.state.image2}
          onClick={this.imageSkeleton}
        >
          Skeleton
        </Button>
        <Button
          disabled={!this.state.skeletonized}
          onClick={this.imageAuthorization}
        >
          Authorization
        </Button>
        <Button disabled={!this.state.authorized} onClick={this.handleCompare}>
          Compare
        </Button>
        <Button onClick={this.imageRestore}>Restore original</Button>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader>Radius</CardHeader>
                <CardBody>
                  <Slider
                    animate
                    connect={[true, false]}
                    onSlide={this.handleRadius}
                    start={[this.state.radius]}
                    step={1}
                    range={{ min: 1, max: 10 }}
                    tooltips
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  Etalon
                  <FormInput
                    id="FormInput-pcb"
                    onChange={this.handleImage}
                    type="file"
                    accept=".jpg, .jpeg, .png .bmp"
                  ></FormInput>
                </CardHeader>
                <CardBody>
                  <canvas id="pcb-canvas"></canvas>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card>
                <CardHeader>
                  Pattern
                  <FormInput
                    id="FormInput-pattern"
                    onChange={this.handleImage}
                    type="file"
                    accept=".jpg, .jpeg, .png .bmp"
                  ></FormInput>
                </CardHeader>
                <CardBody>
                  <canvas id="pcb-pattern"></canvas>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        {this.state.defects && (
          <Container id="defectsContainer">
            <Row>
              <Col>
                <Card>
                  <CardHeader>Defects</CardHeader>
                  <CardBody id="defects-body"></CardBody>
                  <CardFooter>
                    <a href="#" onClick={this.handleSave}>
                      Save
                    </a>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    );
  }
}

export default PCB;
