import React, { Component } from 'react';
import CancelFriendRequest from './CancelFriendRequest';
import FriendRequest from './FriendRequest';
import FriendRequestAccept from './FriendRequestAccept';
import JoinedGroupNameContainer from './JoinedGroupNameContainer';
import MyFriendNameContainer from './MyFriendNameContainer';
import MyNameContainer from './MyNameContainer';

class SearchResult extends Component {
    constructor() {
        super()
        this.state={
            userResult:[],
            groupResult:[],
            people: false,
            group: false,
            noResult: false,
            inputForm: true,
            upageNumber: 1,
            gpageNumber: 1,
            nextUpage: false,
            nextGpage: false,

            fn:'',
            ln:'',
            n:'',
        }
    }
    searchUser=(fn,ln)=>{
        if(ln===null){
            var url = 'http://127.0.0.1:8000/myapi/searchuser/?first_name='+fn+'&page='+this.state.upageNumber
        }else{
            url = 'http://127.0.0.1:8000/myapi/searchuser/?first_name='+fn+'&last_name='+ln+'&page='+this.state.upageNumber
        }
        let store = JSON.parse(localStorage.getItem('login'))
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.next!==null){
                var upageNumber = this.state.upageNumber+1
                var nextUpage = true
            }else{
                upageNumber = this.state.upageNumber
                nextUpage = false
            }

