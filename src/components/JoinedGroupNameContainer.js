import React, { Component } from 'react';
import group from '../images/group.jpg'

class JoinedGroupNameContainer extends Component {
    groupHome=(groupId)=>{
        this.props.groupHome(groupId)
    }
    render() {
        return (
            <div onClick={this.groupHome.bind(this, this.props.id)} className='hover-dark-grey pointer' style={{marginBottom:'8px',display:'flex', backgroundColor:'gray', padding:'8px', borderRadius:'5px'}}>
                <img src={group} alt=''
                    style={{height:'50px', width:'50px', borderRadius:'50%'}}
                />
                <h3 style={{color:'white', marginLeft:'12px'}}>{this.props.name}</h3>
                
            </div>
        );
    }
}

export default JoinedGroupNameContainer;