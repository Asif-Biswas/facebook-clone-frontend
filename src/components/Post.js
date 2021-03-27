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
    getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
      }
    csrftoken = this.getCookie('csrftoken');

    createPost=()=>{
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/createpost/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+this.props.token,
                //'X-CSRFToken': this.csrftoken
            },
            body:JSON.stringify({
                'body':this.state.body
            })
        })
        .then((response)=>{
            response.json()
            document.getElementById("i2").value=''
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
                        <input id="i2" onChange={(e)=>{this.setState({body:e.target.value})}}
                        style={{width:'100%', height:'36px', borderRadius:'25px', paddingLeft:'8px'}}
                        placeholder={"What's on your mind, "+this.props.userdata.firstname+"?"} value={this.state.body}/>
                        </p>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Post;