            this.setState({userResult: result.results, upageNumber:upageNumber, nextUpage:nextUpage})
            if(result.results.length){
                this.setState({people:true})
            }
        }))
    }
    searchGroup=(n)=>{
        let store = JSON.parse(localStorage.getItem('login'))
        var url = 'http://127.0.0.1:8000/myapi/searchgroup/?name='+n+'&page='+this.state.gpageNumber
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            if(result.next!==null){
                var gpageNumber = this.state.gpageNumber+1
                var nextGpage = true
            }else{
                gpageNumber = this.state.gpageNumber
                nextGpage = false
            }

            this.setState({groupResult: result.results, gpageNumber:gpageNumber, nextGpage:nextGpage})
            if(result.results.length){
                this.setState({group:true})
            }
        }))
    }
    search=(str)=>{
        this.setState({noResult:true, upageNumber:1, gpageNumber:1})
        var strLength = str.length
        var firstSpace = str.indexOf(' ')
        var lastSpace = str.lastIndexOf(' ')
        if(firstSpace===lastSpace){
            if(firstSpace===-1){
                var ln = null
                var fn = str
                this.searchUser(fn,ln)
                this.setState({fn:fn, ln:ln})
            }else{
                fn = str.slice(0,firstSpace)
                ln = str.slice(firstSpace+1,strLength)
                this.searchUser(fn,ln)
                this.setState({fn:fn, ln:ln})
            }
        }else{
            fn = str.slice(0,firstSpace)
            ln = str.slice(lastSpace+1,strLength)
            this.searchUser(fn,ln)
            this.setState({fn:fn, ln:ln})
        }
        this.searchGroup(str)
        this.setState({n:str})
    }
    componentDidMount(){
        try {
            if(this.props.input.length){
                this.search(this.props.input)
                //this.setState({inputForm:false})
            }
        }catch{
            
        }
    }
    uhandleScroll=()=>{
        //const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.nextUpage
        if(next){
            this.uloadMore(this.state.fn, this.state.ln)
        }
    }
    ghandleScroll=(event)=>{
        //const bottom = event.target.scrollHeight - event.target.scrollTop === event.target.clientHeight;
        const next = this.state.nextGpage
        if(next){
            this.gloadMore(this.state.fn, this.state.ln)
        }
    }
    uloadMore=(fn,ln)=>{
        if(ln===null){
            var url = 'http://127.0.0.1:8000/myapi/searchuser/?first_name='+fn+'&page='+this.state.upageNumber
        }else{
            url = 'http://127.0.0.1:8000/myapi/searchuser/?first_name='+fn+'&last_name='+ln+'&page='+this.state.upageNumber
        }
        let store = JSON.parse(localStorage.getItem('login'))
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var st = this.state.userResult
                st.push(result.results[i])
            }
            if(result.next===null){
                this.setState({nextUpage:false})
            }else{
                this.setState({upageNumber:this.state.upageNumber+1})
            }
            this.setState({userResult: st})
            
        }))
    }
    gloadMore=(n)=>{
        var url = 'http://127.0.0.1:8000/myapi/searchgroup/?name='+n+'&page='+this.state.gpageNumber
        let store = JSON.parse(localStorage.getItem('login'))
        fetch(url,{
            method:'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token '+store.token
            }
        })
        .then(res=>res.json().then(result=>{
            for (var i=0; i<result.results.length; i++){
                var stg = this.state.groupResult
                stg.push(result.results[i])
            }
            if(result.next===null){
                this.setState({nextGpage:false})
            }else{
                this.setState({gpageNumber:this.state.gpageNumber+1})
            }
            this.setState({groupResult: stg})
            
        }))
    }
    render() {
        if(this.state.userResult.length || this.state.groupResult.length){
            if(this.state.userResult.length){
                var userList = this.state.userResult
                var s = userList.map((l,i)=>{
                    if(l['relation']==='friend'){
                        return(
                            <MyFriendNameContainer  conversation={this.props.conversation}
                                key={i} id={l['id']} muserDetails={this.props.muserDetails}  userDetails={this.props.userDetails}
                                name={l['first_name']+' '+l['last_name']}
                            />
                        )
                    }else if(l['relation']==='requested_me'){
                        return(
                            <FriendRequestAccept key={i} id={l['id']} muserDetails={this.props.muserDetails} userDetails={this.props.userDetails}
                                name={l['first_name']+' '+l['last_name']}
                            />
                        )
                    }else if(l['relation']==='i_requested'){
                        return(
                            <CancelFriendRequest key={i} id={l['id']} muserDetails={this.props.muserDetails} userDetails={this.props.userDetails}
                                name={l['first_name']+' '+l['last_name']}
                            />
                        )
                    }else if(l['relation']==='me'){
                        return(
                            <MyNameContainer key={i} id={l['id']} muserDetails={this.props.muserDetails} userDetails={this.props.userDetails}
                                name={l['first_name']+' '+l['last_name']}
                            />
                        )
                    }
                    else{
                        return(
                            <FriendRequest key={i} id={l['id']}  muserDetails={this.props.muserDetails} userDetails={this.props.userDetails}
                                name={l['first_name']+' '+l['last_name']}
                            />
                        )
                    }
                })
            }
            if(this.state.groupResult.length){
                var groupList = this.state.groupResult
                var s2 = groupList.map((l,i)=>{
                    return(
                        <JoinedGroupNameContainer key={i} groupHome={this.props.groupHome}
                            name={l['name']} id={l['id']}
                        />
                    )
                })
            }
            
            return(
                <div>
                    {this.state.people?(
                        <h4 className='container text-white'>People:</h4>
                    ):null}
                    {s}
                    <div className='container'>
                        {this.state.nextUpage?(
                            <button className='button blue' style={{border:'none', borderRadius:'5px'}} onClick={this.uhandleScroll}>More People</button>
                        ):(
                            <h6 className='text-white'>No more people found.</h6>
                        )}
                    </div>
                    <div className='container'>
                    {this.state.group?(
                        <h5 className='text-white'>Groups:</h5>
                    ):null}
                        {s2}
                        {this.state.nextGpage?(
                            <button className='button blue' style={{border:'none', borderRadius:'5px'}} onClick={this.ghandleScroll}>More Groups</button>
                        ):(
                            <h6 className='text-white'>No more Group found.</h6>
                        )}
                        
                    </div>
                </div>
            )
        }else{
            return(
                <div>
                    {this.state.noResult?(
                        <div>
                        <h4 className='container show-me text-white'>No result found.</h4>
                        <h4 className='container hide-me text-white'>Loading...</h4>
                        </div>
                    ):null}
                </div>
            )
        }
    }
}

export default SearchResult;