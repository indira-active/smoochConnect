import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client'
import Message from './Message.js';
import ReactDOM from 'react-dom';

const socket = io('https://morning-cliffs-18397.herokuapp.com/');

class Chat extends Component {
  state = {
            text:""
        }

  componentDidMount() {
          this.scrollToBot();
    }

    componentDidUpdate() {
        this.scrollToBot();
    }

    scrollToBot() {
        ReactDOM.findDOMNode(this.refs.chats).scrollTop = ReactDOM.findDOMNode(this.refs.chats).scrollHeight;
    }

    submitMessage(e) {
        e.preventDefault();
        this.props.newMessage({
            _id:this.props.currentUser._id,
            content:this.state.text,
            username:"admin"
        })
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
        const chats = this.props.messages;

        return (
            <div className="chatroom">
                <h3>Indira({this.props.currentUser.userId})</h3>
                <ul className="chats" ref="chats">
                    {
                        chats.map((chat,index) => 
                            <Message key={index} chat={chat} user={username} />
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
