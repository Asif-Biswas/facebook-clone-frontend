import React, { Component } from 'react';
import user from '../images/user.png'

class MessageNameContainer extends Component {
    
    clicked=()=>{
        this.props.conversation(this.props.userId, this.props.name)
    }
    render() {
        return (
            <div onClick={this.clicked} className='container hover-shadow pointer hover-dark-grey' style={{backgroundColor:'rgb(90,90,90)', borderRadius:'10px', marginBottom:'10px'}}>
                <div className='row padding'>
                    <div className='col' style={{width:'60px'}}>
                        <img src={user} alt='' height='50px' width='50px' style={{borderRadius:'50%', marginLeft:'-8px'}} />
                    </div>
                    <div className='rest' style={{marginTop:'-12px', marginBottom:'-8px'}}>
                        <h3 style={{color:'white'}}>{this.props.name}</h3>
                        <p style={{marginTop:'-8px', color:'lightGrey',}}>{this.props.body}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageNameContainer;