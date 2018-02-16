import React,{Component} from "react";
import Chat from "./Chat.js"
import Hoc from "./hoc.js"
import {Button,ButtonToolbar} from "react-bootstrap"
import './App.css';
import io from 'socket.io-client'

const socket = io('https://damp-plateau-11898.herokuapp.com/');


class App extends Component {
    state ={
        users:[{
        	userId:"andrewjameswilliams1995@gmail.com",
        	_id:"68c03f415fce99c4be3f7156",
        	messages:[{content:"hello there",username:"admin"}]
        }],
        currentUser:0
    }
    componentDidMount(){
    	this.socketCall()
    }
    socketCall = () => {
        socket.on('testEvent', message => {
            const msg = JSON.parse(message)
            console.log(msg)
            if (msg.trigger === 'message:appUser') {
                this.addToMessages({
                        content: msg.messages[0].text,
                        username: msg.appUser.userId,
                        _id: msg.appUser._id
                    })
            }
        });
    }
    addToMessages = (message)=>{
        let change = false;
        this.setState((state) => {



            const result = {
                users: state.users.map((user, index, arr) => {
                    if (user._id === message._id) {
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

                return {users:result.users.concat({
                    userId: message.username,
                    _id: message._id,
                    messages: [{
                        content: message.content,
                        username: message.username
                    }]
                })}
            } else if(message.username === "admin"){
                socket.emit("message", {
                    msg: message.content,
                    id: message._id
                })
                return result
            }else{
            	return result
            }

        })
    }
    render(){
    	console.log(this.state)
    	const USER = this.state.users[this.state.currentUser];
        return(
        	<Hoc>
        	  <div style={{height:"10vh"}}>{this.state.users.map((user,index)=>{return(<Button onClick={()=>{this.setState({currentUser:index})}} key={index} bsStyle="success" bsSize="large">{user.userId}</Button>)})}</div>
            <div className="App">
                <Chat newMessage={this.addToMessages} currentUser={USER} messages={USER.messages}  />
            </div>
           </Hoc>
            )
    }
}

    
export default App