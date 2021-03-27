import React, { Component } from 'react';
import user from '../images/user.png'

class CancelFriendRequest extends Component {
    constructor() {
        super()
        this.state={
            remove:false,
            add:true,
        }
    }
    remove=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/cancelfriendrequest/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Authorization': 'Token '+store.token,
            },
        })
        .then((response)=>{
            response.json()
            this.setState({remove:true})
        })
    }
    add=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/addfriend/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Authorization': 'Token '+store.token,
            },
        })
        .then((response)=>{
            response.json()
            this.setState({add:!this.state.add})
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
            {this.state.remove?(
                null
            ):(
                <div style={{display:'flex', backgroundColor:'rgb(80,80,80)', borderRadius:'10px'}} className='margin hover-dark-grey'>
                    <div className='padding pointer' onClick={this.userDetails.bind(this,this.props.id)}>
                        <img style={{width:'80px', height:'80px', borderRadius:'50%'}} 
                        src={user} alt='' 
                        />
                    </div>
                    <div style={{paddingLeft:'12px', marginTop:'-6px'}}>
                        <h3 onClick={this.userDetails.bind(this,this.props.id)} style={{color:'white', cursor:'pointer'}}>{this.props.name}</h3>
                        {this.state.add?(
                            <button onClick={this.remove} className='button grey' style={{border:'none', borderRadius:'5px'}}>Cancel friend request</button>
                        ):(
                            <div>
                                <button onClick={this.add} className='button blue' style={{border:'none', borderRadius:'5px'}}>Add Friend</button>
                                <button onClick={this.remove} className='button grey' style={{border:'none', borderRadius:'5px', marginLeft:'8px'}}>Remove</button>
                            </div>
                        )}
                        
                    </div>
                </div>
            )}
            
            </div>
        );
    }
}

export default CancelFriendRequest;