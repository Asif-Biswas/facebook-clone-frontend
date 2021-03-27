import React, { Component } from 'react';
import Conversation from './Conversation';
import MessageNameContainer from './MessageNameContainer';

class Message extends Component {
    constructor() {
        super()
        this.state={
            message:[],
            conversation: false,
            id: null,
            pageNumber: 1,
            maxPage:1,
            name:''
        }
    }
    componentDidMount(){
        this.checkId()
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/messagehome/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.count%10!==0){
                var maxPage = parseInt(result.count/10)+1
            }else{
                maxPage = result.count/10
            }
            this.setState({message: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
    }
    conversation=(id, name)=>{
        this.setState({conversation:true, id:id, name:name})
    }
    checkId=()=>{
        if(this.props.messageId !== null){
            this.conversation(this.props.messageId)
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.messageId !== this.props.messageId) {
            this.checkId();
        }
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/messagehome/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.message
                st.push(result.results[i])
            }
            this.setState({status: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.pageNumber!==this.state.maxPage+1
        if(bottom && next){
            this.loadMore()
        }
    }
    render() {
        if(this.state.message.length){
            var list = this.state.message
            const s = list.map((l,i)=>{
                return(
                    <MessageNameContainer key={i} conversation={this.conversation}
                        name={l['user']['name']} userId={l['user']['id']}
                        body={l['body']} seen={l['seen']}
                    />
                )
            })
            return (
                <div>
                {this.state.conversation?(
                    <Conversation name={this.state.name} id={this.state.id}/>
                ):(
                    <div onScroll={this.handleScroll} className='container margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
                    <h2 className='text-white'>Messages</h2>
                    {s}
                    </div>
                )}
                    
                </div>
            );
        }else{
            return(
                <div className='container margin-top hide-scrollbar text-white' style={{overflowY:'scroll', height:'92vh'}}>
                    <h2 className=''>Messages</h2>
                    <h4>Add Friend to start a Conversation...</h4>
                </div>
            )
        }
    }
}

export default Message;