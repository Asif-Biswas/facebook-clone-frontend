import React, { Component } from 'react';
import { GoComment } from 'react-icons/go'
import {BiLike} from 'react-icons/bi';
import PostGroupsComment from './PostGroupsComment';
import user from '../images/user.png'

class GroupsStatus extends Component {
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
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/likegroupspost/'+id+'/'
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
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/unlikegroupspost/'+id+'/'
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
            console.log(1234)
        }
        
    }
    render() {
        return (
            <div className='container'>
            <div className='card-2 container' style={{borderRadius:'10px', margin:'8px 0 8px 0'}}>
                <div className='' style={{display:'flex', margin:'8px'}}>
                <img onClick={this.userDetails.bind(this,this.props.userId)} style={{borderRadius:'50%', float:'left', margin:'8px', cursor:'pointer'}} width='50px' height='50px' src={user} alt=''/>
                <div className='' style={{}}>
                    <h4 onClick={this.userDetails.bind(this,this.props.userId)} style={{paddingLeft:'8px', color:'white', cursor:'pointer'}}>{this.props.name}</h4>
                    <p style={{paddingLeft:'8px', marginTop:'-8px', color:'white'}}></p>
                </div>
                </div>
                <div className='container'>
                    <p style={{color:'white', fontSize:'16px'}}>{this.props.body}</p>
                    <img width='100%' src='' alt=''/>
                </div>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{}}>
                        <span style={{fontSize:'10px', cursor:'pointer', color:'white'}}>{this.state.like} Likes .</span>
                        <span onClick={this.comment} style={{fontSize:'10px', paddingTop:'2px', cursor:'pointer', marginLeft:'8px', color:'white'}}> {this.props.comments} Comments</span>
                    </div>
                    
                </div>
                <hr style={{margin:'1px'}}/>
                <div style={{display:'flex', justifyContent:'space-around'}}>
                    <button className='border-0 text-white hover-dark-grey' style={{width:'33.3%', margin:'8px', backgroundColor:'rgb(70,70,70)', borderRadius:'5px', cursor:'pointer'}}>
                    {this.state.isLiked?(
                        <div onClick={this.unLlike.bind(this,this.props.id)}><BiLike style={{fontSize:'20px', color:'rgb(5, 142, 255)'}}/><span style={{color:'rgb(5, 142, 255)', fontSize:'18px'}}> Liked</span></div>
                    ):(
                        <div onClick={this.like.bind(this,this.props.id)}><BiLike style={{fontSize:'18px', color:'white'}}/><span style={{fontSize:'18px'}}> Like</span></div>
                    )}
                        
                    </button>
                    <button onClick={this.comment} className='border-0 text-white hover-dark-grey' style={{width:'33.3%', margin:'8px', backgroundColor:'rgb(70,70,70)', borderRadius:'5px', cursor:'pointer'}}>
                    <GoComment/> <span style={{fontSize:'18px'}}>Comment</span></button>
                </div>

                <div>
                    {this.state.comment?(
                        <div>
                        <hr style={{marginTop:'-4px'}}/>
                            <PostGroupsComment post={this.props.id}
                                userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                            />
                        </div>
                    ):(
                        null
                    )}
                </div>
            </div>
            </div>
        );
    }
}

export default GroupsStatus;