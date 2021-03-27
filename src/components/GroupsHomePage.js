import React, { Component } from 'react';
import GroupsCreatedStatus from './GroupsCreatedStatus';
import PostToGroup from './PostToGroup';
import GroupsStatus from './GroupsStatus';
import InviteToGroup from './InviteToGroup';

class GroupsHomePage extends Component {
    constructor() {
        super()
        this.state={
            groupInfo:[],
            joined:false,
            status:[],
            invite:false,
            nextPage: true,
            pageNumber:1,
            counter: 1,
        }
    }
    componentDidMount(){
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/groupsdata/'+this.props.groupId+'/?format=json'
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            this.setState({groupInfo: result})
        }))
        var url2 = 'http://127.0.0.1:8000/myapi/getgroupspost/'+this.props.groupId+'/?format=json&page='+this.state.pageNumber
        
        //if(this.state.nextPage){
            fetch(url2,{
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
                    this.setState({pageNumber:this.state.pageNumber+1, nextPage:true})
                }
                this.setState({status: result.results})
            }))
        //}
    }
    joinGroup=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/joingroup/'+this.props.groupId+'/'
        fetch(url,{
            method:'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token,
            },
        })
        .then(res=>res.json().then(result=>{
            if(result.response==='ok'){
                this.componentDidMount()
            }
        }))
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/getgroupspost/'+this.props.groupId+'/?format=json&page='+this.state.pageNumber
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
    rerender=()=>{
        this.setState({pageNumber:1})
        this.componentDidMount()
    }
    invite=()=>{
        this.setState({invite:!this.state.invite})
    }
    render() {
        if(Object.keys(this.state.groupInfo).length && this.state.status.length){
            var list = this.state.status
            const s = list.map((l,i)=>{
                return(
                    <GroupsStatus userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                    key={i} name={l['user']['first_name']+' '+l['user']['last_name']}
                    body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                    id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} />
                )
            })
            return (
                <div key={this.state.counter} onScroll={this.handleScroll} style={{overflowX:'scroll', height:'94vh'}} className='display-container hide-scrollbar'>
                <div className='container'>
                    <h1 style={{color:'white'}}>{this.state.groupInfo.name}</h1>
                    <div style={{display:'flex'}}>
                        <p style={{paddingRight:'24px', color:'lightgrey', marginTop:'4px'}}>{this.state.groupInfo.member} members</p>
                        {this.state.groupInfo.joined?(
                            <button onClick={this.invite} className='button blue' style={{border:'none', borderRadius:'7px', height:'35px'}}>+ Invite</button>
                            
                        ):(
                            <button onClick={this.joinGroup} className='button blue' style={{border:'none', borderRadius:'7px', height:'35px'}}>Join</button>
                        )}
                        {this.state.invite?(
                            <InviteToGroup invite={this.invite} groupId={this.state.groupInfo.id} />
                        ):(null)}
                    </div>
                    <hr style={{border:'none', position:'relative', height:'1px', backgroundColor:'lightgrey'}}/>
                    
                    </div>
                    {this.state.groupInfo.joined?(
                        <PostToGroup id={this.state.groupInfo.id} rerender={this.rerender} />
                    ):(null)}
                    <div>{s}</div>
                    <GroupsCreatedStatus userDetails={this.props.userDetails} muserDetails={this.props.muserDetails} userId={this.state.groupInfo.admin.id}
                        admin={this.state.groupInfo.admin.first_name+' '+this.state.groupInfo.admin.last_name}
                        groupName={this.state.groupInfo.name} />
                </div>
            );
        }else if(Object.keys(this.state.groupInfo).length){
        //if(this.state.groupInfo.length){
        //if(this.state.groupInfo){
            return (
                <div key={this.state.counter} className='display-container'>
                {this.state.invite?(
                            <InviteToGroup invite={this.invite} groupId={this.state.groupInfo.id}/>
                        ):(null)}
                <div className='container'>
                    <h1 style={{color:'white'}}>{this.state.groupInfo.name}</h1>
                    <div style={{display:'flex'}}>
                        <p style={{paddingRight:'24px', color:'lightgrey', marginTop:'4px'}}>{this.state.groupInfo.member} members</p>
                        {this.state.groupInfo.joined?(
                            <button onClick={this.invite} className='button blue' style={{border:'none', borderRadius:'7px', height:'35px'}}>+ Invite</button>
                        ):(
                            <button onClick={this.joinGroup} className='button blue' style={{border:'none', borderRadius:'7px', height:'35px'}}>Join</button>
                        )}
                        
                    </div>
                    <hr style={{border:'none', position:'relative', height:'1px', backgroundColor:'lightgrey'}}/>
                    
                    </div>
                    {this.state.groupInfo.joined?(
                        <PostToGroup id={this.state.groupInfo.id} rerender={this.rerender} />
                    ):(null)}
                    
                    <GroupsCreatedStatus 
                        admin={this.state.groupInfo.admin.first_name+' '+this.state.groupInfo.admin.last_name}
                        groupName={this.state.groupInfo.name} />
                </div>
            );
        }else{
            return(
                <div key={this.state.counter} className='container'>
                    <p>Loading...</p>
                </div>
            )
        }
        
    }
}

export default GroupsHomePage;