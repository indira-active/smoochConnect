import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client';
const socket = io();

class App extends Component {
  componentWillMount = ()=>{
      console.log('testing')
      socket.on('testEvent', res=>{console.log(res);})
  }
  render() {
    return 
      (<div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Indira</h1>
        </header>
        <p className="App-intro">
          messages below
        </p>
      </div>
    )
  }
}

export default App;
