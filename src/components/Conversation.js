import React, { Component } from 'react';
//import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ReceivedMessageContainer from './ReceivedMessageContainer';
import SendMessageContainer from './SendMessageContainer';
import SentMessageContainer from './SentMessageContainer';

class Conversation extends Component {
    constructor(){
        super()
        this.state={
            conversation:[],
            pageNumber: 1,
            maxPage:1,
            loading: true,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getmessage/'+this.props.id+'/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.count%15!==0){
                var maxPage = parseInt(result.count/15)+1
            }else{
                maxPage = result.count/15
            }
            this.setState({conversation: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
    }
    rerender=()=>{
        this.setState({pageNumber:1})
        this.componentDidMount()
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getmessage/'+this.props.id+'/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.conversation
                st.push(result.results[i])
            }
            this.setState({conversation: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.pageNumber!==this.state.maxPage+1
        if(bottom && next){
            this.loadMore()
        }else{
            this.setState({loading:false})
        }
    }
    render() {
        if(this.state.conversation.length){
            var list = this.state.conversation
            const s = list.map((l,i)=>{
                if(l.user.name===l.sender.first_name+' '+l.sender.last_name){
                    return(
                        <ReceivedMessageContainer key={i}
                            body={l.body}
                        />
                    )
                }
                return(
                    <SentMessageContainer key={i}
                        body={l.body}
                    />
                )
            })
            return (
                <div onScroll={this.handleScroll} className='container margin-top hide-scrollbar' style={{overflowY:'scroll', height:'90vh', position:'relative', transform:'rotate(180deg)'}}>
                    <div style={{transform:'rotate(180deg)', marginTop:'8px'}}>
                        <span><SendMessageContainer
                            id={this.props.id} rerender={this.rerender}
                        /></span>
                    </div>
                    <br/>
                    {s}
                </div>
            );
        }else{
            return(
                <div className='container margin-top hide-scrollbar' style={{overflowY:'scroll', height:'90vh', position:'relative', transform:'rotate(180deg)'}}>
                    <div style={{transform:'rotate(180deg)', marginTop:'8px'}}>
                        <span><SendMessageContainer
                            id={this.props.id} rerender={this.rerender}
                        /></span>
                    </div>
                    <br/>
                    <p style={{transform:'rotate(180deg)',}}>Say "Hello" to start Conversation.</p>
                </div>
            )
        }
    }
}

export default Conversation;