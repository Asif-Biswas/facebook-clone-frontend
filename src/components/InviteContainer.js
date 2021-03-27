import React, { Component } from 'react';
import user from '../images/user.png'

class InviteContainer extends Component {
    constructor() {
        super()
        this.state={
            invite: false
        }
    }
    inviteClicked=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/invite/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
            body:JSON.stringify({
                'group':this.props.groupId
            })
        })
        .then(res=>res.json().then(result=>{
            this.setState({invite: true})
        }))
    }
    render() {
        return (
            <div className='margin border-bottom padding-small'>
                <div className='col left' style={{width:'50px'}}>
                    <img src={user} alt='' height='40px' width='40px' style={{borderRadius:'50%'}} />
                </div>
                {this.state.invite?(
                    <button className='col right button grey' style={{width:'100px', marginTop:'8px', borderRadius:'5px'}}>Invited</button>
                ):(
                    <button onClick={this.inviteClicked} className='col right button blue' style={{width:'100px', marginTop:'8px', borderRadius:'5px'}}>Invite</button>
                )}
                
                <h4 className='rest' style={{}}>{this.props.name}</h4>
            </div>
        );
    }
}

export default InviteContainer;