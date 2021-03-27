import React, { Component } from 'react';
import Home from './Home';

class CheckName extends Component {
    constructor(){
        super()
        this.state={
            firstname:'',
            lastname:'',
            data:'',
            name: false
        }
    }
    

    clickHandler=(e)=>{
        e.preventDefault()
        fetch('http://127.0.0.1:8000/myapi/changename/', {
            method: 'PUT',
            headers:{
                'content-type':'application/json',
                'X-CSRFToken': this.csrftoken,
                'Authorization': 'Token '+this.props.token
            },
            body:JSON.stringify({
                'first_name':this.state.firstname,
                'last_name': this.state.lastname
            })
        })
        .then((response)=>{
            response.json().then((result)=>{
                if(result.response==='ok'){
                    this.setState({name:true})
                }
            })
        })
        
    }
    
    render() {
        return (
            <div>
            {this.state.name?(
                <Home/>
            ):(
                <div className='display-middle' style={{minWidth:'400px'}}>
                    <div style={{marginTop:'-100px'}}>
                    <div className='border-blue border card-4' style={{padding:'30px 50px', borderRadius:'10px'}}>
                        <h1 style={{textAlign:'center'}} className='text-blue'>Set Your Name</h1>
                        <form className='text-blue'>
                            <p style={{fontSize:'24px'}}>First name: <input style={{borderRadius:'5px', border:'solid 1px blue', width:'100%', paddingLeft:'8px'}} onChange={(e)=>{this.setState({firstname:e.target.value})}} type='text'/></p>
                            <p style={{fontSize:'24px'}}>Last name: <input style={{borderRadius:'5px', border:'solid 1px blue', width:'100%', paddingLeft:'8px'}} onChange={(e)=>{this.setState({lastname:e.target.value})}} type='text'/></p>
                            <button style={{borderRadius:'5px', width:'100%'}} className='button blue' onClick={this.clickHandler}>Confirm</button>
                        </form>
                    </div>
                    </div>
                </div>
            )}
                
            </div>
        );
    }
}

export default CheckName;