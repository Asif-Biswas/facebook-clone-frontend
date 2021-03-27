import React, { Component } from 'react';
import CommentContainer from './CommentContainer';
import user from '../images/user.png'

class PostComment extends Component {
    constructor(props){
        super(props)
        this.state={
            name:'',
            body:'',
            comments: []
        }
    }

    postComment=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/postcomment/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
            body:JSON.stringify({
                'body':this.state.body,
                'post': this.props.post
            })
        })
        .then((response)=>{
            response.json()
            document.getElementById(this.props.post).value=''
            this.setState({body:''})
            this.componentDidMount()
        })
    }

    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/allcomments/'+this.props.post+'/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({comments: result})
        }))
    }
    
    render() {
        if(this.state.comments.length){
            var list = this.state.comments
            const s = list.map((l,i)=>{
                return(
                    <CommentContainer userId={l['user']['id']}
                    key={i} name={l['user']['first_name']+' '+l['user']['last_name']}
                    body={l['body']} id={l['id']} 
                    userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                    />
                )
            })
            return (
                <div className=''>
                    <div className="row">
                        <div className="col left container" style={{width:'50px'}}>
                            <p><img style={{height:'30px', width:'30px', borderRadius:'50%'}}
                            src={user} alt={this.props.alt}/></p>
                        </div>

                        <div className="col right container" style={{width:'80px'}}>
                        <p onClick={this.postComment} className='padding-small blue hover-white' style={{cursor:'pointer'}}>Post</p>
                        </div>
                            
                        <div className="rest container">
                            <p>
                            <input id={this.props.post} onChange={(e)=>{this.setState({body:e.target.value})}}
                            style={{width:'100%', height:'30px', borderRadius:'25px'}}
                            placeholder='Write a comment...' />
                            </p>
                            
                        </div>
                    </div>
                    <br/>
                    <div>
                        {s}
                    </div>
                </div>
            );
        }else{
            return(
            <div>
                <div className="row" style={{}}>
                    <div className="col left container" style={{width:'50px'}}>
                        <p><img style={{height:'30px', width:'30px', borderRadius:'50%'}}
                        src={this.props.image} alt={this.props.alt}/></p>
                    </div>

                    <div className="col right container" style={{width:'80px'}}>
                    <p onClick={this.postComment} className='padding-small blue hover-white' style={{cursor:'pointer'}}>Post</p>
                    </div>
                        
                    <div className="rest container">
                        <p>
                        <input id={this.props.post} onChange={(e)=>{this.setState({body:e.target.value})}}
                        style={{width:'100%', height:'30px', borderRadius:'25px'}}
                        placeholder='Write a comment...' />
                        </p>
                        
                    </div>
                </div>
                <br/>
                <p style={{textAlign:'center'}}>...</p>
            </div>
        )}
    }
}

export default PostComment;