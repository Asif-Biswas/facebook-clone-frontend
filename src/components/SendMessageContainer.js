import React, { Component } from 'react';

class SendMessageContainer extends Component {
    constructor() {
        super()
        this.state={
            input:'',
        }
    }
    send=()=>{
        //ask me why i did this
        var inp = this.state.input
        var inp2 = inp.slice(inp.length-1,inp.length)
        if(inp2==='.'){
            var input = '.'+inp.slice(0,inp.length-1)
        }else{
            input = inp
        }
        var url = 'http://127.0.0.1:8000/myapi/sendmessage/'
        var store = JSON.parse(localStorage.getItem('login'))
        fetch(url,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+store.token
            },
            body:JSON.stringify({
                'body':input,
                'receiver':this.props.id
            })
        })
        .then((response)=>{
            response.json()
            document.getElementById("messageInput").value=''
            this.setState({input:''})
            this.props.rerender()
        })
    }
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col' style={{width:'80px', float:'right', marginLeft:'8px'}}>
                        <button onClick={this.send} className='button blue'>Send</button>
                    </div>
                    <div className='rest'>
                        <input id="messageInput" 
                            onChange={(e)=>{this.setState({input:e.target.value})}} type='text' 
                            style={{width:'100%', height:'40px', borderRadius:'25px', paddingLeft:'8px'}} 
                            placeholder='Write a message...' 
                            value={this.state.input}
                        />
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default SendMessageContainer;