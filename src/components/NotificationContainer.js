import React, { Component } from 'react';
import user from '../images/user.png'

class NotificationContainer extends Component {
    clicked=()=>{
        if(this.props.invite){
            this.props.groupHome(this.props.group.id)
        }else if(this.props.group !== null){
            this.props.postDetails(this.props.group.id, 1)
        }else{
            this.props.postDetails(this.props.post, 0)
        }
        
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
        if(this.props.group !== null){
            var g = 'in '+ this.props.group.name
        }
        return (
            <div onClick={this.clicked} className='hover-dark-grey hover-shadow pointer' style={{backgroundColor:'rgb(90,90,90)', borderRadius:'10px', marginBottom:'8px'}}>
            <div className='row padding'>
                <div className='col' style={{width:'60px'}}>
                    <img src={user} alt='' height='50px' width='50px' style={{borderRadius:'50%'}} />
                </div>
                <div className='rest'>
                    <h4 style={{color:'white'}}>
                        <b>{this.props.userName} </b>
                        {this.props.liked?(
                            <span>liked your post <b>{g}</b>.</span>
                        ):(null)}
                        {this.props.commented?(
                            <span>commented on your post <b>{g}</b>. </span>
                        ):(null)}
                         {this.props.invite?(
                             <span>invited you to join the group: <b>'{this.props.group.name}'</b></span>
                         ):(null)}
                    </h4>
                </div>
            </div>
            </div>
        );
    }
}

export default NotificationContainer;