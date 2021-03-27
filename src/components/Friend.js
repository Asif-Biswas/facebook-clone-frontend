import React, { Component } from 'react';
import FriendRequest from './FriendRequest';
import FriendRequestAccept from './FriendRequestAccept';

class Friend extends Component {
    constructor() {
        super()
        this.state={
            requestedMe:[],
            allUser:[],
            user:false,
            pageNumber: 1,
            maxPage:1,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/alluser/?format=json&page='+this.state.pageNumber
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
            if(result.results.length){
                this.setState({user:true})
            }
            this.setState({allUser: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
        var url1 = 'https://fb-cln-backend.herokuapp.com/myapi/requestedme/?format=json'
        fetch(url1,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({requestedMe: result})
            if(result.length){
                this.setState({user:true})
            }
        }))
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/alluser/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.allUser
                st.push(result.results[i])
            }
            this.setState({status: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        var next = this.state.pageNumber!==this.state.maxPage+1
        if(bottom && next){
            this.loadMore()
        }
    }
    render() {
        if(this.state.user){
            var list = this.state.requestedMe
            const s = list.map((l,i)=>{
                return(
                    <FriendRequestAccept 
                         userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                        key={i} id={l['id']} 
                        name={l['first_name']+' '+l['last_name']}
                    />
                )
            })
            var list2 = this.state.allUser
            const s2 = list2.map((l,i)=>{
                return(
                    <FriendRequest
                        userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                        key={i} id={l['id']} 
                        name={l['first_name']+' '+l['last_name']}
                    />
                )
            })
            return(
                <div>
                <br/>
                <div onScroll={this.handleScroll} style={{height:'92vh', overflowY:'scroll'}} className='hide-scrollbar'>
                    {s}
                    <h3 className='container text-white'>People you may know</h3>
                    {s2}
                </div>
                </div>
            )
        }else{
            
            return(
                <div><br/>
                    loading...
                </div>
            )
        }
    }
    
}

export default Friend;
