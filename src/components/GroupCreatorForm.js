import React, { Component } from 'react';

class GroupCreatorForm extends Component {
    constructor(){
        super()
        this.state={
            groupName:'',
            form:false,
        }
    }
    form=()=>{
        this.setState({form:!this.state.form})
    }
    groupHome=(id)=>{
        this.props.groupHome(id)
    }
    joinGroup=(id)=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/joingroup/'+id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            this.groupHome(id)
        }))
    }
    createGroup=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/creategroup/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
            body:JSON.stringify({
                'name':this.state.groupName,
            })
        })
        .then((response)=>{
            response.json().then(result=>{
                this.joinGroup(result.id)
            })
            document.getElementById('i').value=''
            this.setState({groupName:''})
            //this.componentDidMount()
        })
    }
    render() {
        return (
            <div className='container'>
                <div>
                    <button onClick={this.form} style={{width:'100%', border:'none', borderRadius:'10px', fontSize:'24px'}} className='hover-grey pointer'>Create Group</button>
                </div>
                {this.state.form?(
                    <div>
                    <br/>
                    <div className='card-2 padding-16' style={{textAlign:'center'}}>
                        <input id='i' onChange={(e)=>{this.setState({groupName:e.target.value})}} style={{width:'50%',height:'40px', border:'none', borderRadius:'25px', paddingLeft:'9px'}} type='text' placeholder='Enter Group name'/>
                        <button onClick={this.createGroup} className='button blue' style={{marginLeft:'8px', border:'none', borderRadius:'10px'}}>Create Group</button>
                    </div>
                    </div>
                ):null}
                <br/>
            </div>
        );
    }
}

export default GroupCreatorForm;