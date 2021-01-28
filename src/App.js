import React, { Component } from 'react';
import io from 'socket.io-client';
import TextFeild from "@material-ui/core/TextField"
import { Input } from '@material-ui/core';

class App extends Component {

  state = {
    isConnected: false,
    id: null,
    peeps: [],
    name: "Bks",
    text: "",
    oldMessages:[]
  }
  socket = null
 

  componentWillMount() {


    this.socket = io('https://codi-server.herokuapp.com');

    this.socket.on('connect', () => {
      this.setState({ isConnected: true })
    })
    this.socket.on('youare', (answer) => {
      this.setState({ id: answer.id }
      )
    })
    this.socket.on('room', (old_messages) => {
      this.setState({ oldMessages: [...old_messages] })
      console.log(this.state.oldMessages)
    })


    // })
    // this.socket.on('pong!', () => {
    //   console.log('the server answered!')
    // })
    // this.socket.on('peeps', (data) => {
    //   this.setState({peeps: data});
    //   console.log(this.socket.peeps);
    // })
    // this.socket.on('new connection',(newEntry) => {
    //   this.setState({ peeps:[...this.state.peeps,newEntry] })
    // })
    // this.socket.on('new disconnection',(disEntry)=> {
    //   this.setState({peeps: this.state.peeps.filter(dis => dis!==disEntry)
    //   })
      
    // })
    // this.socket.on('next', (message_from_server) => {
    //   console.log(message_from_server)
    // })
    
    
   
    
    
  }
  
  componentWillUnmount(){
    this.socket.close()
    this.socket = null
  }
  render() {
    return (
      <div className="App">
      <div>status: {this.state.isConnected ? 'connected' : 'disconnected'}</div>
        <div>{this.state.id}{ }</div>
        {/* <button onClick={() => this.socket.emit('ping!')}>ping</button> */}
        
        <button onClick={() => this.socket.emit('whoami')}>Who am I?</button>

        <div> Name : {this.state.name}
          <br></br>
           ID :{this.state.id}</div>
        <h2>Chat Box</h2>
        <ul>
          {this.state.oldMessages.map((item, key) => (
            <li key={key}>{item.id} name: {item.name} message: {typeof item.text === "string" ? item.text : "invalid"}.</li>
          ))}
        </ul>
           <input type="text" id='answer' onChange={(e) =>this.setState({ text: e.target.value })} />
        <button onClick={() => {this.socket.emit('message', {id: this.state.id, name: this.state.name, text: this.state.text})}}>Send</button> 
          {/* <div>blank space</div>
            <ul>
            {this.state.peeps.map(item => (
            <li key={item}>{item}</li>
            ))}
        </ul>
        <button onClick={() => this.socket.emit('next')}>Next</button>
        <button onClick={() => this.socket.emit('give me next')}>give me next</button>
        <button onClick={() => this.socket.emit('addition')}>sum</button>
         */}
    </div>);
    
  }
}




export default App;
