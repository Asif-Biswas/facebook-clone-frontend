import React, { Component } from 'react';
import user from '../images/user.png'

class CommentContainer extends Component {
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
                <div style={{backgroundColor:'rgb(80,80,80)', borderRadius:'10px'}} className='row margin-bottom padding-small'>
                        <div className='col' style={{width:'40px'}}>
                            <img onClick={this.userDetails.bind(this,this.props.userId)} src={user} alt='' style={{borderRadius:'50%', width:'30px', height:'30px', cursor:'pointer'}} />
                        </div>
                        <div className='rest'>
                            <h6 onClick={this.userDetails.bind(this,this.props.userId)} style={{color:'white', marginTop:'-1px', cursor:'pointer'}}>{this.props.name}</h6>
                            <p style={{color:'white', marginTop:'-1px', paddingLeft:'4px'}}>{this.props.body}</p>
                        </div>
                    </div>
            </div>
        );
    }
}

export default CommentContainer;