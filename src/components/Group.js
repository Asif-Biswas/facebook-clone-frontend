import React, { Component } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import AllGroupName from './AllGroupName';
import AllJoinedGroupName from './AllJoinedGroupName';
import GroupCreatorForm from './GroupCreatorForm';
import GroupsHomePage from './GroupsHomePage';
import GroupsStatus2 from './GroupsStatus2';
import SomeGroupContainer from './SomeGroupContainer';
import SomeJoinedGroupContainer from './SomeJoinedGroupContainer';

class Group extends Component {
    constructor(props) {
        super(props)
        this.state={
            seeMoreGroup: false,
            seeMoreJooinedGroup:false,
            SomeJoinedGroupContainer:true,
            groupHome: false,
            GroupId: null,
            status:[],
            pageNumber: 1,
            maxPage:1,
        }
    }
    seeMoreGroup=()=>{
        this.setState({seeMoreGroup:true, groupHome:false, seeMoreJooinedGroup:false})
    }
    seeMoreJoinedGroup=()=>{
        this.setState({seeMoreGroup:false, groupHome:false, seeMoreJooinedGroup:true, SomeJoinedGroupContainer:false})
    }
    groupHome=(groupId)=>{
        this.setState({groupHome:true, seeMoreGroup:false, GroupId: groupId, seeMoreJooinedGroup:false})
    }
    checkId=()=>{
        if(this.props.groupId !== null){
            this.groupHome(this.props.groupId)
        }
    }
    componentDidMount(){
        this.checkId()
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/alljoinedgroupspost/?format=json&page='+this.state.pageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.count%10!==0){
                var maxPage = parseInt(result.count/10)+1
            }else{
                maxPage = result.count/10
            }
            this.setState({status: result.results, pageNumber:this.state.pageNumber+1, maxPage:maxPage})
        }))
    }
    componentDidUpdate(prevProps) {
        if (prevProps.groupId !== this.props.groupId) {
            this.checkId();
        }
    }
    loadMore=()=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'https://fb-cln-backend.herokuapp.com/myapi/alljoinedgroupspost/?format=json&page='+this.state.pageNumber
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
                //this.setState({status:[...this.state.status, result.results[i]], pageNumber:this.state.pageNumber+1})
            }
            this.setState({status: st, pageNumber:this.state.pageNumber+1})
            
        }))
    }
    handleScroll=(event)=>{
        const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        if(bottom && (this.state.pageNumber!==this.state.maxPage+1)){
            this.loadMore()
        }
    }
    render() {
        if(this.state.status.length){
            var list = this.state.status
            const s = list.map((l,i)=>{
                return(
                    <GroupsStatus2 userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                    key={i} name={l['user']['first_name']+' '+l['user']['last_name']}
                    body={l['body']} likes={l['total_likes']} comments={l['total_comments']}
                    id={l['id']} isLiked={l['is_liked']} userId={l['user']['id']} groupName={l['group']['name']}
                    groupId={l['group']['id']} groupHome={this.groupHome} />
                )
            })
            return (
                <div onScroll={this.handleScroll} className='hide-scrollbar' style={{height:'93vh', marginTop:'12px', overflowY:'scroll'}}>
                <br/>
                {this.state.groupHome?(
                    <GroupsHomePage userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                        groupId={this.state.GroupId}
                    />
                ):(
                    <div>
                    <GroupCreatorForm groupHome={this.groupHome}/>
                {this.state.seeMoreGroup?(
                    <div>
                    <AllGroupName groupHome={this.groupHome}/>
                    </div>
                ):(
                    <div>
                    <SomeGroupContainer groupHome={this.groupHome}/>
                    <p onClick={this.seeMoreGroup} className='container' style={{float:'right', cursor:'pointer', color:'white', marginTop:'-4px', textDecoration:'underline'}}>... See more groups</p>
                    <div className=''>
                    {this.state.SomeJoinedGroupContainer?(
                        <div>
                        <SomeJoinedGroupContainer groupHome={this.groupHome} name={'uhfu'}/>
                        <p onClick={this.seeMoreJoinedGroup} className='container' style={{float:'right', cursor:'pointer', color:'white', marginTop:'-4px', textDecoration:'underline'}}>... See more joined groups</p>
                        </div>
                    ):(null)}
                        
                    </div>
                    </div>
                )}
                {this.state.seeMoreJooinedGroup?(
                    <AllJoinedGroupName groupHome={this.groupHome}/>
                ):(null)}
                    </div>
                )}
                {this.state.groupHome?(null):(
                    <div>
                        {s}
                        <span style={{display:'flex', justifyContent:'center'}}><AiOutlineLoading3Quarters className='spin' style={{fontSize:'36px'}}/></span>
                    </div>
                    )}
                
                </div>
            )
        }else{
            return(
                <div key={this.state.counter} className='hide-scrollbar' style={{height:'93vh', marginTop:'12px', overflowY:'scroll'}}>
                <br/>
                {this.state.groupHome?(
                    <GroupsHomePage userDetails={this.props.userDetails} muserDetails={this.props.muserDetails}
                        groupId={this.state.GroupId}
                    />
                ):(
                    <div>
                    <GroupCreatorForm groupHome={this.groupHome}/>
                {this.state.seeMoreGroup?(
                    <div>
                    <AllGroupName groupHome={this.groupHome}/>
                    </div>
                ):(
                    <div>
                    <SomeGroupContainer groupHome={this.groupHome}/>
                    <p onClick={this.seeMoreGroup} className='container' style={{float:'right', cursor:'pointer', color:'white', marginTop:'-4px', textDecoration:'underline'}}>... See more groups</p>
                    <div className=''>
                    {this.state.SomeJoinedGroupContainer?(
                        <div>
                        <SomeJoinedGroupContainer groupHome={this.groupHome} name={'uhfu'}/>
                        <p onClick={this.seeMoreJoinedGroup} className='container' style={{float:'right', cursor:'pointer', color:'white', marginTop:'-4px', textDecoration:'underline'}}>... See more joined groups</p>
                        </div>
                    ):(null)}
                        
                    </div>
                    </div>
                )}
                {this.state.seeMoreJooinedGroup?(
                    <AllJoinedGroupName/>
                ):(null)}
                    </div>
                )}
                
                </div>
            )
        }
    }
}

export default Group;