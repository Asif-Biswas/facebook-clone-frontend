import React, { Component } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import NotificationContainer from './NotificationContainer';

class Notification extends Component {
    constructor() {
        super()
        this.state={
            notification:[],
            pageNumber: 1,
            maxPage:1,
            loading:false
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/notification/?format=json&page='+this.state.pageNumber
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
            this.setState({notification: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
            if(maxPage>1){
                this.setState({loading:true})
            }
        }))
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/notification/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.notification
                st.push(result.results[i])
            }
            this.setState({notification: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.pageNumber!==this.state.maxPage+1
        if(bottom && next){
            this.loadMore()
        }else{this.setState({loading:false})}
    }
    render() {
        if(this.state.notification.length){
            var list = this.state.notification
            const s = list.map((l,i)=>{
                return(
                    <NotificationContainer key={i} postDetails={this.props.postDetails} groupHome={this.props.groupHome}
                        userName={l['user2']['first_name']+' '+l['user2']['last_name']}
                        liked={l['liked']} commented={l['commented']} post={l['post']}
                        group={l['group']} groupsPost={l['groups_post']} invite={l['invite']}
                    />
                )
            })
            return (
                <div onScroll={this.handleScroll} className='container margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
                    <h2 style={{color:'white'}}>Notifications</h2>
                    {s}
                    {this.state.loading?(
                        <span style={{display:'flex', justifyContent:'center'}}><AiOutlineLoading3Quarters className='spin' style={{fontSize:'36px'}}/></span>
                    ):null}
                    
                </div>
            );
        }else{
            return(
                <div className='container margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
                    <h2 style={{color:'white'}}>Notifications</h2>
                    <h5 className='text-white'>No Notifications Available</h5>
                </div>
            )
            
        }
    }
}

export default Notification;