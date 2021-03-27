import React, { Component } from 'react';
import user from '../images/user.png'

class MyFriendNameContainer extends Component {
    clicked=()=>{
        this.props.conversation(this.props.id)
    }
    userDetails=()=>{
        try{
            this.props.userDetails(this.props.id)
        }
        catch{
            this.props.muserDetails(this.props.id)
        }
    }
    render() {
        return (
            
            <div style={{display:'flex', backgroundColor:'rgb(90,90,90)', borderRadius:'10px'}} className='margin hover-dark-grey'>
                <div onClick={this.userDetails} className='padding pointer'>
                    <img style={{width:'80px', height:'80px', borderRadius:'50%'}} 
                    src={user} alt='' 
                    />
                </div>
                <div style={{paddingLeft:'12px', marginTop:'-6px'}}>
                    <h3 onClick={this.userDetails} style={{color:'white', cursor:'pointer'}}>{this.props.name}</h3>
                    
                    <button onClick={this.clicked} className='button green' style={{border:'none', borderRadius:'5px'}}>Message</button>
                </div>
            
            
            </div>
        );
    }
}

export default MyFriendNameContainer;