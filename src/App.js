import React, { Component } from 'react';
import './App.css';
import {Table} from "./components/Table/Table";

class App extends Component {
  render() {
    return (
      //<Header/>
        <Table shows={this.props.shows}/>
    );
  }
}

export default App;
