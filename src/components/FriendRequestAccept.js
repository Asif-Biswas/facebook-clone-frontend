import React, { Component } from 'react';
import user from '../images/user.png'

class FriendRequest extends Component {
    constructor() {
        super()
        this.state={
            accept:false,
            delete:false,
        }
    }
    accept=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/acceptfriendrequest/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Authorization': 'Token '+store.token,
            },
        })
        .then((response)=>{
            response.json()
            this.setState({accept:true})
        })
    }
    delete=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/deletefriendrequest/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Authorization': 'Token '+store.token,
            },
        })
        .then((response)=>{
            response.json()
            this.setState({delete:true})
        })
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
        return (
            <div>
            {this.state.delete?(
                null
            ):(
                <div style={{display:'flex', backgroundColor:'rgb(90,90,90)', borderRadius:'10px'}} className='margin hover-dark-grey'>
                    <div className='padding pointer' onClick={this.userDetails.bind(this,this.props.id)}>
                        <img style={{width:'80px', height:'80px', borderRadius:'50%'}} 
                        src={user} alt='' 
                        />
                    </div>
                    <div style={{paddingLeft:'12px', marginTop:'-6px'}}>
                        <h3 onClick={this.userDetails.bind(this,this.props.id)} style={{color:'white', cursor:'pointer'}}>{this.props.name}</h3>
                        {this.state.accept?(
                            <button onClick={this.add} className='button grey' style={{border:'none', borderRadius:'5px'}}>Friend request accepted</button>
                        ):(
                            <div>
                                <button onClick={this.accept} className='button blue' style={{border:'none', borderRadius:'5px'}}>Accept</button>
                                <button onClick={this.delete} className='button grey' style={{border:'none', borderRadius:'5px', marginLeft:'8px'}}>Delete</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}
            
            </div>
        );
    }
}

export default FriendRequest;