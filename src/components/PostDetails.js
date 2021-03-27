import React, { Component } from 'react';
//import Cnav from './Cnav';
import GroupsStatus2 from './GroupsStatus2';
//import Parent from './Parent';
import Status from './Status';

class PostDetails extends Component {
    constructor() {
        super()
        this.state={
            details:[]
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        if(this.props.groupsPost){
            var url = 'https://fb-cln-backend.herokuapp.com/myapi/groupspostdetails/'+this.props.postId+'/?format=json'
        }else{
            url = 'https://fb-cln-backend.herokuapp.com/myapi/postdetails/'+this.props.postId+'/?format=json'
        }
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({details: result})
        }))
    }
    render() {
        if(Object.keys(this.state.details).length){
            var l = this.state.details
            if(this.props.groupsPost){
                return (
                    <div className='margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
                        <GroupsStatus2 userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                            name={l['user']['first_name']+' '+l['user']['last_name']}
                            body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                            id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} groupName={l['group']['name']}
                            groupId={l['group']['id']} groupHome={this.props.groupHome} />
                    
                    </div>
                );
            }else{
                return (
                    <div className='margin-top hide-scrollbar' style={{overflowY:'scroll', height:'92vh'}}>
                        <Status userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                            name={l['user']['first_name']+' '+l['user']['last_name']}
                            body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                            id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} />
                        
                    </div>
                );
            }
            
        }else{
            return(
                <div id="scroll" className='container' style={{overflowY:'scroll', height:'92vh'}}>
                
                    <h5>loading...</h5>
                    
                </div>
            )
        }
    }
}

export default PostDetails;