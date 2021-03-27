import React, { Component } from 'react';
import InviteContainer from './InviteContainer';

class InviteToGroup extends Component {
    constructor(){
        super()
        this.state={
            friends:[]
        }
    }
    clicked=()=>{
        this.props.invite()
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/myallfriends/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            this.setState({friends: result})
        }))
    }
    render() {
        if(this.state.friends.length){
            var list = this.state.friends
            const s = list.map((l,i)=>{
                return(
                    <InviteContainer key={i} name={l['first_name']+' '+l['last_name']} id={l['id']} groupId={this.props.groupId}/>
                )
            })
            return (
                <div style={{width:'400px', backgroundColor:'white', zIndex:'10', borderRadius:'10px', border:'solid 1px blue', marginTop:'100px', overflowY:'scroll', maxHeight:'600px'}} className='display-topmiddle hide-scrollbar'>
                <h4 style={{textAlign:'right', marginRight:'4px'}} ><span onClick={this.clicked} className='hover-red padding-small pointer border border-red'>X</span></h4>
                <div style={{}}>
                {s}
                </div>
                </div>
            );
        }else{
            return(
                <div style={{width:'400px', backgroundColor:'white', zIndex:'10', borderRadius:'10px', border:'solid 1px blue', marginTop:'100px', overflowY:'scroll', maxHeight:'600px'}} className='display-topmiddle hide-scrollbar'>
                <h4 style={{textAlign:'right', marginRight:'4px'}} ><span onClick={this.clicked} className='hover-red padding-small pointer border border-red'>X</span></h4>
                <div style={{}}>
                <h5 style={{}}>No Friends to Invite</h5>
                </div>
                </div>
            )
        }
    }
}

export default InviteToGroup;