import React, { Component } from 'react';
import user from '../images/user.png'
class SentMessageContainer extends Component {
    render() {
        return (
            <div style={{transform:'rotate(180deg)', marginLeft:'8px', marginRight:'8px', direction:'rtl', width:'80%', float:'left'}}>
                <div className='row'>
                    <div className='col' style={{width:'50px', float:'right'}}>
                        <img
                            src={user} alt='' height='40px' width='40px'
                            style={{borderRadius:'50%',}}
                        />
                    </div>
                    <div className='rest'>
                        <p style={{fontSize:'20px', overflow:'visible', marginTop:'2px', padding:'2px 8px', backgroundColor:'rgb(100,100,100)', borderRadius:'10px'}}>
                            <span style={{padding:'0 8px', color:'white'}}>{this.props.body}</span>
                        </p>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default SentMessageContainer;