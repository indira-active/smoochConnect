import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'
import Message from './Message.js';
import ReactDOM from 'react-dom';

const socket = io('https://morning-cliffs-18397.herokuapp.com/');


class Chat extends Component {
  state = {
            chats: [],
            text:""
        }

  componentDidMount() {
          this.scrollToBot();
          socket.on('testEvent', message =>
        {
          const msg = JSON.parse(message)
          console.log(msg)
          if(msg.trigger==='message:appUser'){
              this.setState({
                chats:this.state.chats.concat({
                username:msg.messages[0].name,
                content:msg.messages[0].text
              })
            })
          }
        }
      );
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        socket.emit("message",this.state.text)
        this.setState({
            chats: this.state.chats.concat([{
                username: "admin",
                content: this.state.text
            }])
        });
        this.setState({
            text:""
        })
    }
    typeHandler = (event)=>{
        this.setState({
            text:event.target.value
        })
    }

    render() {
        const username = "admin";
        const { chats } = this.state;

        return (
            <div className="chatroom">
                <h3>Indira</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat) => 
                            <Message chat={chat} user={username} />
                        )
                    }
                </ul>
                <form className="input" onSubmit={(e) => this.submitMessage(e)}>
                    <input type="text" ref="msg" value={this.state.text} onChange={this.typeHandler} />
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default Chat;
