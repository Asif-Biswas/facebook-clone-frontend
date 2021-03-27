import React, { Component } from 'react';
import JoinedGroupNameContainer from './JoinedGroupNameContainer';

class AllJoinedGroupName extends Component {
    constructor(){
        super()
        this.state={
            group:[]
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getalljoinedgroup/?format=json'
        fetch(url,{
            method:'GeT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            this.setState({group: result})
        }))
    }
    render() {
        if(this.state.group.length){
            var list = this.state.group
            const s = list.map((l,i)=>{
                return(
                    <JoinedGroupNameContainer groupHome={this.props.groupHome} key={i} 
                        name={l['name']} id={l['id']}
                    />
                )
            })
            return(
                <div className='container'>
                <h4>Your Groups</h4>
                    {this.state.form?(
                        <div>
                        
                        <div className='card-2 padding' style={{textAlign:'center'}}>
                            <input id='i' onChange={(e)=>{this.setState({groupName:e.target.value})}} style={{width:'50%',height:'40px', border:'none', borderRadius:'25px', paddingLeft:'9px'}} type='text' placeholder='Enter Group name'/>
                            <button onClick={this.createGroup} className='button blue' style={{marginLeft:'8px', border:'none', borderRadius:'10px'}}>Create Group</button>
                        </div>
                        </div>
                    ):null}
                    {s}
                    
                </div>
            )
        }else{
            return(
                <div className='container'>
                <br/>
                    <h4>Loading...</h4>
                </div>
            )
        }
        
    }
}

export default AllJoinedGroupName;