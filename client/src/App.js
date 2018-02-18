import React, { Component } from "react";
import Chat from "./Chat.js"
import Hoc from "./hoc.js"
import { Button} from "react-bootstrap"
import './App.css';
import io from 'socket.io-client'

const socket = io('https://damp-plateau-11898.herokuapp.com/');


class App extends Component {
    state = {
        users: [{
            userId: "andrewjameswilliams1995@gmail.com",
            _id: "68c03f415fce99c4be3f7156",
            messages: [{ content: "hello there", username: "admin" }],
            unread:0
        }],
        currentUser: 0
    }
    componentDidMount() {
        this.socketCall()
        this.loadUsers()
    }
    loadUsers = () => {
        fetch('https://damp-plateau-11898.herokuapp.com/api/loadusers')
        .then(res => res.json())
        .then(load=>{
            const users = load.map(val=>{
                return{
                    userId:val.smoochUserId,
                    _id:val.smoochId,
                    messages:[],
                    unread:0
                }
            })
            this.setState({users})
        }).catch(err=>{console.log('err is happening',err)})
    }
    socketCall = () => {
        socket.on('testEvent', message => {
            const msg = JSON.parse(message)
            console.log(msg)
            if (msg.trigger === 'message:appUser') {
                this.addToMessages({
                    content: msg.messages[0].text,
                    username: msg.appUser.userId || `anonymous : ${msg.appUser._id}`,
                    _id: msg.appUser._id
                })
            }
        });
    }
    wipeUnread = (userIndex)=>{
        this.setState({
            users:this.state.users.map((user,index)=>{
                if(userIndex === index){
                    return {
                        ...user,
                        unread:0
                    }
                }
                return user
            })
        })
    }
    addToMessages = (message) => {
        let change = false;
        this.setState((state) => {

            const result = {
                users: state.users.map((user, index, arr) => {
                    if (user._id === message._id && user.userId !== message.username && message.username !== "admin") {
                        change = true;
                        return {
                            ...user,
                            userId: message.username,
                            unread:user.unread+1,
                            messages: user.messages.concat({
                                content: message.content,
                                username: message.username
                            })
                        }
                    } else if (user._id === message._id && message.username !== "admin") {
                        change = true;
                        return {
                            ...user,
                            unread:user.unread+1,
                            messages: user.messages.concat({
                                content: message.content,
                                username: message.username
                            })
                        }
                    }else if(user._id === message._id){
                        change = true;
                        return {
                            ...user,
                            messages: user.messages.concat({
                                content: message.content,
                                username: message.username
                            })
                        }
                    } else {
                        return user
                    }
                })
            }
            if (!change) {

                return {
                    users: result.users.concat({
                        userId: message.username,
                        _id: message._id,
                        unread:1,
                        messages: [{
                            content: message.content,
                            username: message.username
                        }]
                    })
                }
            } else if (message.username === "admin") {
                socket.emit("message", {
                    msg: message.content,
                    id: message._id
                })
                return result
            } else {
                return result
            }

        })
    }
    render() {
        console.log(this.state)
        const USER = this.state.users[this.state.currentUser];
        return (
            <Hoc>
                <div style={{ height: "10vh", overflow: "scroll" }}>{this.state.users.map(
                    (user, index) => {
                        return (
                            <div key={index} style={{ display: 'inline-block', margin: "3px",position:'relative'}}>
                                <Button
                                    onClick={() => { this.setState({ currentUser: index }) }}
                                    bsStyle="success"
                                    bsSize="small">{user.userId}</Button>
                                <Button
                                    onClick={() => { this.setState({ currentUser: index }) }}
                                    bsStyle="danger"
                                    bsSize="small">
                                    close</Button>
                                <span style={{position:"absolute",top:"-5px",left:"0px",backgroundColor:"black",color:"white",fontSize:"12px"}}>
                                {user.unread || null}
                                </span>
                            </div>
                        )
                    })}
                </div>
                <div className="App">
                    <Chat wipeUnread={this.wipeUnread} newMessage={this.addToMessages} currentIndex={this.state.currentUser} currentUser={USER} messages={USER.messages} />
                </div>
            </Hoc>
        )
    }
}


export default App