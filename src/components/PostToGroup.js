import React, { Component } from 'react';
import user from '../images/user.png'

class Post extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            body:''
        }
    }

    createPost=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/posttogroup/'+this.props.id+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
                //'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'body':this.state.body
            })
        })
        .then((response)=>{
            response.json()
            document.getElementById("i1").value=''
            this.setState({body:''})
            this.props.rerender()
        })
    }
    
    render() {
        return (
            <div className='container'>
                <div className="card-2 row">
                    <div className="col left container" style={{width:'60px'}}>
                        <p><img style={{height:'40px', width:'40px', borderRadius:'50%'}}
                         src={user} alt={this.props.alt}/></p>
                    </div>

                    <div className="col right container" style={{width:'100px'}}>
                    <p onClick={this.createPost} className='button blue'>Post</p>
                    </div>
                        
                    <div className="rest container">
                        <p>
                        <input id="i1" onChange={(e)=>{this.setState({body:e.target.value})}}
                        style={{width:'100%', height:'36px', borderRadius:'25px', paddingLeft:'8px'}}
                        placeholder={"What's on your mind?"} />
                        </p>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;