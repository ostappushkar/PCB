import React, { Component } from "react";
import "./App.css";
import Paper from "@material-ui/core/Paper";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Skeleton from "./components/Skeleton";
import PCB from "./components/PCB";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: 0,
    };
  }
  handleTab = (event, newValue) => {
    this.setState({ tabIndex: newValue });
  };

  render() {
    return (
      <div className="App">
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.tabIndex}
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleTab}
          >
            <Tab label="Skeleton" />
            <Tab label="PCB" />
          </Tabs>
        </AppBar>
        <TabPanel value={this.state.tabIndex} index={0}>
          <Skeleton />
        </TabPanel>
        <TabPanel value={this.state.tabIndex} index={1}>
          <PCB />
        </TabPanel>
      </div>
    );
  }
}

export default App;
