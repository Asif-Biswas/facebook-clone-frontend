import React, { Component } from 'react';
//import { GoComment } from 'react-icons/go'
//import {BiLike} from 'react-icons/bi';
//import PostComment from './PostComment';
import user from '../images/user.png'

class GroupsCreatedStatus extends Component {
    constructor(props) {
        super(props)
        this.state={
            isLiked: this.props.isLiked,
            comment: false,
            like: this.props.likes,
        }
    }
    like=(id)=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/likepost/'+id+'/'
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(response=>{
            response.json()
            .then(result=>{
                this.setState({isLiked:!this.state.isLiked, like:this.state.like+1})
            })
        })
    }
    unLlike=(id)=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/unlikepost/'+id+'/'
        fetch(url,{
            method:'POST',
            headers:{
                'content-type':'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(response=>{
            response.json()
            .then(result=>{
                this.setState({isLiked:!this.state.isLiked, like:this.state.like-1})
            })
        })
    }
    comment=()=>{
        this.setState({comment:!this.state.comment})
    }
    userDetails=(id)=>{
        try{
            this.props.userDetails(id)
        }
        catch{
            this.props.muserDetails(id)
        }
        
    }
    render() {
        //console.log(this.props.admin)
        return (
            <div className='container'>
            <div className='card-2 container' style={{borderRadius:'10px', margin:'8px 0 8px 0'}}>
                <div className='' style={{display:'flex', margin:'8px'}}>
                <img onClick={this.userDetails.bind(this,this.props.userId)} style={{borderRadius:'50%', float:'left', margin:'8px', cursor:'pointer'}} width='50px' height='50px' src={user} alt=''/>
                <div className='' style={{display:'flex'}}>
                    <h3 onClick={this.userDetails.bind(this,this.props.userId)} style={{paddingLeft:'8px', color:'white', cursor:'pointer'}}>{this.props.admin}</h3>
                    <p style={{paddingLeft:'12px', color:'white', fontSize:'16px'}}>created the group</p>
                    <h3 style={{color:'white', paddingLeft:'12px'}}>{this.props.groupName}</h3>
                </div>
                </div>
                <div className='container'>
                    <p style={{color:'white', fontSize:'16px'}}>{this.props.body}</p>
                    <img width='100%' src='' alt=''/>
                </div>
                
                <hr style={{margin:'1px'}}/>
                

                
            </div>
            </div>
        );
    }
}

export default GroupsCreatedStatus;

