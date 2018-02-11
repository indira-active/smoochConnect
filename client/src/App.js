import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import io from 'socket.io-client'
const socket = io('/');

class App extends Component {
  state = {
    messages:[
      {name:"test1",message:"test1"},{name:"test2",message:"test2"},{name:"test3",message:"test3"}
    ]
  }
  componentWillMount = ()=>{
    socket.on('testEvent', message =>
      {
        const msg = JSON.parse(message)
        if(msg.trigger==='message:appUser'){
            this.setState({
              messages:this.state.messages.concat({
              name:msg.messages[0].name,
              text:msg.messages[0].text
            })
          })
        }
      }
    );
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Indira</h1>
        </header>
        <p className="App-intro">
          messages
        </p>
        <ul>
          {this.state.messages.map((msg,index)=>{
            return (<li style={{textAlign:"left"}} key={index}>
            <p>name:{msg.name}</p>
            <p>message:{msg.text}</p>
            </li>)
          })}
        </ul>
      </div>
    );
  }
}

export default App;
