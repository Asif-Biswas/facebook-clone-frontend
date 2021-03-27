import React, { Component } from 'react';
import Post from './Post';
import Status from './Status';
import user from '../images/user.png'

class UserDetails extends Component {
    constructor(props){
        super(props)
        this.state={
            data:[],
            status:[],
            me:false,
            message:false,
            addFriend:false,
            acceptRequest:false,
            cancelRequest:false,
            userId:this.props.userId,

            pageNumber: 1,
            nextPage:true,
        }
    }
    componentDidMount(){
        this.setState({counter:this.state.counter+1})
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/userdetails/'+this.state.userId+'/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({data: result})
        }))
        var url2 = 'http://127.0.0.1:8000/myapi/checkrelation/'+this.props.userId+'/?format=json'
        fetch(url2,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.response === 'me'){this.setState({me:true})}
            if(result.response === 'add_friend'){this.setState({addFriend:true})}
            if(result.response === 'friend'){this.setState({message:true})}
            if(result.response === 'i_requested'){this.setState({cancelRequest:true})}
            if(result.response === 'requested_me'){this.setState({acceptRequest:true})}
        }))
        var url3 = 'http://127.0.0.1:8000/myapi/usersallpost/'+this.props.userId+'/?format=json&page='+this.state.pageNumber
        fetch(url3,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.next===null){
                this.setState({nextPage:false})
            }else{
                this.setState({pageNumber:this.state.pageNumber+1})
            }
            this.setState({status: result.results})
        }))
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/usersallpost/'+this.props.userId+'/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.status
                st.push(result.results[i])
            }
            this.setState({status: st, pageNumber:this.state.pageNumber+1})
            if(result.next===null){
                this.setState({nextPage:false})
            }
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.nextPage
        if(bottom && next){
            this.loadMore()
        }
    }
    addFriend=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/addfriend/'+this.props.userId+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({cancelRequest:true, addFriend:false})
        }))
    }
    cancelRequest=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/cancelfriendrequest/'+this.props.userId+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({cancelRequest:false, addFriend:true})
        }))
    }
    acceptRequest=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/acceptfriendrequest/'+this.props.userId+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({acceptRequest:false, message:true})
        }))
    }
    deleteRequest=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/deletefriendrequest/'+this.props.userId+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            this.setState({acceptRequest:false, addFriend:true})
        }))
    }
    rerender=()=>{
        this.forceUpdate();
        };
        forceUpdate = () => {
        this.setState((state) => ({
            counter: state.counter + 1
        }));
        this.componentDidMount()
      };
    conversation=()=>{
        this.props.conversation(this.props.userId)
    }
    render() {
        if(this.state.status.length){
            var list = this.state.status
            const s = list.map((l,i)=>{
                return(
                    <Status userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                    key={i} name={l['user']['first_name']+' '+l['user']['last_name']}
                    body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                    id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} />
                )
                })
        
            return (
                <div>
                <br/>
                <div onScroll={this.handleScroll} className='card hide-scrollbar' style={{height:'92vh', marginTop:'-8px', overflowY:'scroll'}}>
                <br/>
                    <div>
                        <img style={{width:'150px', height:'150px', borderRadius:'50%', display:'block', marginLeft:'auto', marginRight:'auto'}} 
                        src={user} alt='' className=''/>
                        <h1 style={{textAlign:'center', color:'white'}}>{this.state.data.first_name} {this.state.data.last_name}</h1>
                    </div>
                    <div>
                    {this.state.me?(
                        <Post rerender={this.rerender.bind(this)}
                     userdata={this.props.userdata} token={this.props.token} 
                     />
                    ):(
                        <div className='container' style={{display:'flex', justifyContent:'center'}}>
                        <div className=''>
                        {this.state.message?(
                            <button onClick={this.conversation} className='green button' style={{border:'none', borderRadius:'5px'}}>Message</button>
                        ):null}
                        {this.state.addFriend?(
                            <button className='green button' style={{border:'none', borderRadius:'5px'}} onClick={this.addFriend}>Add Friend</button>
                        ):null}
                        {this.state.cancelRequest?(
                            <button className='red button' style={{border:'none', borderRadius:'5px'}} onClick={this.cancelRequest}>Cancel friend request</button>
                        ):null}
                        {this.state.acceptRequest?(
                            <div>
                                <button className='green button' style={{border:'none', borderRadius:'5px'}} onClick={this.acceptRequest}>Accept</button>
                                <button className='red button' style={{border:'none', borderRadius:'5px', marginLeft:'4px'}} onClick={this.deleteRequest}>Delete</button>
                            </div>
                        ):null}
                        </div>
                        
                        <br/>
                        <br/>
                        </div>
                    )}
                    
                    </div>
                    <div className='container'>
                    <hr/>
                    <hr style={{marginTop:'-18px'}}/>
                    </div>
                    <div>{s}</div>
                </div>
                </div>
            );
        }else{
            return(
                <div>
                <br/>
                <div onScroll={this.handleScroll} className='card hide-scrollbar' style={{height:'94vh', marginTop:'-8px', overflowY:'scroll'}}><br/>
                    <div className=''>
                        <img style={{width:'150px', height:'150px', borderRadius:'50%', display:'block', marginLeft:'auto', marginRight:'auto'}} 
                        src={user} alt='' className=''/>
                        <h1 style={{textAlign:'center', color:'white'}}>{this.state.data.first_name} {this.state.data.last_name}</h1>
                    </div>
                    <div className='container' style={{display:'flex', justifyContent:'center'}}>
                    <div>
                    {this.state.message?(
                        <button onClick={this.conversation} className='green button' style={{border:'none', borderRadius:'5px'}}>Message</button>
                    ):null}
                    {this.state.addFriend?(
                        <button className='green button' style={{border:'none', borderRadius:'5px'}} onClick={this.addFriend}>Add Friend</button>
                    ):null}
                    {this.state.cancelRequest?(
                        <button className='red button' style={{border:'none', borderRadius:'5px'}} onClick={this.cancelRequest}>Cancel friend request</button>
                    ):null}
                    {this.state.acceptRequest?(
                        <div>
                            <button className='green button' style={{border:'none', borderRadius:'5px'}} onClick={this.acceptRequest}>Accept</button>
                            <button className='red button' style={{border:'none', borderRadius:'5px', marginLeft:'4px'}} onClick={this.deleteRequest}>Delete</button>
                        </div>
                    ):null}
                    </div>
                    
                    <br/><br/>
                    </div>
                    {this.state.me?(
                        <Post rerender={this.rerender.bind(this)}
                     userdata={this.props.userdata} token={this.props.token} 
                     />
                    ):(null)}
                    <div className='container'>
                    <hr/>
                    <hr style={{marginTop:'-18px'}}/>
                    </div>
                    <p style={{textAlign:'center'}}>No Post available</p>
                </div>
                    
                </div>
            )
        }
    }
}

export default UserDetails;